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
const books = require('../models/books');

// define the book model
let book = require('../models/books');

/* GET books List page. READ */
router.get('/', (req, res, next) => {
  // find all books in the books collection
  book.find( (err, books) => {
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
    res.render('books/details', { title: 'Add Book', books: book() })

});

// POST process the Book Details page and create a new Book - CREATE
router.post('/add', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
    const newBook = book({
      Title: req.body.title,
      Price: req.body.price,
      Author: req.body.author,
      Genre: req.body.genre
  });

  book.create(newBook, (err, Book) => {
      if(err) {
          console.log(err);
          res.end(err);
      }
      else {
          // refresh the books
          res.redirect('/books');
      }
  });

});

// GET the Book Details page in order to edit an existing Book
router.get('/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
    const id = req.params.id;
    book.findById(id, (err, bookToEdit) => {
      if (err) {
          console.log(err);
          res.end(err);
      }
      else{
          // show the edit view
          res.render('books/details', { title: 'Edit Book', books: bookToEdit });
      }
  });
});

// POST - process the information passed from the details form and update the document
router.post('/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
    const id = req.params.id;
    const updatedBook = book({
        _id: id,
        Title: req.body.title,
        Price: req.body.price,
        Author: req.body.author,
        Genre: req.body.genre
    });

    book.updateOne({_id: id}, updatedBook, err => {
        if(err) {
            console.log(err);
            res.end(err);
        }
        else {
            // refresh the books
            res.redirect('/books');
        }
    });

});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
  
    const id = req.params.id;
    book.remove({_id: id}, err => {
        if(err) {
            console.log(err);
            res.end(err);
        }
        else {
            // refresh the books
            res.redirect('/books');
        }
    });
});


module.exports = router;
