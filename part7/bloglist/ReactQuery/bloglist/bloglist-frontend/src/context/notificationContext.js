import { createContext, useReducer, useContext } from 'react'

const NotificationReducer = (state, action) => {
  switch (action.type) {
  case 'SET':
    return action.data
  case 'REMOVE':
    return false
  default:
    return state
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = ({ children }) => {
  const [notification, notificationDispatch] = useReducer(NotificationReducer, false)

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {children}
    </NotificationContext.Provider>
  )
}

export const useNotificationValue = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[0]
}

export const useNotificationDispatch = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[1]
}

export default NotificationContext