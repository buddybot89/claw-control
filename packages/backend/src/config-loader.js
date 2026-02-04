const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

// Config paths - check multiple locations for flexibility
const CONFIG_PATHS = [
  path.join(process.cwd(), 'config', 'agents.yaml'),           // ./config/agents.yaml
  path.join(process.cwd(), '..', '..', 'config', 'agents.yaml'), // ../../config/agents.yaml (from packages/backend)
  '/app/config/agents.yaml',                                     // Docker mount path
  path.join(__dirname, '..', '..', '..', 'config', 'agents.yaml') // Relative to src/
];

/**
 * Load agents configuration from YAML file
 * @returns {Array} Array of agent objects
 */
function loadAgentsConfig() {
  let configPath = null;
  
  // Find the first existing config file
  for (const p of CONFIG_PATHS) {
    if (fs.existsSync(p)) {
      configPath = p;
      break;
    }
  }
  
  if (!configPath) {
    console.warn('⚠️  No agents.yaml found. Searched paths:');
    CONFIG_PATHS.forEach(p => console.warn(`   - ${p}`));
    console.warn('   Using default agents.');
    return getDefaultAgents();
  }
  
  try {
    console.log(`📄 Loading agents from: ${configPath}`);
    const fileContents = fs.readFileSync(configPath, 'utf8');
    const config = yaml.load(fileContents);
    
    if (!config || !Array.isArray(config.agents)) {
      console.warn('⚠️  Invalid agents.yaml format. Expected { agents: [...] }');
      return getDefaultAgents();
    }
    
    // Validate and normalize agents
    const agents = config.agents.map((agent, index) => ({
      name: agent.name || `Agent ${index + 1}`,
      description: agent.description || null,
      role: agent.role || 'Agent',
      avatar: agent.avatar || '🤖',
      status: agent.status || 'idle'
    }));
    
    console.log(`✅ Loaded ${agents.length} agents from config`);
    return agents;
    
  } catch (err) {
    console.error(`❌ Error loading agents.yaml: ${err.message}`);
    return getDefaultAgents();
  }
}

/**
 * Default agents if no config file exists
 */
function getDefaultAgents() {
  return [
    { name: 'Agent Alpha', role: 'Coordinator', description: 'Team lead and task coordinator', avatar: '🤖', status: 'idle' },
    { name: 'Agent Beta', role: 'Developer', description: 'Backend systems and APIs', avatar: '💻', status: 'idle' },
    { name: 'Agent Gamma', role: 'DevOps', description: 'Infrastructure and deployments', avatar: '🔧', status: 'idle' },
    { name: 'Agent Delta', role: 'Researcher', description: 'Analysis and documentation', avatar: '📖', status: 'idle' },
  ];
}

/**
 * Get the path where config was loaded from (for debugging)
 */
function getConfigPath() {
  for (const p of CONFIG_PATHS) {
    if (fs.existsSync(p)) {
      return p;
    }
  }
  return null;
}

module.exports = {
  loadAgentsConfig,
  getDefaultAgents,
  getConfigPath,
  CONFIG_PATHS
};
