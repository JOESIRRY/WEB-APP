// Importing required modules
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

// Importing Mongoose Schema
const Books = require("./BooksSchema");

// MongoDB Connection
mongoose.connect("mongodb://localhost:27017/BooksData", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB successfully.");
});

// Initializing Express App
const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// REST API Endpoints

// Get all books
app.get("/allbooks", async (req, res) => {
  try {
    const books = await Books.find();
    res.json(books);
  } catch (err) {
    res.status(500).send("Error retrieving books");
  }
});

// Get a single book by ID
app.get("/getbook/:id", async (req, res) => {
  try {
    const book = await Books.findById(req.params.id);
    if (book) res.json(book);
    else res.status(404).send("Book not found");
  } catch (err) {
    res.status(500).send("Error retrieving the book");
  }
});

// Add a new book
app.post("/addbooks", async (req, res) => {
  try {
    const newBook = new Books(req.body);
    await newBook.save();
    res.status(200).json({ message: "Book added successfully" });
  } catch (err) {
    res.status(400).send("Error adding the book");
  }
});

// Update a book by ID
app.post("/updatebook/:id", async (req, res) => {
  try {
    const updatedBook = await Books.findByIdAndUpdate(
      req.params.id,
      {
        booktitle: req.body.booktitle,
        PubYear: req.body.PubYear,
        author: req.body.author,
        Topic: req.body.Topic,
        formate: req.body.formate,
      },
      { new: true }
    );
    if (updatedBook)
      res.status(200).json({ message: "Book updated successfully" });
    else res.status(404).send("Book not found");
  } catch (err) {
    res.status(400).send("Error updating the book");
  }
});

// Delete a book by ID
app.post("/deleteBook/:id", async (req, res) => {
  try {
    const deletedBook = await Books.findByIdAndDelete(req.params.id);
    if (deletedBook)
      res.status(200).send({ message: "Book deleted successfully" });
    else res.status(404).send("Book not found");
  } catch (err) {
    res.status(500).send("Error deleting the book");
  }
});

// Starting the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
