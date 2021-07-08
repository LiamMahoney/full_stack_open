const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Note = require('../models/note');
const helper = require('./test_helper');

const api = supertest(app);

beforeEach(async () => {
    await Note.deleteMany({});

    await Promise.all(
        helper.initialNotes.map(async (note) => {
            const noteObject = new Note(note);
            return noteObject.save();
        })
    );
});


describe('when there is initially some notes saved', () => {
    test('notes are returned as json', async () => {
        await api
            .get('/api/notes')
            .expect(200)
            .expect('Content-Type', /application\/json/);
    });

    test('all notes are returned', async () => {
        const response = await api.get('/api/notes');

        expect(response.body).toHaveLength(helper.initialNotes.length);
    });

    test('a specific note is within the returned notes', async () => {
        const response = await api.get('/api/notes');
        const contents = response.body.map(r => r.content);

        expect(contents).toContain('Browser can execute only Javascript');
    });
});

describe('viewing a specific note', () => {
    test('a specific note can be viewed', async () => {
        const notesAtStart = await helper.notesInDb();

        const noteToView = notesAtStart[0];

        const resultNote = await api
            .get(`/api/notes/${noteToView.id}`)
            .expect(200)
            .expect('Content-Type', /application\/json/);

        const processedNoteToView = JSON.parse(JSON.stringify(noteToView));

        expect(resultNote.body).toEqual(processedNoteToView);
    });

    test('fails with statuscode 404 if note does not exist', async () => {
        const validNonexistingId = await helper.nonExistingId();

        await api
            .get(`/api/notes/${validNonexistingId}`)
            .expect(404);
    });

    test('fails with statuscode 400 if id is invalid', async () => {
        const invalidId = '234535445h453h43h';

        await api
            .get(`/api/notes/${invalidId}`)
            .expect(400);
    });
});

describe('addition of a new note', () => {
    test('a valid note can be added', async () => {
        const newNote = {
            content: 'grover is eating a bull pizzle',
            important: true
        };

        await api.post('/api/notes')
            .send(newNote)
            .expect(200)
            .expect('Content-Type', /application\/json/);

        const notesAtEnd = await helper.notesInDb();
        expect(notesAtEnd).toHaveLength(helper.initialNotes.length + 1);

        const contents = notesAtEnd.map(i => i.content);
        expect(contents).toContain('grover is eating a bull pizzle');
    });

    test('note without content is not added', async () => {
        const newNote = {
            important: true
        };

        await api
            .post('/api/notes')
            .send(newNote)
            .expect(400);

        const notesAtEnd = await helper.notesInDb();

        expect(notesAtEnd).toHaveLength(helper.initialNotes.length);
    });
});

describe('deletion of a note', () => {
    test('a note can be deleted', async () => {
        const notesAtStart = await helper.notesInDb();

        const noteToDelete = notesAtStart[0];

        await api
            .delete(`/api/notes/${noteToDelete.id}`)
            .expect(204);

        const notesAtEnd = await helper.notesInDb();

        expect(notesAtEnd).toHaveLength(
            helper.initialNotes.length - 1
        );

        const contents = notesAtEnd.map(r => r.content);

        expect(contents).not.toContain(noteToDelete.content);
    });
});

afterAll(() => {
    mongoose.connection.close();
});