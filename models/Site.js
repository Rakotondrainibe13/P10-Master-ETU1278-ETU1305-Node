const { DataTypes } = require('sequelize');
const sequelize = require('../db/connection');
const Region = require('./Region');
const Media = require('./Media');
const Category = require('./Category');
const Commentaire = require('./Commentaire');
const Favoris = require('./Favoris');

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
  rating: {
    type: DataTypes.DECIMAL(3,2),
    allowNull: false,
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
Site.hasMany(Media, { as: 'Media', foreignKey: 'idSite' });
Site.hasMany(Commentaire, { as: 'Commentaire', foreignKey: 'idSite' });
Site.hasMany(Favoris, { as: 'Favoris', foreignKey: 'idSite' });
module.exports = Site;