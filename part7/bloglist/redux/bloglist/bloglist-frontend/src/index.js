import React from 'react'
import ReactDOM from 'react-dom/client'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import App from './App'
import './index.css'
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'
import usersReducer from './reducers/usersReducer'

const store = configureStore({
  reducer: {
    blogs: blogReducer,
    user: userReducer,
    users: usersReducer
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)