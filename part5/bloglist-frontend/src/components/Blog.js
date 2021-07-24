import React, { useState } from 'react'

const Blog = ({blog}) => {
  const [viewDetails, setViewDetails] = useState(false);

  const detialStyle = {
    borderStyle: 'solid',
    padding: 2,
    margin: 5
  }

  const buttonText = viewDetails ? 'hide' : 'view'
  const detailsHiddenStyle = { display: viewDetails ? '' : 'none' }
  
  return (
    <div style={detialStyle}>
      {blog.title} {blog.author} 
      <button onClick={() => setViewDetails(!viewDetails)}>{buttonText}</button>
      <div style={detailsHiddenStyle}>
        <p>{blog.url}</p>
        <div>
          likes {blog.likes} <button>like</button>
        </div>
        <p>{blog.user && 'name' in blog.user ? blog.user.name : 'unknown'}</p>
      </div>
    </div>  
  )
}

export default Blog