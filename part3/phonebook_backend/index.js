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
    Person.find({}).then((persons) => {
        const info = `Phonebook has info for ${persons.length} people\n\n${new Date()}`;

        response.end(info);
    })
});

app.get('/api/persons', (request, response, next) => {
    Person.find({}).then((persons) => {
        response.json(persons);
    }).catch((error) => {
        next(error);
    })
});

app.post('/api/persons', (request, response, next) => {
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
    }).catch((error) => {
        next(error);
    })
});

app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id).then((person) => {
        if (person) {
            response.json(person);
        } else {
            response.status(404).end();
        }
    }).catch((err) => {
        next(err);
    })

});

app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndRemove(request.params.id).then((perosn) => {
        response.status(204).end();
    }).catch((error) => {
        next(error);
    });
})

app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body;

    const person = {
        name: body.name,
        number: body.number
    }

    Person.findByIdAndUpdate(request.params.id, person, {new: true}).then((updatedPerson) => {
        response.json(updatedPerson);
    }).catch((error) => {
        next(error);
    });
})

function handleError(error, request, response, next) {
    console.error(error.message);

    if (error.name === 'CastError') {
        return response.status(400).send({error: 'malformed ID'});
    }

    next(error);
}

app.use(handleError);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`);
})