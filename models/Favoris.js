const { DataTypes } = require('sequelize');
const sequelize = require('../db/connection');

const Favoris = sequelize.define('Favoris', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  idSite: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  idUser: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  etat: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  createDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
},
{
  tableName: 'Favoris',
  timestamps: false,
});

//Créez la table dans la base de données (seulement si elle n'existe pas déjà)
// (async () => {
//   await Favoris.sync();
//   console.log('Favoris table created successfully.');
// })();
module.exports = Favoris;