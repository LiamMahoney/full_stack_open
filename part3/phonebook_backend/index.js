const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(express.json());
app.use(morgan('tiny'));

let persons = [
    { 
        "name": "Arto Hellas", 
        "number": "040-123456",
        "id": 1
    },
    { 
        "name": "Ada Lovelace", 
        "number": "39-44-5323523",
        "id": 2
    },
    { 
        "name": "Dan Abramov", 
        "number": "12-43-234345",
        "id": 3
    },
    { 
        "name": "Mary Poppendieck", 
        "number": "39-23-6423122",
        "id": 4
    }
]

app.get('/info', (request, response) => {
    const info = `Phonebook has info for ${persons.length} people\n\n${new Date()}`;

    response.end(info);
});

app.get('/api/persons', (request, response) => {
    response.json(persons);
});

app.post('/api/persons', (request, response) => {
    const body = request.body;

    if (!body.name || !body.number) {
        return response.status(400).json({
            error: "name and number are required"
        });
    }

    if (persons.find(p => p.name === body.name)) {
        return response.status(400).json({
            error: "name must be unique"
        })
    }

    const person = {
        name: body.name,
        number: body.number,
        id: Math.floor(Math.random() * 10000)
    }

    persons = persons.concat(person);

    return response.json(person);
});

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);

    const person = persons.find(p => p.id === id);

    if (person) {
        response.json(person);
    } else {
        response.status(404).end();
    }
});

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);

    persons = persons.filter(p => p.id !== id);

    response.status(204).end();
})

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`);
})