import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { updateLike, removeBlog } from '../reducers/blogReducer'

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
}

const TogglableBlog = ({ blog }) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const dispatch = useDispatch()

  const handleDelete = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      dispatch(removeBlog(blog))
    }
  }

  return (
    <div>
      <div className='blog-abstracts'>
        <span className="title"><Link to={`/blogs/${blog.id}`}>{blog.title} - </Link></span>
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
            <button id="like" onClick={() => dispatch(updateLike(blog))}>
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