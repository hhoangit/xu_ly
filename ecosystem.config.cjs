module.exports = {
  apps: [
    {
      name: 'quickledger-ai',
      script: 'npm',
      args: 'run start',
      watch: false,
      max_memory_restart: '2G',
      env: {
        NODE_ENV: 'production'
      },
      log_date_format: 'YYYY-MM-DD HH:mm Z'
    }
  ]
};
