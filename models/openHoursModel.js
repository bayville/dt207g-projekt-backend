module.exports = (sequelize, DataTypes) => {
    const OpenHours = sequelize.define('openHours', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        day: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        openTime: {
            type: DataTypes.TIME,
            allowNull: true
        },
        closeTime: {
            type: DataTypes.TIME,
            allowNull: true
        }
    });

    return OpenHours;
};
