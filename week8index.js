const mongoose = require('mongoose');

const MONGO_URI = 'mongodb://localhost:27017/Week8';

mongoose.connect(MONGO_URI, { useUnifiedTopology: true, useNewUrlParser: true });

const db = mongoose.connection;

db.on('error', function (err) {
  console.log("Error occurred during connection: " + err);
});

db.once('connected', function () {
  console.log(`Connected to ${MONGO_URI}`);
});

const PersonSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  Gender: String,
  Salary: Number
});


const personDoc = mongoose.model('Person', PersonSchema, 'personCollection');


const manyPersons = [
  { name: 'Simon', age: 42, Gender: "Male", Salary: 3456 },
  { name: 'Neesha', age: 23, Gender: "Female", Salary: 1000 },
  { name: 'Mary', age: 27, Gender: "Female", Salary: 5402 },
  { name: 'Mike', age: 40, Gender: "Male", Salary: 4519 }
];


personDoc.insertMany(manyPersons)
  .then(function() {
    console.log("Data inserted"); 
  })
  .catch(function(error) {
    console.log(error);
  });


personDoc.find().limit(5)
  .then(function(docs) {
    console.log("Fetching all documents (Limited to 5):");
    docs.forEach(function(Doc) {
      console.log(Doc.name, Doc.age, Doc.Gender, Doc.Salary);
    });
  })
  .catch(function(err) {
    console.error(err);
  });


let givenAge = 25; 
personDoc.find({ Gender: "Female", age: { $gt: givenAge } })
  .then(function(docs) {
    console.log(`Fetching documents with Gender: Female and Age > ${givenAge}`);
    docs.forEach(function(Doc) {
      console.log(Doc.name, Doc.age, Doc.Gender, Doc.Salary);
    });
  })
  .catch(function(err) {
    console.error(err);
  });


personDoc.countDocuments()
  .then(function(count) {
    console.log("Total documents Count:", count);
  })
  .catch(function(err) {
    console.error(err);
  });


personDoc.find({ age: { $gte: 25 } })
  .then(function(docs) {
    console.log("Showing age greater than 25:");
    docs.forEach(function(Doc) {
      console.log(Doc.age, Doc.name);
    });
  })
  .catch(function(err) {
    console.error(err);
  });

personDoc.deleteMany({ age: { $gte: 25 } })
  .then(function(result) {
    console.log("Deleted documents:", result);
  })
  .catch(function(err) {
    console.error(err);
  });


personDoc.updateMany({ Gender: "Female" }, { $set: { Salary: 5555 } })
  .then(function(result) {
    console.log(`${result.nModified} documents updated`);
  })
  .catch(function(err) {
    console.error(err);
  });
