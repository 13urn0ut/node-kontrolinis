const Router = require("express").Router();
const { getAll } = require("../controllers/Controller");
const checkBody = require("../validators/checkBody");
const validate = require("../validators/validate");

Router.route("/").get(checkBody, validate, getAll);

module.exports = Router;
