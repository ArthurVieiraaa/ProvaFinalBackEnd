const Sequelize = require('sequelize');

class Database {
    constructor() {
        this.db = new Sequelize(
            'bdbackend',
            'root',
            '',
            { host: 'localhost', dialect: 'mysql' }
        );
        this.port = 3001;
    }
}

module.exports = new Database();