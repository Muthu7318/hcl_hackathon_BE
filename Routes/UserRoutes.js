const express = require("express");
const userController = require("../controllers/usersController");
const authController = require("../controllers/authController");

const Router = express.Router();

Router.route("/login").post(authController.login);

Router.use(authController.protect);
