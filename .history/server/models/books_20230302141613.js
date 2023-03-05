let mongoose = require('mongoose');

// create a model class
let Book = mongoose.Schema({
    Title: String,
    _id: mongoose.isValidObjectId,
    Price: Number,
    Author: String,
    Genre: String
},
{
  collection: "books"
});

module.exports = mongoose.model('Book', Book);
