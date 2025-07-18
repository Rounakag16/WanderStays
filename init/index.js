const mongoose = require("mongoose");
const initData = require("./data");
const Listing = require("../models/listing");

mongoose.connect(process.env.ATLAS_DB)
    .then(() => console.log("Mongodb Connected"))
    .catch(err => console.log(err));

const initDb = async () => {
    try {
        await Listing.deleteMany({});
        initData.data = initData.data.map((obj) => ({ ...obj, owner: "68441d655601abc057532f18" }));
        await Listing.insertMany(initData.data);
        console.log("Data initialised");
    }
    catch (err) {
        console.log(err);
        console.log("Data not initialised");
    }
};

initDb();