const { DataTypes } = require('sequelize');
const sequelize = require('../db/connection');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: true,
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
    allowNull: true,
  },
  createdDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  lastConnection: {
    type: DataTypes.DATE,
    allowNull: true,
  },
},
{
  tableName: 'User',
  timestamps: false,
});

// Créez la table dans la base de données (seulement si elle n'existe pas déjà)
// (async () => {
//   await User.sync();
//   console.log('User table created successfully.');
// })();

module.exports = User;