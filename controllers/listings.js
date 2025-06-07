const Listing = require("../models/listing");

module.exports.index = async (req, res) => {
    const allListings = await Listing.find({}).populate("reviews");
    res.render("./listings/index", { allListings });
};

module.exports.newListing = (req, res) => {
    res.render("./listings/new");
};

module.exports.showListing = async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id).populate({ path: "reviews", populate: { path: "author" } }).populate("owner");
    if (!listing) {
        req.flash("error", "Lisiting you requested for doesn't exist! ");
        return res.redirect("/listings");
    }
    res.render("./listings/show", { listing });
};

module.exports.createListing = async (req, res, next) => {
    let url = req.file.path;
    let filename = req.file.filename;
    let newListing = new Listing(req.body);
    newListing.owner = req.user._id;
    newListing.image = { url, filename };
    await newListing.save();
    req.flash("success", "New Listing Created");
    res.redirect("/listings");
};

module.exports.editListing = async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Lisiting you requested for doesn't exist! ");
        return res.redirect("/listings");
    }
    let originalUrl = listing.image.url;
    originalUrl = originalUrl.replace("/upload", "/upload/h_300,w_250");
    res.render("./listings/edit", { listing, originalUrl });
};

module.exports.updateListing = async (req, res) => {
    const { id } = req.params;
    let listing = await Listing.findByIdAndUpdate(id, { ...req.body });
    if (req.file) {
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = { url, filename };
        await listing.save();
    }
    req.flash("success", "Listing Updated");
    res.redirect(`/listings/${id}`);
};

module.exports.destoryListing = async (req, res) => {
    const { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing Deleted");
    res.redirect("/listings");
};

module.exports.filterListing = async (req, res) => {
    let allCategory = ["trending", "room", "iconic_city", "mountain", "castle", "amazing_pool", "camping", "farm", "artic", "dome", "boat"];
    let { category } = req.params;
    if (!category) {
        req.flash("error", "Category is required!");
        return res.redirect("/listings");
    };
    category = category.toLowerCase();
    if (!allCategory.includes(category)) {
        req.flash("error", "No such filter exists!");
        return res.redirect("/listings");
    }
    const filteredListings = await Listing.find({ category: category });
    res.render("./listings/filter", { filteredListings });
};

module.exports.searchListings = async (req, res) => {
    let { prompt } = req.query;
    const searchedListings = await Listing.find({
        $or: [
            { location: { $regex: prompt, $options: 'i' } },
            { country: { $regex: prompt, $options: 'i' } }
        ]
    });

    if (!searchedListings.length) {
        req.flash("error", "No listings found!");
        return res.redirect("/listings");
    }
    res.render("./listings/search", { searchedListings });
};