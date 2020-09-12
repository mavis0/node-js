const Sequelize = require('sequelize');
const config = require('./config');

console.log('init sequelize...');

var sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
})

const ID_TYPE = Sequelize.STRING(50);

function defineModel(name, attributes) {
    var attr = {};
    for (let key in attributes) {
        let value = attributes[key];
        if (typeof value === 'object' && value['type']) {
            value.allowNull = value.allowNull || false;
            attr[key] = value;
        } else {
            attr[key] = {
                type: value,
                allowNull: false,
            }
        }
    }
    attr.id = {
        type: ID_TYPE,
        primaryKey: true
    };
    attr.createdAt = {
        type: Sequelize.BIGINT,
        allowNull: false
    }
    attr.updatedAt = {
        type: Sequelize.BIGINT,
        allowNull: false
    }
    attr.version = {
        type: Sequelize.BIGINT,
        allowNull: false
    }
    return sequelize.define(name, attr, {
        tableName: name,
        timestamps: false,
        hooks: {
            beforeValidate: function (obj) {
                let now = Date.now();
                if (obj.isNewRecord) {
                    obj.id = generatedId();
                    obj.createdAt = now;
                    obj.updatedAt = now;
                    obj.version = 0;
                } else {
                    obj.updatedAt = Date.now();
                    obj.version++;
                }
            }
        }
    })
}
var exp = {
    defineModel: defineModel,
    sync: () => {sequelize.sync({force: true, logging: false});}
}

const TYPES = ['STRING', 'INTEGER', 'BIGINT', 'TEXT', 'DOUBLE', 'DATEONLY', 'BOOLEAN'];

for (let type of TYPES) {
    exp[type] = Sequelize[type];
}

module.exports = exp;