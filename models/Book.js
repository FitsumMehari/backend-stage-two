const { default: mongoose } = require("mongoose");
const mongose = require("mongoose");

const BookSchema = new mongose.Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    isbn: {
        type: String,
        required: true,
    },
    publishedYear: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model("book", BookSchema);