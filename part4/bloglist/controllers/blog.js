const blogRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const middleWare = require('../utils/middleware');

blogRouter.get('/', async (request, response, next) => {
    try {
        const blogs = await Blog
            .find({})
            .populate('user', {name: 1, username: 1});
        response.json(blogs);
    } catch(error) {
        next(error);
    }
});

blogRouter.post('/', middleWare.userExtractor, async (request, response, next) => {
    try {
        const blog = new Blog(request.body);

        const user = await User.findById(request.user.id);
        blog.user = user._id;

        const savedBlog = await blog.save();
        
        user.blogs = user.blogs.concat(savedBlog._id);
        await user.save();

        response.status(201).json(savedBlog);
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            response.status(400).json({
                error: error.message
            })
        } else if (error.name === 'JsonWebTokenError') {
            return response.status(401).json({ error: 'invalid token' });
        }
        next(error);
    }
});

blogRouter.delete('/:id', middleWare.userExtractor, async (request, response, next) => {
    try {
        const blog = await Blog.findById(request.params.id);

        if (blog) {
            if (request.token && blog.user.toString() === request.user.id.toString()) {
                
                await blog.deleteOne();

                response.status(204).end();
            } else {
                response.status(403).json({
                    error: 'forbidden'
                });
            }
        } else {
            response.status(404).json({
                error: 'blog not found'
            });
        }
    } catch (error) {
        next(error);
    }
});

blogRouter.put('/:id', async (request, response, next) => {
    try {
        const body = request.body;

        const blog = {
            likes: body.likes
        };

        const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true });

        response.json(updatedBlog);
    
    } catch (error) {
        next(error);
    }
});

module.exports = blogRouter;