const { DataTypes } = require('sequelize');
const sequelize = require('../db/connection');

const Province = sequelize.define('Province', {
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
  tableName: 'Province',
  timestamps: false,
});

// Créez la table dans la base de données (seulement si elle n'existe pas déjà)
// (async () => {
//   await Province.sync();
//   console.log('Province table created successfully.');
// })();

module.exports = Province;