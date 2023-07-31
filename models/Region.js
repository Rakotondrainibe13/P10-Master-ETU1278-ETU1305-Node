const { DataTypes } = require('sequelize');
const sequelize = require('../db/connection');
const Province = require('./Province');

const Region = sequelize.define('Region', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  idProvince: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
},
{
  tableName: 'Region',
  timestamps: false,
});

// Créez la table dans la base de données (seulement si elle n'existe pas déjà)
// (async () => {
//   await Region.sync();
//   console.log('Region table created successfully.');
// })();
Region.belongsTo(Province, { foreignKey: 'idProvince' });
module.exports = Region;