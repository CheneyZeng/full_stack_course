import { useDispatch } from 'react-redux'
import blogService from '../services/blogs'
import { createBlog } from '../reducers/blogReducer'
import { setMessage } from '../reducers/messageReducer'

const createNewForm = () => {
  const dispatch = useDispatch()
  const handleCreate = async (event) => {
    event.preventDefault()
    try {
      const newBlog = { title: event.target.title.value,
        author: event.target.author.value,
        url: event.target.url.value
      }
      const blog = await blogService.createBlog(newBlog)
      dispatch(createBlog(blog))
      setTimeout(() => {
        dispatch(setMessage(
          {
            message: `a new blog ${event.target.title.value} by ${event.target.author.value} added`,
            color: 'green'
          }))
      }, 1000)
    } catch (exception) {
      console.log(`error: ${exception}`)
    }
  }

  return (
    <div>
      <form onSubmit={handleCreate}>
        <div>
          title
          <input name="Title" id="title" />
        </div>
        <div>
          author
          <input id="author" name="Author" />
        </div>
        <div>
          url
          <input id="url" name="Url" />
        </div>
        <button type="submit" id="create">create</button>
      </form>
    </div>
  )
}



export default createNewForm