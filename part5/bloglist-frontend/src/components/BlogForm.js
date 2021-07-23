import React, { useState } from 'react';
import blogService from '../services/blogs';

const BlogForm = (props) => {

    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [url, setUrl] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        const blog = {
            title,
            author,
            url
        }

        const response = await blogService.create(blog);
        console.log('response', response);
        props.setBlogs(props.blogs.concat(response));

        setTitle('');
        setAuthor('');
        setUrl('');
    }

    return (
        <div>
            <h3>create new</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    title:
                    <input
                        type="text"
                        value={title}
                        name="Title"
                        onChange={({ target }) => setTitle(target.value)}
                    />
                </div>
                <div>
                    author:
                    <input
                        type="text"
                        value={author}
                        name="Author"
                        onChange={({ target }) => setAuthor(target.value)}
                    />
                </div>
                <div>
                    url:
                    <input
                        type="text"
                        value={url}
                        name="URL"
                        onChange={({ target }) => setUrl(target.value)}
                    />
                </div>
                <button onSubmit={handleSubmit}>create</button>
            </form>
        </div>
    );
}

export default BlogForm;