const blogRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
const mongoose = require('mongoose');

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

blogRouter.post('/', async (request, response, next) => {
    const blog = new Blog(request.body);

    const user = await User.findOne({});
    blog.user = user._id;

    try {
        const savedBlog = await blog.save();
        
        user.blogs = user.blogs.concat(savedBlog._id);
        await user.save();

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

blogRouter.delete('/:id', async (request, response, next) => {
    try {
        const blog = await Blog.findByIdAndRemove(request.params.id);

        if (blog) {
            response.status(204).end();
        } else {
            response.status(404).end();
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