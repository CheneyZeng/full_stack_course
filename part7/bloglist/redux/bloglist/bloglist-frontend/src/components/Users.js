import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'
import LoginForm from './LoginForm'

const UsersTable = () => {
  const users = useSelector(state => state.users)
  console.log('users', users)

  return (
    <div>
      <h2>Users</h2>
      <Table striped>
        <tbody>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
          {users.map(user => (
            <tr key={user.id}>
              <td><Link to={`/users/${user.id}`}>{user.username}</Link></td>
              <td>{user.blogs.length}</td>
            </tr>
          )
          )}
        </tbody>
      </Table>
    </div>
  )
}


const Users = () => {
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
        <UsersTable />
      </div>
    )
  }
}

export default Users