const dbConfig = require('../config/dbConfig.js');
const { Sequelize, DataTypes } = require('sequelize');
const defineAssociations = require('./associations');

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD, {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect
    }
);

// Connect to database
sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(error => {
        console.error('Unable to connect to the database:', error);
    });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import models and define them
db.category = require('./categoryModel.js')(sequelize, DataTypes);
db.menuItem = require('./menuItemModel.js')(sequelize, DataTypes);
db.user = require('./userModel.js')(sequelize, DataTypes);
db.customer = require('./customerModel.js')(sequelize, DataTypes);
db.order = require('./orderModel.js')(sequelize, DataTypes);
db.status = require('./statusModel.js')(sequelize, DataTypes);
db.orderItem = require('./orderItemModel.js')(sequelize, DataTypes);
db.openHours = require('./openHoursModel.js')(sequelize, DataTypes);

const models = {
    Order: db.order,
    Customer: db.customer,
    Status: db.status,
    OrderItem: db.orderItem,
    MenuItem: db.menuItem,
    OpenHours: db.openHours,
    Category: db.category
};

// Define associations

defineAssociations(models);

// Synchronize models with the database
sequelize.sync({ force: false })
    .then(() => {
        console.log('Database re-sync completed.');

    })
    .catch(error => {
        console.error('Error syncing database:', error);
    });

module.exports = db;
