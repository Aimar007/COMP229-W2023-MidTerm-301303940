/*****************************************
 * File name: books.js
 * Auther's name: Guo Huang
 * StudentID: 301303940
 * Web App name: COMP229-MidTerm-301303940
 *****************************************/


// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the book model
let book = require('../models/books');

/* GET books List page. READ */
router.get('/', (req, res, next) => {
  // find all books in the books collection
  book.find((err, books) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('books/index', {
        title: 'Books',
        books: books
      });
    }
  });

});

//  GET the Book Details page in order to add a new Book
router.get('/add', (req, res, next) => {

  /*****************
   * ADD CODE HERE *
   *****************/

  // create new book instance
  let newBook = new book();

  // render books/details and show empty book instance
  res.render('books/details', { title: 'Add book', books: newBook });

});

// POST process the Book Details page and create a new Book - CREATE
router.post('/add', (req, res, next) => {

  /*****************
   * ADD CODE HERE *
   *****************/

  // create new instance of book encapsulating the request parameters
  let newBook = book({
    "Title": req.body.title,
    "Descrioption": req.body.description,
    "Price": req.body.price,
    "Author": req.body.author,
    "Genre": req.body.genre
  });

  // create the new book and redirect to the book list
  book.create(newBook, (err, Book) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      res.redirect('/books');
    }
  });

});

// GET the Book Details page in order to edit an existing Book
router.get('/:id', (req, res, next) => {

  /*****************
   * ADD CODE HERE *
   *****************/

  // get book detail by id, and render and display with details.ejs
  let id = req.params.id;
  book.findById(id, (err, bookToEdit) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      res.render('books/details', { title: 'Edit Book', books: bookToEdit });
    }
  });

});

// POST - process the information passed from the details form and update the document
router.post('/:id', (req, res, next) => {

  /*****************
   * ADD CODE HERE *
   *****************/

  // the POST request to the /:id will be routed here
  // get the book id fron the url params and create a book object for update
  let id = req.params.id;
  let updatedBook = book({
    "_id": id,
    "Title": req.body.title,
    "Descrioption": req.body.description,
    "Price": req.body.price,
    "Author": req.body.author,
    "Genre": req.body.genre
  });

  // update the book of the id in the request parameter
  book.updateOne({ _id: id }, updatedBook, (err) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      res.redirect('/books');
    }
  });

});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {

  /*****************
   * ADD CODE HERE *
   *****************/

  // the GET delete request with id as parameter
  // get the ID, and then remove the book with the id
  let id = req.params.id;
  book.remove({ _id: id }, (err) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      res.redirect('/books');
    }
  });

});


module.exports = router;
