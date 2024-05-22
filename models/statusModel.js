module.exports = (sequelize, DataTypes) => {
    const Status = sequelize.define('status', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    return Status;
};
