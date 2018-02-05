'use strict';

if (process.env.NODE_ENV === undefined) {
    process.env.NODE_ENV = 'development';
}
console.log('NODE_ENV : ' + process.env.NODE_ENV);

module.exports = {
    env: process.env.NODE_ENV || 'development',
    api: {
        host: process.env.API_HOST || 'localhost',
        port: process.env.API_PORT || '8000'
    },
    worker: {
        host: process.env.WORKER_HOST || 'localhost',
        port: process.env.WORKER_PORT || '9000'
    },
    mongodb: process.env.MONGODB_URI || 'mongodb://mongodb:27017/dev_env',
    rabbitmq: process.env.RABBITMQ_URI || 'amqp://rabbitmq',
    key: {
        privateKey: process.env.PRIVATE_KEY || 'YourPrivateKey',
        tokenExpiration: process.env.TOKEN_EXPIRATION || 3600000,
        tokenExpirationDescription: process.env.TOKEN_EXPIRATION_DESCRIPTION || '1 hour'
    }
};