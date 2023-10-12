import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import LoginForm from './LoginForm'

const Blogs = () => {
  const id = useParams().id
  console.log('id', id)
  const users = useSelector(state => state.users)
  const blogs = users.find(user => user.id === id).blogs
  return (
    <div>
      <h3>added blogs</h3>
      <ul>
        {blogs.map(blog =>
          <li key={blog.id}>
            {blog.title}
          </li>
        )}
      </ul>
    </div>
  )
}

const User = () => {
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
        <Blogs />
      </div>
    )
  }
}

export default User