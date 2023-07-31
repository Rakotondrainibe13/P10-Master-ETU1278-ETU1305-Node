const { DataTypes } = require('sequelize');
const sequelize = require('../db/connection');
const Region = require('./Region');
const Category = require('./Category');

const Site = sequelize.define('Site', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  idRegion: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  idCategory: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  link: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  createdDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
},
{
  tableName: 'Site',
  timestamps: false,
});

// Créez la table dans la base de données (seulement si elle n'existe pas déjà)
// (async () => {
//   await Site.sync();
//   console.log('Site table created successfully.');
// })();
Site.belongsTo(Region, { as: 'Region', foreignKey: 'idRegion' });
Site.belongsTo(Category, { as: 'Category', foreignKey: 'idCategory' });
module.exports = Site;