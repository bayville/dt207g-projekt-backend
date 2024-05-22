module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define('order', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        customerId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'customers',
                key: 'id'
            }
        },
        statusId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'statuses',
                key: 'id'
            },
            defaultValue: 1,
        },
        totalAmount: {
            type: DataTypes.DECIMAL,
            allowNull: false
        }
    });

    return Order;
};
