mongoose = require('mongoose');
const MONG_URI = 'mongodb://localhost:27017/BooksData'; 

mongoose.connect(MONG_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false
});

const db = mongoose.connection;

db.on('error', function (err) {
    console.log('Error occurred: ' + err);
});

db.once('connected', function () {
    console.log("Current Version of Mongoose installed: " + mongoose.version);
    console.log('Connection is successful to ' + MONG_URI);
});

module.exports = db;
