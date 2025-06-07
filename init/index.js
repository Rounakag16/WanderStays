const mongoose = require("mongoose");
const initData = require("./data");
const MONGO_URL = "mongodb://localhost:27017/WanderStays";
const Listing = require("../models/listing");

mongoose.connect(MONGO_URL)
    .then(() => console.log("Mongodb Connected"))
    .catch(err => console.log(err));

const initDb = async () => {
    try {
        await Listing.deleteMany({});
        initData.data = initData.data.map((obj) => ({ ...obj, owner: "6842c92348f8080f7154b000" }));
        await Listing.insertMany(initData.data);
        console.log("Data initialised");
    }
    catch (err) {
        console.log(err);
        console.log("Data not initialised");
    }
};

initDb();