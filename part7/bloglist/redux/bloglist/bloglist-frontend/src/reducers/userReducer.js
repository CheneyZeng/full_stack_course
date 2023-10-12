import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { setBlogs } from './blogReducer'

const userSlice = createSlice({
  name: 'user',
  initialState: [],
  reducers: {
    setUser(state, action) {
      return action.payload
    },
  }
})

export const setUser = (content) => {
  return async dispatch => {
    console.log('content', content)
    const user = await loginService.login(content)
    window.localStorage.setItem(
      'loggedBlogappUser', JSON.stringify(user)
    )
    blogService.setToken(user.token)
    dispatch(userSlice.actions.setUser(user))
  }
}

export const fetchUser = () => {
  return async dispatch => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(userSlice.actions.setUser(user))
      blogService.setToken(user.token)
      blogService.getAll().then(blogs =>
        dispatch(setBlogs(blogs))
      )
    } else {
      dispatch(userSlice.actions.setUser(null))
    }
  }
}

export default userSlice.reducer