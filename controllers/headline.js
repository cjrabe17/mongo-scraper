var db = require("../models");

module.exports = {
    findAll: function(req, res) {
        db.Headline
        .find(req.query)
        .sort(
            {
                date: -1
            }
        ).then(function(dbHeadline) {
            res.json(dbHeadline);
        });
    },
    delete: function(req, res) {
        db.Headline.remove(
            {
                _id: req.params.id
            }
        ).then(function(dbHeadline) {
            res.json(dbHeadline);
        });
    },
    update: function(req, res) {
        db.Headline.update({_id: req.params.id}, {$set: {
                saved: true
            }
        }, function(err, edited) {
            if (err) {
                console.log(err);
            } else {
                res.send(edited);
            }
        });
    }
};