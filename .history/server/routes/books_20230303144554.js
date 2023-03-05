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
let Book = require('../models/books');

/* GET books List page. READ */
router.get('/', (req, res, next) => {
  // find all books in the books collection
  Book.find( (err, books) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('books', {
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

    res.render('books/details', {   //EC
      title: 'Add Book'
     });

});

// POST process the Book Details page and create a new Book - CREATE
router.post('/add', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/

    let newBook = Book({
      "Title": req.body.Title,
      "Description": req.body.Description,
      "Price": req.body.Price,
      "Author": req.body.Author,
      "Genre": req.body.Genre,
    });

    Book.create(newBook,(err,Book) => {
      if(err)
      {
          console.log(err);
          res.end(err);
      }
      else
      {
          res.redirect('/books');
      }
    });

});

// GET the Book Details page in order to edit an existing Book
router.get('/edit/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/

    let id = req.params.id;
    Book.findById(id,(err,bookToEdit) => {
      if(err) 
      {
          console.log(err);
          res.end(err);
      }
      else
      {
          //show the edit view
          res.render('books/edit', {title: 'Edit Book Details', book: bookToEdit});
      }
  });
});

// POST - process the information passed from the details form and update the document
router.post('/edit/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/

    let id = req.params.id;

    let updatedBook = Book({
      "_id":id,
      "Title": req.body.Title,
      "Description": req.body.Description,
      "Price": req.body.Price,
      "Author": req.body.Author,
      "Genre": req.body.Genre,
    });

    Book.updateOne({_id: id}, updatedBook, (err)=>{
        if(err){
            console.log(err);
            res.end(err);
        }
        else
        {
            //refresh the user list
            res.redirect('/books');
        }
    });

});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/

    let id = req.params.id;

    Book.remove({_id: id},(err)=>{
        if(err){
            console.log(err);
            res.end(err);
        }
        else
        {
            //refresh the user list
            res.redirect('/books');
        }
    });
});


module.exports = router;
