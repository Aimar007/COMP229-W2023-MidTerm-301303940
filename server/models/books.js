/*****************************************
 * Name: Guo Huang
 * StudentID: 301303940
 * Web App name: COMP229-MidTerm-301303940
 *****************************************/


let mongoose = require('mongoose');

// create a model class
let book = mongoose.Schema({
    Title: String,
    Description: String,
    Price: Number,
    Author: String,
    Genre: String
},
{
  collection: "books"
});

module.exports = mongoose.model('Books', book);
