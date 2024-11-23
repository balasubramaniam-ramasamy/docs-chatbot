const { Sequelize } = require('sequelize');

// Create Sequelize instance for SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './../database/database.sqlite'  // SQLite database file
});

// Test the connection
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('SQLite database connected successfully');
  } catch (err) {
    console.error('Error connecting to SQLite database:', err);
  }
}

testConnection();

module.exports = sequelize;
