const defineAssociations = (models) => {
    const { Order, Customer, Status, OrderItem, MenuItem, Category } = models;

    // Order-Customer Association
    Order.belongsTo(Customer, { foreignKey: 'customerId', as: 'customer' });
    Customer.hasMany(Order, { foreignKey: 'customerId', as: 'orders' });

    // Order-Status Association
    Order.belongsTo(Status, { foreignKey: 'statusId', as: 'status' });
    Status.hasMany(Order, { foreignKey: 'statusId', as: 'orders' });

    // Order-OrderItem Association
    Order.hasMany(OrderItem, { foreignKey: 'orderId', as: 'orderItems' });
    OrderItem.belongsTo(Order, { foreignKey: 'orderId', as: 'order' });

    // OrderItem-MenuItem Association
    OrderItem.belongsTo(MenuItem, { foreignKey: 'menuItemId', as: 'menuItems' });
    MenuItem.hasMany(OrderItem, { foreignKey: 'menuItemId', as: 'orderItems' });

    // MenuItem-Category Association
    MenuItem.belongsTo(Category, { foreignKey: 'categoryId', as: 'category' });
    Category.hasMany(MenuItem, { foreignKey: 'categoryId', as: 'menuItems' });
};

module.exports = defineAssociations;
