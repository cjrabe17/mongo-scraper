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
    },
    date: Date.now(),
    saved: {
        type: Boolean,
        default: false
    }
});

var Headline = mongoose.model("Headline", HeadlineSchema);

module.exports = Headline;