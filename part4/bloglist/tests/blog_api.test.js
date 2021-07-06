const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');
const helper = require('./test_helper');

const api = supertest(app);

beforeEach(async () => {
    await Blog.deleteMany({});

    await Promise.all(
        helper.initialBlogs.map(async (blog) => {
            let blogObject = new Blog(blog);
            return blogObject.save();
        })
    );
});

test('all blogs are returned as json', async () => {
    const response = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/);

    expect(response.body).toHaveLength(helper.initialBlogs.length);
});

test('blog id properly formatted', async () => {
    const response = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/);

    response.body.forEach(
        blog => expect(blog.id).toBeDefined()
    );
});

test('a valid blog can be added', async () => {
    const newBlog = {
        title: "The Anatomy of a Bull Pizzle",
        author: "Grover Mahoney",
        url: "http://www.grovermahoney.com/anatomy-of-a-bull-pizzle.html",
        likes: 0,
    };

    await api.post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

    const contents = blogsAtEnd.map(blog => blog.title);
    expect(contents).toContain('The Anatomy of a Bull Pizzle');
});

test('a blog without any likes has default set correctly', async () => {
    const newBlog = {
        title: "This is a blog post with no likes",
        author: "Liam Mahoney",
        url: "https://liammahoney.dev"
    }

    const response = await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/);

    expect(response.body.likes).toEqual(0);
});

test('a new blog without a title causes error', async () => {
    const newBlog = {
        author: "Liam Mahoney",
        url: "https://google.com",
        likes: 0
    };

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400);
});

test ('a new blog without a url causes error', async () => {
    const newBlog = {
        title: "lol",
        author: "Liam Mahoney",
        likes: 0
    };

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400);
});

afterAll(() => {
    mongoose.connection.close();
})