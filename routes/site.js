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

/**
 * route GET '/site'
 */
siteRoutes.get("/", async (req, res) => {
    try {
        const sites = await Site.findAll({
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
        });
        res.json(sites);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error', msg: error });
    }
});
module.exports = siteRoutes;
