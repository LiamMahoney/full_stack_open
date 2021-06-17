const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true }).then((result) => {
    console.log('connected to MongoDB');
}).catch((err) => {
    console.log('error occurred connecting to MongoDB:', err);
});

const personSchema = new mongoose.Schema({
    name: {type: String, unique: true, required: true, minLength: 8},
    number: {type: String, required: true}
});

personSchema.plugin(uniqueValidator);

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
});

module.exports = mongoose.model('Person', personSchema);