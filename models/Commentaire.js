const { DataTypes } = require('sequelize');
const sequelize = require('../db/connection');

const Commentaire = sequelize.define('Commentaire', {
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
  commentaire: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  note: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  createDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
},
{
  tableName: 'Commentaire',
  timestamps: false,
});

//Créez la table dans la base de données (seulement si elle n'existe pas déjà)
(async () => {
  await Commentaire.sync();
  console.log('Commentaire table created successfully.');
})();
module.exports = Commentaire;