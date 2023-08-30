import { useState } from 'react'

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
}

const TogglableBlog = ({ blog, onLikeAdd, onRemove }) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const handleLike = () => {
    const blogToUpdate = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user.id,
    }
    onLikeAdd(blog.id, blogToUpdate)
  }

  const handleDelete = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      onRemove(blog.id)
    }
  }

  return (
    <div>
      <div className='blog-abstracts'>
        <span className="title">{blog.title} - </span>
        <span className="author">{blog.author}</span>{' '}
        <button id="view" onClick={toggleVisibility}>
          {visible ? 'hide' : 'show'}
        </button>
      </div>
      {visible && (
        <div className="blog-details" style={blogStyle}>
          <div>{blog.url}</div>
          <div>
            Likes: {blog.likes}{' '}
            <button id="like" onClick={handleLike}>
              like
            </button>{' '}
          </div>
          <div>
            <button id="remove" onClick={handleDelete}>
              remove
            </button>{' '}
          </div>
        </div>
      )}
    </div>
  )
}

export default TogglableBlog