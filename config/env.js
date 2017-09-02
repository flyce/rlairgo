const config = {
    // mongodb
    mongodbUri: 'mongodb://localhost/video',

    // bcrypt
    saltRounds: 10,

    // JsonWebToken
    secretKey: 'my_secret_key',
    expiresIn: 3600 * 24 * 3,
    refreshTime: 3600 * 24,

};

module.exports = config;