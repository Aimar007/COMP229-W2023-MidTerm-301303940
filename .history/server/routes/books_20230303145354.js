/*****************************************
 * File name: books.js
 * Auther's name: Guo Huang
 * StudentID: 301303940
 * Web App name: COMP229-MidTerm-301303940
 *****************************************/

// modules required for routing
let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");

// define the book model
let Book = require("../models/books");

/* GET books List page. READ */
router.get("/", (req, res, next) => {
  // find all books in the books collection
  Book.find((err, books) => {
    if (err) {
      return console.error(err);
    } else {
      res.render("books/index", {
        title: "Books",
        books: books,
      });
    }
  });
});

//  GET the Book Details page in order to add a new Book
router.get("/add", (req, res, next) => {
  /*****************
   * ADD CODE HERE *
   *****************/
  res.render("books/details", {
    title: "Add a book",
    books: { Title: "", Price: "", Author: "", Genre: "" },
  });
});

// POST process the Book Details page and create a new Book - CREATE
router.post("/add", (req, res, next) => {
  /*****************
   * ADD CODE HERE *
   *****************/
  // get form data
  const { title, price, author, genre } = req.body;

  // init new book
  const newBook = new Book({
    Title: title,
    Price: price,
    Author: author,
    Genre: genre,
  });

  // create new book
  Book.create(newBook)
    .then(() => res.redirect("/books"))
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
});

// GET the Book Details page in order to edit an existing Book
router.get("/:id", (req, res, next) => {
  /*****************
   * ADD CODE HERE *
   *****************/
  // get book id
  let id = req.params.id;

  // find by book id
  Book.findById({ _id: id }, (err, book) => {
    if (err) {
      console.error(err);
      res.send(err);
    } else {
      res.render("books/details", {
        title: "Edit Book",
        books: book,
      });
    }
  });
});

// POST - process the information passed from the details form and update the document
router.post("/:id", (req, res, next) => {
  /*****************
   * ADD CODE HERE *
   *****************/
  // find by book id
  let id = req.params.id;

  // get update data from form
  const { title, price, author, genre } = req.body;

  // init book data
  let updateBook = Book({
    _id: id,
    Title: title,
    Price: price,
    Author: author,
    Genre: genre,
  });

  // update exists book by id
  Book.updateOne({ _id: id }, updateBook, (err) => {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      res.redirect("/books");
    }
  });
});

// GET - process the delete by user id
router.get("/delete/:id", (req, res, next) => {
  /*****************
   * ADD CODE HERE *
   *****************/
  // find by book id
  let id = req.params.id;

  // remove book by id
  Book.remove({ _id: id }, (err) => {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      res.redirect("/books");
    }
  });
});

module.exports = router;
