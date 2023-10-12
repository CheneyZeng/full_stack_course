import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { fetchUser } from './reducers/userReducer'
import { setUsers } from './reducers/usersReducer'
import Home from './components/Home'
import Users from './components/Users'
import User from './components/User'
import Blog from './components/Blog'
import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'
import { Navbar, Nav } from 'react-bootstrap'


const App = () => {
  const padding = {
    padding: 5
  }

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchUser())
    dispatch(setUsers())
  }, [])

  return (
    <Router>
      <div className="container">
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#" as="span">
                <Link style={padding} to="/">home</Link>
              </Nav.Link>
              <Nav.Link href="#" as="span">
                <Link style={padding} to="/users">users</Link>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>

      <Routes>
        <Route path="/blogs/:id" element={<Blog />} />
        <Route path="/users/:id" element={<User />} />
        <Route path="/users" element={<Users />} />
        <Route path="/" element={<Home />} />
      </Routes>

    </Router>
  )

}

export default App