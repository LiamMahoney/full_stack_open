import React, { useState, useRef } from 'react';
import blogService from '../services/blogs';
import Togglable from './Togglable';

const BlogForm = (props) => {

    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [url, setUrl] = useState('');
    const blogFormRef = useRef();

    const handleSubmit = async (event) => {
        // try {
            event.preventDefault();

            const blog = {
                title,
                author,
                url
            }
            blogFormRef.current.toggleVisbility();

            const response = await blogService.create(blog);
            
            props.setBlogs(props.blogs.concat(response));
            props.setNotification({
                message: `a new blog ${title} by ${author} was added`,
                type: 'success'
            });
            
            setTitle('');
            setAuthor('');
            setUrl('');
        // } catch (error) {
        //     props.setNotification({
        //         message: 'experienced an error. Please try again',
        //         type: 'error'
        //     })
        // } finally {
        //     setTimeout(() => {
        //         props.setNotification('')
        //     }, 5000);
        // }
 
    }

    return (
    <Togglable buttonLabel="new blog" ref={blogFormRef}>
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
    </Togglable>

    );
}

export default BlogForm;