const { DataTypes } = require('sequelize');
const sequelize = require('../db/connection');

const Category = sequelize.define('Category', {
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
},
{
  tableName: 'Category',
  timestamps: false,
});

// Créez la table dans la base de données (seulement si elle n'existe pas déjà)
// (async () => {
//   await Category.sync();
//   console.log('Category table created successfully.');
// })();

module.exports = Category;