var cheerio = require("cheerio");
var request = require("request");

var scrape = function(cb) {
    console.log("scrape script being accessed");
    request("http://www.nytimes.com", function(err, res, html) {
        var $ = cheerio.load(html);
        var results = [];

        $(".theme-summary").each(function(i, element) {
            var head = $(this).children(".story-heading").text().trim();
            var sum = $(this).children(".summary").text().trim();

            results.push({
                headline: head,
                summary: sum
            });

            if (results.headline && results.summary && results.link) {
                var newEntry = new Headline(results);
                newEntry.save();
            }
        });
    });
};

module.exports = scrape;