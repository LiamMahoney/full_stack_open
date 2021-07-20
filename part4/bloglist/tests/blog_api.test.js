const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');
const helper = require('./test_helper');

const api = supertest(app);

beforeEach(async () => {
    jest.setTimeout(10000);

    await Blog.deleteMany({});

    await Promise.all(
        helper.initialBlogs.map(async (blog) => {
            // i give up, hard coding an id. won't work on future test runs
            blog.user = "60f63ba88fc6a40e7d7cfd2e"
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
    const authInfo = await api.post('/api/login')
        .send({ username: 'user', password: 'password'})
        .expect(200);

    const newBlog = {
        title: "The Anatomy of a Bull Pizzle",
        author: "Grover Mahoney",
        url: "http://www.grovermahoney.com/anatomy-of-a-bull-pizzle.html",
        likes: 0,
    };

    await api.post('/api/blogs')
        .send(newBlog)
        .set({ Authorization: `bearer ${authInfo.body.token}`})
        .expect(201)
        .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

    const contents = blogsAtEnd.map(blog => blog.title);
    expect(contents).toContain('The Anatomy of a Bull Pizzle');
});

test('a blog without any likes has default set correctly', async () => {
    const authInfo = await api.post('/api/login')
        .send({ username: 'user', password: 'password'})
        .expect(200);

    const newBlog = {
        title: "This is a blog post with no likes",
        author: "Liam Mahoney",
        url: "https://liammahoney.dev"
    }

    const response = await api
        .post('/api/blogs')
        .set({ Authorization: `bearer ${authInfo.body.token}` })
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/);

    expect(response.body.likes).toEqual(0);
});

test('a new blog without a title causes error', async () => {
    const authInfo = await api.post('/api/login')
        .send({ username: 'user', password: 'password'})
        .expect(200);

    const newBlog = {
        author: "Liam Mahoney",
        url: "https://google.com",
        likes: 0
    };

    await api
        .post('/api/blogs')
        .set({ Authorization: `bearer ${authInfo.body.token}` })
        .send(newBlog)
        .expect(400);
});

test ('a new blog without a url causes error', async () => {
    const authInfo = await api.post('/api/login')
        .send({ username: 'user', password: 'password'})
        .expect(200);

    const newBlog = {
        title: "lol",
        author: "Liam Mahoney",
        likes: 0
    };

    await api
        .post('/api/blogs')
        .set({ Authorization: `bearer ${authInfo.body.token}` })
        .send(newBlog)
        .expect(400);
});

describe('delete blogs', () => {
    test('delete a blog that exists', async () => {
        const authInfo = await api.post('/api/login')
            .send({ username: 'user', password: 'password'})
            .expect(200);

        const blogs = await helper.blogsInDb();
        const validId = blogs[0].id;

        await api
            .delete(`/api/blogs/${validId}`)
            .set({ Authorization: `bearer ${authInfo.body.token}` })
            .expect(204);
    });

    test('delete a blog witha a valid nonexistent id', async () => {
        const authInfo = await api.post('/api/login')
            .send({ username: 'user', password: 'password'})
            .expect(200);
        
        const validNonexistingId = await helper.nonExistingId();

        await api
            .delete(`/api/blogs/${validNonexistingId}`)
            .set({ Authorization: `bearer ${authInfo.body.token}` })
            .expect(404);
    });

    test('delete a blog with an invalid id', async () => {
        const authInfo = await api.post('/api/login')
            .send({ username: 'user', password: 'password'})
            .expect(200);
        
        const nonExistentId = '3242';

        await api
            .delete(`/api/blogs/${nonExistentId}`)
            .set({ Authorization: `bearer ${authInfo.body.token}` })
            .expect(500);
    });
});

afterAll(() => {
    mongoose.connection.close();
})