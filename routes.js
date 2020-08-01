const express = require("express")
const Quote = require("./models/Quote")
const Info = require("./models/Info")

const router = express.Router()

// Get all quotes
router.get("/quotes", async(req, res) => {
    const quotes = await Quote.find()
    res.send(quotes)
});

// Get a random quote
router.get("/quotes/random", async(req, res) => {
        Quote.countDocuments().exec(function(err, count) {
            if (err) {
                res.status(400);
                res.send(err);
            } else {
                // Get a random entry
                var random = Math.floor(Math.random() * count)

                // Again query all users but only fetch one offset by our random #
                Quote.findOne().skip(random).exec(
                    function(err, result) {
                        if (err) {
                            res.status(400);
                            res.send(err);
                        } else {
                            Info.findOneAndUpdate({}, { $inc: { 'totalRequests': 1 } }).exec(function(err) {
                                console.log("passed");
                                res.send(result);
                            });
                        }
                    });
            }

        });
    })
    // Create a new quote
router.post("/quotes", async(req, res) => {
    const quote = new Quote({
        author: req.body.author,
        content: req.body.content,
        imageUrl: req.body.imageUrl,
        createdAt: new Date()
    });
    quote.save((err) => {
        if (err) {
            res.status(400);
            res.send(err);
        } else {
            Info.findOneAndUpdate({}, { $inc: { 'totalQuotes': 1 } }).exec(function(err) {
                res.send(quote);

            });

        }
    });
});

router.get('/info', async(req, res) => {
    const info = await Info.findOne()
    res.send(info)
});


module.exports = router