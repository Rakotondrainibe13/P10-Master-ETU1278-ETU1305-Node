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
const { Op } = require('sequelize');

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
module.exports = siteRoutes;
