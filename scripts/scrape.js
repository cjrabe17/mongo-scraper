var cheerio = require("cheerio");
var request = require("request");

var scrape = function (callback) {
    request("https://www.theonion.com/", function(err, res, body) {
        var $ = cheerio.load(body);

        var articles = [];
    
        $("div.curation-module__item").each(function(i, element) {
            var headlineText = $(element).find("a").text();
            var headlineLink = $(element).find("a").attr("href");

            if (headlineLink && headlineText) {
                var newData = {
                    headline: headlineText,
                    Link: headlineLink
                };

                articles.push(newData);
            }
        });
        callback(articles);
    });
}

module.exports = scrape;