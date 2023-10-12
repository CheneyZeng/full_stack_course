import { createSlice } from '@reduxjs/toolkit'

const messageSlice = createSlice({
  name: 'message',
  initialState: [],
  reducers: {
    setMessage(state, action) {
      return action.payload
    },
  }
})

export const setMessage = (content) => {
  return async dispatch => {
    dispatch(messageSlice.actions.setMessage(content))
  }
}

export default messageSlice.reducer