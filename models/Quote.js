const mongoose = require("mongoose")

const quoteSchema = mongoose.Schema({
    author: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    createdAt: String,
});

module.exports = mongoose.model("Quote", quoteSchema);