// Import mongoose
const mongoose = require("mongoose");

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/peopleDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define schema
const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favoriteFoods: [String],
});

// Create model
const Person = mongoose.model("Person", personSchema);

// ----------------------------------------------------
// 1. Create and Save a Person
// ----------------------------------------------------
const createAndSavePerson = (done) => {
  const person = new Person({
    name: "John",
    age: 25,
    favoriteFoods: ["Pizza", "Burger"],
  });

  person.save((err, data) => {
    if (err) return done(err);
    return done(null, data);
  });
};

// ----------------------------------------------------
// 2. Create Many People
// ----------------------------------------------------
const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, data) => {
    if (err) return done(err);
    return done(null, data);
  });
};

// ----------------------------------------------------
// 3. Find People by Name
// ----------------------------------------------------
const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, (err, data) => {
    if (err) return done(err);
    return done(null, data);
  });
};

// ----------------------------------------------------
// 4. Find One by Favorite Food
// ----------------------------------------------------
const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, (err, data) => {
    if (err) return done(err);
    return done(null, data);
  });
};

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.createManyPeople = createManyPeople;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
