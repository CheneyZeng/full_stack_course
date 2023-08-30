import TogglableBlog from './TogglableBlog'

const BlogList = ({ blogs, onLikeAdd, onRemove }) => {
  return blogs.sort((a, b) => b.likes - a.likes)
    .map(blog => (
      <TogglableBlog key={blog.id} blog={blog} onLikeAdd={onLikeAdd} onRemove={onRemove} />
    )
    )
}

export default BlogList