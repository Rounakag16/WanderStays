const Joi = require("joi");

module.exports.listingSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    category: Joi.array().items(Joi.string().valid(
        "trending", "room", "iconic_city", "mountain", "castle",
        "amazing_pool", "camping", "farm", "artic", "dome", "boat"
    )),
    location: Joi.string().required(),
    country: Joi.string().required(),
    price: Joi.number().required().min(0),
    image: Joi.string().allow("", null),
    avgRating: Joi.number(),
}).required();

module.exports.reviewSchema = Joi.object({
    rating: Joi.number().required().min(0).max(5),
    comment: Joi.string().required()
}).required();