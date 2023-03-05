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
    res.render('books/details', {title: 'Add a Book', books: book, action: '/books/add'});
});

// POST process the Book Details page and create a new Book - CREATE
router.post('/add', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/

    let data = req.body;
    const addBook = {
      "Title": req.body.title,
      "Description": req.body.description,
      "Price": parseInt(req.body.price),
      "Author": req.body.author,
      "Genre": req.body.genre,
   };
   book.create(addBook, (err,book)=> {
     if (err) {
       res.send(err);
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

    book.findById(req.params.id, (err, book) => {
      if (err) {
        return console.error(err);
      } 
      else {
        res.render('books/details', {title: 'Edit a Book', books: book, action: "",});
      }
    });
});

// POST - process the information passed from the details form and update the document
router.post('/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/

    let data = req.body;
    // Formats data accordinly
    const updateData = {
      "Title": req.body.title,
      "Description": req.body.description,
      "Price": parseInt(req.body.price),
      "Author": req.body.author,
      "Genre": req.body.genre,
    };
    book.update({ _id: req.params.id }, updateData, { updateData: true }, (err) => {
        if (err) 
        {
          console.log(err);
          res.end(err);       
        } 
        else {
          res.redirect("/books");
        }
      }
    );

});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/

    book.remove({ _id: req.params.id }, (err) => {
      if (err) {
        return console.error(err);
      } else {
        res.redirect("/books");
      }
    });
});


module.exports = router;
