/**
 * DEPRECATED: Use db-adapter.js instead
 * 
 * This file is kept for backward compatibility with scripts that still use pool.query()
 * For new code, use: const dbAdapter = require('./db-adapter');
 */

const dbAdapter = require('./db-adapter');

// Export the db-adapter as a drop-in replacement for pg Pool
// This provides backward compatibility for scripts using pool.query()
module.exports = {
  query: dbAdapter.query,
  // Add additional Pool-like methods as needed
  end: dbAdapter.close,
};
