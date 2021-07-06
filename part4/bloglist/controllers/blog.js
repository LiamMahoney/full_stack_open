const blogRouter = require('express').Router();
const Blog = require('../models/blog');
const mongoose = require('mongoose');

blogRouter.get('/', async (request, response, next) => {
    try {
        const blogs = await Blog.find({});
        response.json(blogs);
    } catch(error) {
        next(error);
    }
});

blogRouter.post('/', async (request, response, next) => {
    const blog = new Blog(request.body);

    try {
        const savedBlog = await blog.save();
        response.status(201).json(savedBlog);
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            response.status(400).json({
                error: error.message
            })
        }
        next(error);
    }
});

module.exports = blogRouter;