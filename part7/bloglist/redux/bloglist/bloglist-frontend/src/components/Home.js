import { useSelector } from 'react-redux'
import Notification from './Notification'
import CreateNewForm from './CreateNewForm'
import Togglable from './Togglable'
import LoginForm from './LoginForm'
import BlogList from './BlogList'

const Home = () => {
  const user = useSelector(state => state.user)

  if ( user === null ) {
    return (
      <div>
        <Notification />
        <LoginForm />
      </div>
    )
  } else {
    return (
      <div>
        <h2>blogs</h2>
        <Notification />
        <p>{user.username} logged in <button onClick={() => window.localStorage.removeItem('loggedBlogappUser') }>Log out</button></p>
        <Togglable buttonLabel="create new blog">
          <CreateNewForm />
        </Togglable>
        <BlogList />
      </div>
    )
  }
}

export default Home