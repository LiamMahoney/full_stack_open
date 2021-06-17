require('dotenv').config()
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const Person = require('./models/person');

const app = express();

morgan.token('body', function getBody(req) {
    return JSON.stringify(req.body);
})

app.use(express.json());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

app.use(cors());
app.use(express.static('build'))

app.get('/info', (request, response) => {
    const info = `Phonebook has info for ${persons.length} people\n\n${new Date()}`;

    response.end(info);
});

app.get('/api/persons', (request, response) => {
    Person.find({}).then((persons) => {
        response.json(persons);
    });
});

app.post('/api/persons', (request, response) => {
    const body = request.body;

    if (!body.name || !body.number) {
        return response.status(400).json({
            error: "name and number are required"
        });
    }

    const person = new Person({
        name: body.name,
        number: body.number
    });

    person.save().then((result) => {
        return response.json(result);
    });
});

app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id).then((person) => {
        if (person) {
            response.json(person);
        } else {
            response.status(404).end();
        }
    }).catch((err) => {
        response.status(500).end();
    })

});

app.delete('/api/persons/:id', (request, response) => {
    Person.findByIdAndRemove(request.params.id).then((perosn) => {
        response.status(204).end();
    }).catch((error) => {
        response.status(403).end();
    });
})

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`);
})