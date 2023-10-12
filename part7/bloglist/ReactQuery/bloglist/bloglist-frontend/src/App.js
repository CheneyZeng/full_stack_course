import { useState, useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import Notification from './components/Notification'
import CreateNewForm from './components/CreateNewForm'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'
import blogService from './services/blogs'
import loginService from './services/login'
import { useUserValue, useUserDispatch } from './context/userContext'
import { useNotificationValue, useNotificationDispatch } from './context/notificationContext'


const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      useUserDispatch({ type: 'SET', data: user })
      blogService.setToken(user.token)
    }
  }, [])

  const { isLoading, data } = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
  })
  const queryClient = useQueryClient()
  const newBlogMutation = useMutation(blogService.createBlog, {
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData('blogs')
      queryClient.setQueryData('blogs', blogs.concat(newBlog))
    }
  })

  const putBlogMutation = useMutation(blogService.putBlog, {
    onSuccess: (updatedBlog) => {
      const blogs = queryClient.getQueryData('blogs')
      const newBlogs = blogs.map((blog) =>
        blog.id === updatedBlog.id ? updatedBlog : blog
      )
      queryClient.setQueryData('blogs', newBlogs)
    },
  })

  const deleteBlogMutation = useMutation(blogService.deleteBlog, {
    onSuccess: (deletedBlog) => {
      const blogs = queryClient.getQueryData('blogs')
      const newBlogs = blogs.filter((blog) => blog.id !== deletedBlog.id)
      queryClient.setQueryData('blogs', newBlogs)
    }
  })

  if (isLoading) return (
    <div>Loading</div>
  )

  const blogs = data

  const onLikeAdd = async (id, blog) => {
    putBlogMutation.mutate(id, blog)
  }

  const onRemove = async (id) => {
    deleteBlogMutation.mutate(id)
    useNotificationDispatch({ type: 'SET', data: { message: 'Blog removed', color: 'green' } })
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
      useUserDispatch({ type: 'SET', data: user })
      setUsername('')
      setPassword('')
    } catch (exception) {
      setTimeout(() => {
        useNotificationDispatch({ type: 'SET', data: { message: 'Wrong credentials', color: 'red' } })
      }, 1000)
    }
  }

  const handleCreate = async (event) => {
    event.preventDefault()
    try {
      const newBlog = { title, author, url }
      newBlogMutation.mutate(newBlog)
      setTimeout(() => {
        useNotificationDispatch({ type: 'SET', data: { message: `a new blog ${title} by ${author} added`, color: 'green' } })
      }, 1000)
    } catch (exception) {
      console.log(`error: ${exception}`)
    }
  }

  const user = useUserValue()
  const { message, color } = useNotificationValue()
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