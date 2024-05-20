module.exports = (sequelize, DataTypes) => {
    // Define the User model using sequelize.define
    const User = sequelize.define("user", {
        // Define the attributes of the User model
        username: {
            // Define the data type of the username attribute
            type: DataTypes.STRING,
            // Specify that the username cannot be null
            allowNull: false,
            // Ensure uniqueness of the username
            unique: true
        },
        password: {
            // Define the data type of the password attribute
            type: DataTypes.STRING,
            // Specify that the password cannot be null
            allowNull: false
        }
    });

    // Return the User model
    return User;
}
