const mongoose = require('mongoose');

if (process.argv.length !== 3 && process.argv.length !== 5) {
    console.log('Usage:\nPrint all of the users in the phonebook\n\tnode mongo.js <password>\n\nAdd new user to phone book\n\tnode mongo.js <password> "FirstName LastName" 123-456-7890');

    process.exit(1);
} else {

    const password = process.argv[2];

    const url = `mongodb+srv://fullstack:${password}@cluster0.osio0.mongodb.net/note-app?retryWrites=true&w=majority`;

    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true });

    const personSchema = new mongoose.Schema({
        name: String,
        number: String
    });

    const Person = mongoose.model('Person', personSchema);

    if (process.argv.length === 3) {
        Person.find({}).then(result => {

            console.log('phonebook:');

            result.forEach(person => {
                console.log(`${person.name} ${person.number}`);
            });

            mongoose.connection.close();
        });
    } else if (process.argv.length === 5) {
        const name = process.argv[3];
        const number = process.argv[4];

        const person = new Person({
            name: name,
            number: number
        });

        person.save().then( () => {

            console.log(`added ${name} number ${number} to phonebook`);

            mongoose.connection.close();
        });
    }
}