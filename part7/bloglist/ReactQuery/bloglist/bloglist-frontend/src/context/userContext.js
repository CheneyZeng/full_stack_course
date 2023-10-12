import { createContext, useReducer, useContext } from 'react'

const userReducer = (state, action) => {
  switch (action.type) {
  case 'SET':
    return action.data
  case 'REMOVE':
    return false
  default:
    return state
  }
}

const UserContext = createContext()

export const UserContextProvider = ({ children }) => {
  const [user, userDispatch] = useReducer(userReducer, false)

  return (
    <UserContext.Provider value={[user, userDispatch]}>
      {children}
    </UserContext.Provider>
  )
}

export const useUserValue = () => {
  const userAndDispatch = useContext(UserContext)
  return userAndDispatch[0]
}

export const useUserDispatch = () => {
  const userAndDispatch = useContext(UserContext)
  return userAndDispatch[1]
}

export default UserContext