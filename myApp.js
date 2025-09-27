require('dotenv').config();
const mongoose = require('mongoose');

// 1. Conexión a MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// 2. Definir el esquema y modelo
const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String], // Array de Strings
});

const Person = mongoose.model("Person", personSchema);

// ----------------------------------------------------
// 1. Crear y guardar una persona
// ----------------------------------------------------
const createAndSavePerson = (done) => {
  const person = new Person({
    name: "John",
    age: 25,
    favoriteFoods: ["Pizza", "Burger"],
  });

  person.save((err, data) => {
    if (err) return done(err);
    done(null, data);
  });
};

// ----------------------------------------------------
// 2. Crear muchas personas
// ----------------------------------------------------
const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, data) => {
    if (err) return done(err);
    done(null, data);
  });
};

// ----------------------------------------------------
// 3. Buscar personas por nombre
// ----------------------------------------------------
const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, (err, data) => {
    if (err) return done(err);
    done(null, data);
  });
};

// ----------------------------------------------------
// 4. Buscar una persona por comida favorita
// ----------------------------------------------------
const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, (err, data) => {
    if (err) return done(err);
    done(null, data);
  });
};

// ----------------------------------------------------
// 5. Buscar persona por ID
// ----------------------------------------------------
const findPersonById = (personId, done) => {
  Person.findById(personId, (err, data) => {
    if (err) return done(err);
    done(null, data);
  });
};

// ----------------------------------------------------
// 6. Buscar, editar y guardar
// ----------------------------------------------------
const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  // 1. Buscar persona por ID
  Person.findById(personId, (err, person) => {
    if (err) return done(err);
    if (!person) return done(new Error("Person not found"));

    // 2. Agregar "hamburger" a favoriteFoods
    person.favoriteFoods.push(foodToAdd);

    // 3. Guardar cambios
    person.save((err, updatedPerson) => {
      if (err) return done(err);
      done(null, updatedPerson);
    });
  });
};


exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.createManyPeople = createManyPeople;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;