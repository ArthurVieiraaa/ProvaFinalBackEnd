const Sequelize = require('sequelize');

class Database {
    constructor() {
        this.db = new Sequelize(
            'bdbackend',
            'root',
            '',
            { host: 'localhost', dialect: 'mysql' }
        )
    }
}

module.exports = new Database();