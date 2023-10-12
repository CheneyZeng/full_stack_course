import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blog',
  initialState: [],
  reducers: {
    like(state, action) {
      const changedBlog = action.payload
      return state.map(blog =>
        blog.id !== changedBlog.id ? blog : changedBlog
      )
    },
    addComments(state, action) {
      const changedBlog = action.payload
      return state.map(blog =>
        blog.id !== changedBlog.id ? blog : changedBlog
      )
    },
    createBlog(state, action) {
      return state.concat(action.payload)
    },
    removeBlog(state, action) {
      const removeBlog = action.payload
      return state.filter(blog => blog.id !== removeBlog.id)
    },
    setBlogs(state, action) {
      return action.payload
    },
  }
})

export const initializeblogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(blogSlice.actions.setBlogs(blogs))
  }
}

export const { setBlogs } = blogSlice.actions

export const createBlog = (content) => {
  return async dispatch => {
    const newBlog = await blogService.createBlog(content)
    dispatch(blogSlice.actions.createBlog(newBlog))
  }
}

export const updateLike = (blog) => {
  return async dispatch => {
    const blogToUpdate = {
      likes: blog.likes + 1,
    }
    const updatedBlog = await blogService.putBlog(blog.id, blogToUpdate)
    dispatch(blogSlice.actions.like(updatedBlog))
  }
}

export const addComments = (id, comment) => {
  return async dispatch => {
    const blogToUpdate = {
      comment: comment
    }
    const updatedBlog = await blogService.postBlogComments(id, blogToUpdate)
    dispatch(blogSlice.actions.addComments(updatedBlog))
  }
}

export const removeBlog = (blog) => {
  return async dispatch => {
    await blogService.deleteBlog(blog.id)
    dispatch(blogSlice.actions.removeBlog(blog))
  }
}

export default blogSlice.reducer