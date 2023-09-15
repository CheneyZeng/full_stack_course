import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    vote (state, action) {
      const changedAnecdote = action.payload
      const id = changedAnecdote.id
        return state.map(anecdote =>
          anecdote.id !== id ? anecdote : changedAnecdote 
        )
    },
    createAnecdote (state, action) {
      return state.concat(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const initializeAnecdotes = () => {
  return async dispatch => {
    const notes = await anecdoteService.getAll()
    dispatch(anecdoteSlice.actions.setAnecdotes(notes))
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(anecdoteSlice.actions.createAnecdote(newAnecdote))
  }
}

export const updateVote = (anecdote) => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.updateVote(anecdote)
    dispatch(anecdoteSlice.actions.vote(updatedAnecdote))
  }
}

export default anecdoteSlice.reducer