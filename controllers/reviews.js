const Listing = require("../models/listing");
const Review = require("../models/review");

module.exports.createReview = async (req, res) => {
    let listing = await Listing.findById(req.params.id).populate("reviews");
    if (!listing) {
        req.flash("error", "Listing not found");
        return res.redirect("/listings");
    };
    let newReview = new Review(req.body);
    newReview.author = req.user._id;
    await newReview.save();

    listing.reviews.push(newReview);
    await listing.save();

    listing = await Listing.findById(req.params.id).populate("reviews");
    await updateAvgRating(listing);

    req.flash("success", "New Review Created");
    res.redirect(`/listings/${listing._id}`);
};

module.exports.destroyReview = async (req, res, next) => {
    let { id, reviewId } = req.params;

    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } }).populate("reviews");

    const listing = await Listing.findByIdAndUpdate(
        id,
        { $pull: { reviews: reviewId } },
        { new: true }
    ).populate("reviews");

    await Review.findByIdAndDelete(reviewId);
    await updateAvgRating(listing);

    req.flash("success", "Review Deleted");
    res.redirect(`/listings/${id}`);
};


async function updateAvgRating(listing) {
    const total = listing.reviews.reduce((sum, review) => sum + review.rating, 0);
    const avg = listing.reviews.length ? total / listing.reviews.length : 0;
    listing.avgRating = parseFloat(avg.toFixed(1));
    await listing.save();
}