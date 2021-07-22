import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      setUser(user);
      setUsername('');
      setPassword('');
    } catch(error) {
      console.error(error);
    }
  }

  return (
    <div>
      {
        user ?
          <div>
            <p>{user.name} logged in</p>
            <h2>blogs</h2>
            {blogs.map(blog =>
              <Blog key={blog.id} blog={blog} />
            )}
          </div> :
        <LoginForm 
          submitHandler={submitHandler} 
          setUsername={setUsername} 
          setPassword={setPassword}
          username={username}
          password={password}
        />
      }
    </div>
  )
}

export default App