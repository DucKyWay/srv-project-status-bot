module.exports = {
    apps : [{
      name: 'my-bot',
      script: './index.js', // หรือไฟล์เริ่มต้นของบอทของคุณ
      // Options reference: https://pm2.keymetrics.io/docs/usage/application-declaration/
      args: 'one two',
      instances: 1,
      autorestart: true, // ทำให้บอทรีสตาร์ทอัตโนมัติ
      watch: true,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'development'
      },
      env_production: {
        NODE_ENV: 'production'
      }
    }],
  };
  