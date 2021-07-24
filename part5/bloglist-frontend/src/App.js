import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, []);

  useEffect(() => {
    if (window.localStorage.getItem('user')) {
      const user = JSON.parse(window.localStorage.getItem('user'));
      setUser(user);
    }
  }, []);

  const loginHandler = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });

      window.localStorage.setItem(
        'user', JSON.stringify(user)
      );

      setUser(user);
      blogService.setToken(user.token);
      setUsername('');
      setPassword('');
    } catch(error) {
      setNotification({
        message: 'wrong username or password', 
        type: 'error'
      });
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    }
  }

  const logoutHandler = async (event) => {
    event.preventDefault();

    window.localStorage.removeItem('user')
    setUser(null);
  }

  return (
    <div>
      {
        user ?
          <div>
            <p>{user.name} logged in</p>
            <Notification notification={notification}/>
            <button onClick={logoutHandler}>log out</button>
            <BlogForm
              setBlogs={setBlogs}
              blogs={blogs}
              setNotification={setNotification}
            />
            <h2>blogs</h2>
            {blogs.map(blog =>
              <Blog key={blog.id} blog={blog} />
            )}
          </div>
           :
           <div>
            <h2>log into application</h2>
            <Notification notification={notification}/>
            <LoginForm
                loginHandler={loginHandler} 
                setUsername={setUsername} 
                setPassword={setPassword}
                username={username}
                password={password}
              />
           </div>
      }
    </div>
  )
}

export default App