var cheerio = require("cheerio");
var request = require("request");
var db = require(".././models");

var scrape = function(res, req) {
    request("http://www.buzzfeed.com", function(err, res, html) {
        var $ = cheerio.load(html);
        var results = [];

        $(".js-card__content").each(function(i, element) {
            var head = $(this).find("a").find("h2").text();
            var sum = $(this).find("a").find(".js-card__description").text();
            var link = "www.buzzfeed.com" + $(this).find("a").attr("href");

            if (head && sum && link) {
                db.Headline.insertMany({
                    headline: head,
                    summary: sum,
                    url: link
                },
                function(err, inserted) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(inserted);
                    }
                });
            }
        });
    });
};

module.exports = scrape;