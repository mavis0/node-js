const Sequelize = require('sequelize');
const config = require('./config');

var sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 30000
    }
})

var Pet = sequelize.define('pet', {
    id: {
        type: Sequelize.STRING(50),
        primaryKey: true
    },
    name: Sequelize.STRING(100),
    gender: Sequelize.BOOLEAN,
    birth: Sequelize.STRING(10),
    createdAt: Sequelize.BIGINT,
    updatedAt: Sequelize.BIGINT,
    version: Sequelize.BIGINT,
}, {
    timestamps: false
})

var now = Date.now();

Pet.create({
    id: 'g-' + now,
    name: 'gaffy',
    gender: false,
    birth: '2020-08-24',
    createdAt: now,
    updatedAt: now,
    version: 0
}).then(p => {
    console.log('created.' + JSON.stringify(p));
}).catch(err => {
    console.log('failed: ' + err);
})