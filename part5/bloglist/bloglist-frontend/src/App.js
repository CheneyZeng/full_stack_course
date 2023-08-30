import { useState, useEffect } from 'react'
import Notification from './components/Notification'
import CreateNewForm from './components/CreateNewForm'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'
import blogService from './services/blogs'
import loginService from './services/login'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [message, setMessage] = useState('')
  const [color, setColor] = useState('green')

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
      blogService.getAll().then(blogs =>
        setBlogs( blogs )
      )
    }
  }, [])

  const onLikeAdd = async (id, blog) => {
    const updatedBlog = await blogService.putBlog(id, blog)
    const newBlogs = blogs.map((blog) =>
      blog.id === id ? updatedBlog : blog
    )
    setBlogs(newBlogs)
  }

  const onRemove = async (id) => {
    await blogService.deleteBlog(id)
    const newBlogs = blogs.filter((blog) => blog.id !== id)
    setMessage('Blog removed')
    setBlogs(newBlogs)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      const blogs = await blogService.getAll()
      setBlogs( blogs )
    } catch (exception) {
      setTimeout(() => {
        setMessage('Wrong credentials')
        setColor('red')
      }, 1000)
    }
  }

  const handleCreate = async (event) => {
    event.preventDefault()
    try {
      const newBlog = { title, author, url }
      const blog = await blogService.createBlog(newBlog)
      setBlogs(blogs.concat(blog))
      setTimeout(() => {
        setMessage(`a new blog ${title} by ${author} added`)
        setColor('green')
      }, 1000)
    } catch (exception) {
      console.log(`error: ${exception}`)
    }
  }


  return (
    <div>
      {user === null && <div>
        <Notification message={message} color={color} />
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          handleUsername={({ target }) => setUsername(target.value)}
          password={password}
          handlePassword={({ target }) => setPassword(target.value)}
        />
      </div>}
      {user !== null && <div>
        <h2>blogs</h2>
        <Notification message={message} color={color} />
        <p>{user.username} logged in <button onClick={() => window.localStorage.removeItem('loggedBlogappUser') }>Log out</button></p>
        <Togglable buttonLabel="create new blog">
          <CreateNewForm
            handleCreate={handleCreate}
            title={title}
            handleTitleChange={({ target }) => setTitle(target.value)}
            author={author}
            handleAuthorChange={({ target }) => setAuthor(target.value)}
            url={url}
            handleUrlChange={({ target }) => setUrl(target.value)}
          />
        </Togglable>
        <BlogList
          blogs={blogs}
          onLikeAdd={onLikeAdd}
          onRemove={onRemove}
        />
      </div>}
    </div>
  )
}

export default App