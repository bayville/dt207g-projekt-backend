module.exports = (sequelize, DataTypes) => {
    const OrderItem = sequelize.define('order_item', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        orderId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'orders',
                key: 'id'
            }
        },
        menuItemId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'menu_items',
                key: 'id'
            }
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });

    return OrderItem;
};
