import { useDispatch } from 'react-redux'
import { initializeblogs } from '../reducers/blogReducer'
import { setUser } from '../reducers/userReducer'
import { setMessage } from '../reducers/messageReducer'

const LoginForm = () => {
  const dispatch = useDispatch()
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      dispatch(setUser({
        username: event.target.username.value,
        password: event.target.password.value,
      }))
      event.target.username.value = ''
      event.target.password.value = ''
      dispatch(initializeblogs())
    } catch (exception) {
      setTimeout(() => {
        dispatch(setMessage(
          {
            message: 'Wrong credentials',
            color: 'red'
          }))
      }, 1000)
    }
  }
  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input id="username" name="Username" />
        </div>
        <div>
          password
          <input id="password" name="Password" />
        </div>
        <button type="submit" id="login-button">login</button>
      </form>
    </div>
  )
}

export default LoginForm