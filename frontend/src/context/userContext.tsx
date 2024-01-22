import React, { createContext, useContext, useState } from 'react'

const UserContext = createContext<any | undefined>(undefined)

const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)

  const updateCurrentUser = (newUserData) => {
    setCurrentUser(newUserData)
  }

  const contextValue = {
    currentUser,
    updateCurrentUser,
  }

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  )
}

const useCurrentUser = () => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('userContext must be used within a UserProvider')
  }
  return context
}

export { UserProvider, useCurrentUser }
