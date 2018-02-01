module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps: [
    {
      name: 'koa2_demo',
      script: './app/app.js',
      watch: true,
      instances: 4,
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
      // error_file: default to $HOME/.pm2/logs/XXXerr.log,
      // out_file: default to $HOME/.pm2/logs/XXXout.log,
      log_date_format: 'YYYY-MM-DD HH:mm Z',
    },
  ],
};
