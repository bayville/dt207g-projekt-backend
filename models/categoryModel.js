module.exports = (sequelize, DataTypes) => {

    const Category = sequelize.define('categories', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING
        },
        published: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        order: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });

    return Category;
}