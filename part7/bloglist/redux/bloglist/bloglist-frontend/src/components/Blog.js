import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import LoginForm from './LoginForm'
import { updateLike, addComments } from '../reducers/blogReducer'

const BlogView = () => {
  const dispatch = useDispatch()
  const id = useParams().id
  console.log('id', id)
  const blogs = useSelector(state => state.blogs)
  const blog = blogs.find(blog => blog.id === id)
  return (
    <div>
      <h3>{blog.title}</h3>
      <Link>{blog.url}</Link>
      <p>{blog.likes} likes <button onClick={() => dispatch(updateLike(blog))} >like</button></p>
      <p>added by {blog.author}</p>
    </div>
  )
}

const Comment = () => {
  const dispatch = useDispatch()
  const id = useParams().id
  console.log('id', id)
  const blogs = useSelector(state => state.blogs)
  const blog = blogs.find(blog => blog.id === id)

  const postComment = (event) => {
    event.preventDefault()
    const content = event.target.comment.value
    event.target.comment.value = ''
    dispatch(addComments(id, content))
  }

  return (
    <div>
      <h3>comments</h3>
      <Form onSubmit={postComment}>
        <Form.Group>
          <Form.Label>comment</Form.Label>
          <Form.Control
            type="text"
            name="comment"
            id="comment"
          />
          <Button variant="primary" type="submit">add comment</Button>
        </Form.Group>
      </Form>
      <ul>
        {blog.comments.map(comment =>
          <li key={comment.id}>
            {comment}
          </li>
        )}
      </ul>
    </div>
  )
}

const Blog = () => {
  const user = useSelector(state => state.user)
  console.log('user', user)

  if ( user === null ) {
    return (
      <div>
        <LoginForm />
      </div>
    )
  } else {
    return (
      <div>
        <h2>blogs</h2>
        <p>{user.username} logged in <button onClick={() => window.localStorage.removeItem('loggedBlogappUser') }>Log out</button></p>
        <h2>{user.username}</h2>
        <BlogView />
        <Comment />
      </div>
    )
  }
}

export default Blog