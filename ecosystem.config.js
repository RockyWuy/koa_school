module.exports = {
  apps : [{
    name: 'school_koa',
    script: './src/app.js',

    // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
    args: 'one two',
    instances: 1,
    autorestart: true,
    watch: true,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }],

  deploy : {
    production : {
      user : 'root',
      host : '47.98.148.8',
      ref  : 'origin/master',
      repo : 'https://github.com/CiciSeven/schoolKoa.git',
      path : '/data/server/school_koa',
      'post-deploy' : 'git pull origin master && npm install && pm2 reload ecosystem.config.js --env production'
    }
  }
};
