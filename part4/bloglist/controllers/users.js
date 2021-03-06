const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/user');

usersRouter.get('/', async (request, response) => {
    const users = await User
        .find({})
        .populate('blogs');

    response.json(users);
});

usersRouter.post('/', async (request, response) => {
    const body = request.body;    

    if (!body.password || body.password.length < 3) {
        response.status(400).json({
            error: "invalid password"
        });
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(body.password, saltRounds);
    
    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash
    });

    try {
        const savedUser = await user.save();
        response.json(savedUser);
    } catch (error) {
        if (error.name === 'ValidationError') {           
            return response.status(400).json(error.message);
        }
    }
});

module.exports = usersRouter;