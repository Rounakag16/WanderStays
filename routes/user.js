const express = require("express");
const wrapAsync = require("../utils/wrapAsync");
const router = express.Router();
const User = require("../models/users");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware");

const userController = require("../controllers/users");

router
    .route("/signup")
    .get(userController.renderSignup)
    .post(wrapAsync(userController.signup));

router
    .route("/login")
    .get(userController.renderLogin)
    .post(saveRedirectUrl, passport.authenticate("local", { failureRedirect: "/login", failureFlash: true }), wrapAsync(userController.login));

router.get("/logout", userController.logout);

module.exports = router;