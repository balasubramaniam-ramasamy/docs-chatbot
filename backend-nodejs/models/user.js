const { DataTypes } = require('sequelize');
const sequelize = require('./index');
const bcrypt = require('bcryptjs');

// Define the User model
const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true, // Auto-incrementing field
    primaryKey: true,    // Primary key
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  // Optional settings
  timestamps: true,
  underscored: true,
});

// Hash the password before saving the user
User.beforeCreate(async (user) => {
  if (user.password) {
    user.password = await bcrypt.hash(user.password, 10);
  }
});

// Method to compare passwords
User.prototype.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

// Sync the model with the database
sequelize.sync()
  .then(() => console.log('User table has been created'))
  .catch((err) => console.error('Error syncing User table:', err));

module.exports = User;
