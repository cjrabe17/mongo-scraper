var db = require("../models");
var scrape = require("../scripts/scrape");

module.exports = {
    scrapeHeadlines: function(cb) {
        console.log("fetching");
        scrape(function(data) {
            var articles = data;
            for (var i = 0; i < articles.length; i++) {
                articles[i].saved = false;
            }

            Headline.collection.insertMany(articles, {ordered: false}, function(err, docs) {
                cb(err, docs);
            });
        });
    }
};