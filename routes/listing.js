const express = require("express");
const router = express.Router();
const multer = require('multer')
const { storage } = require("../cloudConfig");
const upload = multer({ storage })
const wrapAsync = require("../utils/wrapAsync");
const { isLoggedIn, isOwner, validateListing } = require("../middleware");
const listingController = require("../controllers/listings");


router
    .route("/")
    .get(wrapAsync(listingController.index))
    .post(isLoggedIn, upload.single("image"), validateListing, wrapAsync(listingController.createListing));

router.get("/new", isLoggedIn, listingController.newListing);

router.get("/search", wrapAsync(listingController.searchListings));

router.get("/filter/:category", wrapAsync(listingController.filterListing));

router
    .route("/:id")
    .get(wrapAsync(listingController.showListing))
    .put(isLoggedIn, isOwner, upload.single("image"), validateListing, wrapAsync(listingController.updateListing))
    .delete(isLoggedIn, isOwner, wrapAsync(listingController.destoryListing));

router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.editListing));

module.exports = router;
