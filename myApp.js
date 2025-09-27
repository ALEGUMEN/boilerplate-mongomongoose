require('dotenv').config();
const mongoose = require('mongoose');

// 1. Conexión a MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// 2. Definir esquema y modelo
const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String],
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

  Person.findById(personId, (err, person) => {
    if (err) return done(err);
    if (!person) return done(new Error("Person not found"));

    person.favoriteFoods.push(foodToAdd);

    person.save((err, updatedPerson) => {
      if (err) return done(err);
      done(null, updatedPerson);
    });
  });
};

// ----------------------------------------------------
// 7. Buscar por nombre y actualizar edad a 20
// ----------------------------------------------------
const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate(
    { name: personName },
    { age: ageToSet },
    { new: true },
    (err, updatedDoc) => {
      if (err) return done(err);
      done(null, updatedDoc);
    }
  );
};

// ----------------------------------------------------
// 8. Eliminar una persona por ID
// ----------------------------------------------------
const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, removedDoc) => {
    if (err) return done(err);
    done(null, removedDoc);
  });
};

// ----------------------------------------------------
// 9. Eliminar muchas personas por nombre
// ----------------------------------------------------
const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  Person.remove({ name: nameToRemove }, (err, result) => {
    if (err) return done(err);
    done(null, result);
  });
};

// ----------------------------------------------------
// 10. Query Chain
// ----------------------------------------------------
const queryChain = (done) => {
  const foodToSearch = "burrito";

  Person.find({ favoriteFoods: foodToSearch }) // filtrar por comida
    .sort({ name: 1 })                        // ordenar por nombre ascendente
    .limit(2)                                 // limitar a 2 documentos
    .select("-age")                           // ocultar el campo age
    .exec((err, data) => {                    // ejecutar la query
      if (err) return done(err);
      done(null, data);
    });
};


exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.createManyPeople = createManyPeople;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;



