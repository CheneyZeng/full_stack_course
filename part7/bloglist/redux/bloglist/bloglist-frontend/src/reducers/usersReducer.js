import { createSlice } from '@reduxjs/toolkit'
import usersService from '../services/users'

const usersSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    setUsers(state, action) {
      return action.payload
    },
  }
})

export const setUsers = () => {
  return async dispatch => {
    const users = await usersService.getAll()
    dispatch(usersSlice.actions.setUsers(users))
  }
}

export default usersSlice.reducer