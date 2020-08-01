const mongoose = require("mongoose")

const infoSchema = mongoose.Schema({
    totalRequests: Number,
    totalQuotes: Number,
});

module.exports = mongoose.model("Info", infoSchema);