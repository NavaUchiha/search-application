import React, { PureComponent } from 'react'

import {
  getBookmarkArrayFromLocalStorage,
  getUserObjectFromLocalStorage,
} from '../service/LocalStorage'
// const { LocalStorage } = require("../service/LocalStorage");

const { useState, useContext } = require('react')

const userContext = React.createContext()
console.log('userObject in user Context : ', userContext)
const userUpdateContext = React.createContext()

export const useUserContext = () => {
  return useContext(userContext)
}
export const useUserUpdateContext = () => {
  return useContext(userUpdateContext)
}

export function UserContextProvider({ children }) {
  const userObjectFromLocalStorage = getUserObjectFromLocalStorage()

  const [userObject, setUserObject] = useState(
    userObjectFromLocalStorage ? userObjectFromLocalStorage : {},
  )
  const updateUserObject = (updateUserObject) => {
    setUserObject(updateUserObject)
  }

  return (
    <userContext.Provider value={userObject}>
      <userUpdateContext.Provider value={updateUserObject}>
        {children}
      </userUpdateContext.Provider>
    </userContext.Provider>
  )
}
