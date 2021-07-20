const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const User = require('../models/user');
const helper = require('./test_helper');
const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);

describe('invalid user submitted', () => {
    beforeEach(async() => {
        jest.setTimeout(10000);
        await User.deleteMany({});

        const passwordHash = await bcrypt.hash('password', 10);
        const user = User({
            username: 'user',
            passwordHash
        });

        await user.save();
    });

    test('invalid password length', async () => {
        const usersAtStart = await helper.usersInDb();

        const newUser = {
            username: 'validUsername',
            name: 'grover mahoney',
            password: '12'
        };

        await api
            .post('/api/users/')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/);
        
        const usersAtEnd = await helper.usersInDb();
        expect(usersAtEnd).toHaveLength(usersAtStart.length);

        const usernames = usersAtEnd.map(u => u.username);
        expect(usernames).not.toContain(newUser.username);
    });

    test('invalid username length', async () => {
        const usersAtStart = await helper.usersInDb();

        const newUser = {
            username: '12',
            name: 'Liam Mahoney',
            password: 'valid_password123'
        };

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb();
        expect(usersAtEnd).toHaveLength(usersAtStart.length);

        const usernames = usersAtEnd.map(u => u.username);
        expect(usernames).not.toContain(newUser.username);
    });
});

afterAll(() => {
    mongoose.connection.close();
});