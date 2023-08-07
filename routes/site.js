const express = require("express");
const bcrypt = require("bcryptjs");
const siteRoutes = express.Router();
const maxAge = 3 * 24 * 60 * 60 * 1000;
const SECRET_KEY = "NOTESAPI"; //cle de securite ze tina atao fa tsy votery io NOTES... io
const jwt = require("jsonwebtoken");
const mailService = require("../service/mail");
const Category = require("../models/Category");
const Region = require("../models/Region");
const Site = require("../models/Site");
const Media = require("../models/Media");
const Province = require("../models/Province");
const Commentaire = require("../models/Commentaire");
const { Op } = require('sequelize');
const Favoris = require("../models/Favoris");

/**
 * route GET '/site'
 */
siteRoutes.get("/", async (req, res) => {
  const { search } = req.query;
    try {
        const sites = await Site.findAndCountAll({
          include:[
            {
              model: Region,
              as: 'Region',
              include: {
                model: Province,
              },
            },

            {
              model: Category,
              as: 'Category',
            },
            {
              model: Media,
              as:'Media',
            },
            {
              model: Commentaire,
              as:'Commentaire',
            },
            {
              model: Favoris,
              as:'Favoris',
            }
          ],
          where: search ?  {
            [Op.or]: [
              { 
                name: { 
                  [Op.like]: `%${search}%`,
                },
              },
              { 
                description: { 
                  [Op.like]: `%${search}%`,
                },
              },
              { 
                "$Region.name$":{ 
                  [Op.like]: `%${search}%`,
                },
              },
              { 
                "$Region.Province.name$":{ 
                  [Op.like]: `%${search}%`,
                },
              },
              { 
                "$Category.name$":{ 
                  [Op.like]: `%${search}%`,
                },
              },
              { 
                "$Media.description$":{ 
                  [Op.like]: `%${search}%`,
                },
              },
            ],
          } : {},
        });
        res.json(sites);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error', msg: error });
    }
});

siteRoutes.post("/addCommentaire", (req, res) => {
  let { idUser, idSite, commentaire, note, createDate } = req.body;
  const newCommentaire = new Commentaire({idSite: idSite, idUser:idUser, commentaire : commentaire, note:note, createDate: createDate});
  newCommentaire
    .save()
    .then(() => {
      res.json({
        status: "EN COURS",
        message: "Création d' commentaire effectué!",
      });
    })
    .catch(() => {
      res.json({
        status: "ECHEC",
        message: "Une erreur s'est produit lors de la création d' commentaire'!",
      });
    });
});


siteRoutes.get("/listCommentaire", async (req, res) => {
  console.log("----------------------------", req.body);
  const idSite = 1;
  try {
    const commentaires = await Commentaire.findAll({
      where: {
        idSite: idSite
      }
    });
    res.json(commentaires);
  } catch (error) {
      res.status(500).json({ error: 'Internal server error', msg: error });
  }
});

siteRoutes.post("/addFavoris", async(req, res) => {
  let { idUser, idSite, description, etat, createDate } = req.body;
  const etatcreer = 0;
  const etatannuler = -1
  const favoris = await Favoris.findOne({
    where: {
      idSite: idSite,
      idUser: idUser
    }
  });
  const newFavoris = new Favoris({idSite: idSite, idUser:idUser, description : description, etat: etatcreer, createDate: createDate});
  if (favoris) {
    if (favoris.etat == etatcreer) {
      etat = etatannuler
    } else {
      etat = etatcreer
    }
    Favoris.update(
      { etat: etat }, {
      where: {
        id: favoris.id
      }
    }
    ).then(() => {
      res.json({
        status: "EN COURS",
        message: "Update d' favoris effectué!",
      });
    })
      .catch((error) => {
        res.json({
          status: "ECHEC",
          message: "Error",
        });
    });
  } else {
    newFavoris
    .save()
    .then(() => {
      res.json({
        status: "EN COURS",
        message: "Création d' favoris effectué!",
      });
    })
    .catch((error) => {
      res.json({
        status: "ECHEC",
        message: "Error",
      });
    });
  }
});


siteRoutes.get("/myfavorite", async (req, res) => {
  const { idUser } = req.body;
  console.log("idUser ùùùùùùùùùùùùù", idUser);
    try {
        const sites = await Site.findAndCountAll({
          include:[
            {
              model: Region,
              as: 'Region',
              include: {
                model: Province,
              },
            },

            {
              model: Category,
              as: 'Category',
            },
            {
              model: Media,
              as:'Media',
            },
            {
              model: Commentaire,
              as:'Commentaire',
            },
            {
              model: Favoris,
              as: 'Favoris',
              where: {
                idUser,
                etat: 0
              }
            }
          ],
        });
        res.json(sites);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error', msg: error });
    }
});

module.exports = siteRoutes;
