import { useSelector } from 'react-redux'
import TogglableBlog from './TogglableBlog'

const BlogList = () => {
  const blogs = useSelector(state => state.blogs)
  console.log('blogs', blogs)
  if (blogs) {
    return blogs.slice().sort((a, b) => b.likes - a.likes)
      .map(blog => (
        <TogglableBlog key={blog.id} blog={blog} />
      )
      )
  }
}

export default BlogList