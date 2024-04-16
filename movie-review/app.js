//pick the confiuration
const libDotEnv = require('dotenv');
//pickup configuration according to env
libDotEnv.config({ path: process.env.NODE_ENV.toString().trim() == 'prod' ? '.env.production' : '.env.qa' });
//get express server
const server = require('./server');
//start server
server.start()
