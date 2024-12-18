var express = require("express");
let Books = require('./booksSchema');
let mongodbConnected = require('./MongodbConnect');
const cors = require('cors');
var app = express();
var bodyparser = require("body-parser");

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(cors());

console.log("BOOKS", Books);

app.get('/', function (req, res) {
    res.send("Welcome to the Online Library API");
});

app.get('/about', function (req, res) {
    res.send("MongoDB Express React and Mongoose app, React runs in another application");
    Books.countDocuments().exec()
        .then(count => {
            console.log("Total documents Count before addition:", count);
        })
        .catch(err => {
            console.error(err);
        });
});

app.get('/allbooks1', async (req, res) => {
    const d = await Books.find();
    return res.json(d);
});

app.get('/getbook/:id', function (req, res) {
    let id = req.params.id;
    Books.findById(id, function (err, book) {
        if (err) {
            res.status(400).send(err);
        } else {
            res.json(book);
        }
    });
});

app.post('/addbooks', function (req, res) {
    console.log("Ref", req.body);
    let newbook = new Books(req.body);
    console.log("newbook->", newbook);

    newbook.save()
        .then(() => {
            res.status(200).json({ 'books': 'Book added successfully' });
        })
        .catch(err => {
            res.status(400).send('Adding new book failed');
        });
});

app.post('/updatebook/:id', function (req, res) {
    let id = req.params.id;
    let updatedbook = new Books(req.body);
    console.log("Update ID", id, "Updated Book ->", updatedbook);

    Books.findByIdAndUpdate(id, {
        booktitle: updatedbook.booktitle,
        PubYear: updatedbook.PubYear,
        author: updatedbook.author,
        Topic: updatedbook.Topic,
        formate: updatedbook.formate
    }, function (err) {
        if (err) {
            console.log(err);
            res.status(400).send('Updating book failed');
        } else {
            res.status(200).json({ 'books': 'Book updated successfully' });
        }
    });
});

app.post('/deleteBook/:id', function (req, res) {
    let id = req.params.id;

    console.log("Deleting");
    Books.findByIdAndDelete(id, function (err) {
        if (err) {
            console.log(err);
            res.status(400).send('Deleting book failed');
        } else {
            res.status(200).send('Book Deleted');
        }
    });
});

app.listen(5000, function () {
    console.log("Server is running on the port 5000");
});
