var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var HeadlineSchema = new Schema({
    headline: {
        type: String,
        required: true
    },
    summary: String,
    url: {
        type: String,
        required: true
    },
    note: {
        type: Schema.Types.ObjectId,
        ref: "Note"
      }
});

var Headline = mongoose.model("Headline", HeadlineSchema);

module.exports = Headline;