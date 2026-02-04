/**
 * Database Adapter - Supports both PostgreSQL and SQLite
 * 
 * Auto-detects based on DATABASE_URL:
 * - sqlite:./path/to/file.db → SQLite (better-sqlite3)
 * - postgresql://... → PostgreSQL (pg)
 */

const path = require('path');
const fs = require('fs');

// Determine database type from DATABASE_URL
const DATABASE_URL = process.env.DATABASE_URL || 'postgresql://localhost/claw_control';
const IS_SQLITE = DATABASE_URL.startsWith('sqlite:');

let db;
let dbType;

if (IS_SQLITE) {
  // SQLite mode
  const Database = require('better-sqlite3');
  const dbPath = DATABASE_URL.replace('sqlite:', '');
  const absolutePath = path.isAbsolute(dbPath) ? dbPath : path.resolve(process.cwd(), dbPath);
  
  // Ensure directory exists
  const dir = path.dirname(absolutePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  db = new Database(absolutePath);
  db.pragma('journal_mode = WAL'); // Better concurrent performance
  dbType = 'sqlite';
  console.log(`Connected to SQLite database: ${absolutePath}`);
} else {
  // PostgreSQL mode
  const { Pool } = require('pg');
  db = new Pool({
    connectionString: DATABASE_URL,
    ssl: DATABASE_URL.includes('railway') 
      ? { rejectUnauthorized: false } 
      : false
  });
  
  db.on('connect', () => {
    console.log('Connected to PostgreSQL database');
  });
  
  db.on('error', (err) => {
    console.error('Unexpected error on idle client', err);
    process.exit(-1);
  });
  
  dbType = 'postgres';
}

/**
 * Convert PostgreSQL-style parameterized query ($1, $2) to SQLite style (?, ?)
 */
function convertParams(query, params) {
  if (!IS_SQLITE) return { query, params };
  
  let paramIndex = 0;
  const convertedQuery = query.replace(/\$(\d+)/g, () => {
    paramIndex++;
    return '?';
  });
  
  return { query: convertedQuery, params };
}

/**
 * Handle PostgreSQL-specific syntax for SQLite
 */
function convertQuery(query) {
  if (!IS_SQLITE) return query;
  
  let converted = query;
  
  // Convert NOW() to datetime('now')
  converted = converted.replace(/NOW\(\)/gi, "datetime('now')");
  
  // Convert COALESCE - works the same in both
  // Convert SERIAL PRIMARY KEY to INTEGER PRIMARY KEY AUTOINCREMENT
  converted = converted.replace(/SERIAL PRIMARY KEY/gi, 'INTEGER PRIMARY KEY AUTOINCREMENT');
  
  // Convert TEXT[] to TEXT (we'll store arrays as JSON)
  converted = converted.replace(/TEXT\[\]/g, 'TEXT');
  converted = converted.replace(/DEFAULT '\{\}'/g, "DEFAULT '[]'");
  
  // Convert VARCHAR(n) to TEXT (SQLite doesn't care about length)
  converted = converted.replace(/VARCHAR\(\d+\)/gi, 'TEXT');
  
  // Convert TIMESTAMP to TEXT (SQLite stores as ISO strings)
  converted = converted.replace(/TIMESTAMP/gi, 'TEXT');
  
  // Remove REFERENCES clauses (SQLite supports them but we'll keep it simple)
  // Actually, let's keep them for referential integrity
  
  // Convert ON DELETE CASCADE/SET NULL - SQLite supports this
  
  return converted;
}

/**
 * Unified query interface
 * Returns { rows: [...] } for compatibility with pg
 */
async function query(sql, params = []) {
  const { query: convertedQuery, params: convertedParams } = convertParams(sql, params);
  const finalQuery = convertQuery(convertedQuery);
  
  if (IS_SQLITE) {
    try {
      // Determine if it's a SELECT or modifying query
      const isSelect = finalQuery.trim().toUpperCase().startsWith('SELECT');
      const isReturning = finalQuery.toUpperCase().includes('RETURNING');
      
      if (isSelect) {
        const stmt = db.prepare(finalQuery);
        const rows = stmt.all(...convertedParams);
        // Convert JSON strings back to arrays for tags field
        return { rows: rows.map(row => deserializeRow(row)) };
      } else if (isReturning) {
        // For INSERT/UPDATE/DELETE with RETURNING
        const stmt = db.prepare(finalQuery);
        const result = stmt.get(...convertedParams);
        return { rows: result ? [deserializeRow(result)] : [] };
      } else {
        // For INSERT/UPDATE/DELETE without RETURNING
        const stmt = db.prepare(finalQuery);
        const info = stmt.run(...convertedParams);
        return { rows: [], changes: info.changes, lastInsertRowid: info.lastInsertRowid };
      }
    } catch (err) {
      console.error('SQLite query error:', err.message);
      console.error('Query:', finalQuery);
      console.error('Params:', convertedParams);
      throw err;
    }
  } else {
    // PostgreSQL
    const result = await db.query(sql, params);
    return result;
  }
}

/**
 * Serialize row data for SQLite (arrays → JSON strings)
 */
function serializeValue(value, key) {
  if (Array.isArray(value)) {
    return JSON.stringify(value);
  }
  return value;
}

/**
 * Deserialize row data from SQLite (JSON strings → arrays)
 */
function deserializeRow(row) {
  if (!row) return row;
  
  const deserialized = { ...row };
  
  // Handle tags field (stored as JSON in SQLite)
  if (typeof deserialized.tags === 'string') {
    try {
      deserialized.tags = JSON.parse(deserialized.tags);
    } catch {
      deserialized.tags = [];
    }
  }
  
  return deserialized;
}

/**
 * Run migration SQL
 */
async function runMigration(sql) {
  if (IS_SQLITE) {
    // Split by semicolons and run each statement
    const statements = sql
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0)
      .filter(s => !s.startsWith('DO $$')); // Skip PostgreSQL-specific DO blocks
    
    for (const stmt of statements) {
      const converted = convertQuery(stmt);
      // Skip PostgreSQL-specific syntax that can't be converted
      if (converted.includes('information_schema') || converted.includes('ALTER TABLE')) {
        console.log('  Skipping PostgreSQL-specific statement');
        continue;
      }
      try {
        db.exec(converted);
      } catch (err) {
        // Ignore "table already exists" errors
        if (!err.message.includes('already exists')) {
          console.error('Migration statement error:', err.message);
          console.error('Statement:', converted);
        }
      }
    }
  } else {
    await db.query(sql);
  }
}

/**
 * Close database connection
 */
async function close() {
  if (IS_SQLITE) {
    db.close();
  } else {
    await db.end();
  }
}

/**
 * Get underlying database instance (for advanced usage)
 */
function getDb() {
  return db;
}

/**
 * Get database type
 */
function getDbType() {
  return dbType;
}

/**
 * Check if using SQLite
 */
function isSQLite() {
  return IS_SQLITE;
}

// Export unified interface
module.exports = {
  query,
  runMigration,
  close,
  getDb,
  getDbType,
  isSQLite,
  // Alias for backward compatibility with pg Pool
  pool: { query }
};
