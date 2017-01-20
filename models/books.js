var mongoose = require('mongoose');

var BookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true }
});

var Book = mongoose.model('Book', BookSchema);

module.exports = Book;