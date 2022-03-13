//const { Constants } = require("../data/Constants");
// import Constants from "../data/Constants";
const Constants = require('./../data/Constants')

const onStartUp = (function () {
  let loginUser = JSON.parse(localStorage.getItem(Constants.LOGIN_USER))
  console.log('onStartUp loginUserJson : ', loginUser)
  if (loginUser === undefined || loginUser === null) {
    localStorage.setItem(
      Constants.LOGIN_USER,
      JSON.stringify(Constants.LOGIN_USER_DEFAULT_VALUE),
    )
  }
  let localStorageDiscoursesArray = localStorage.getItem(
    Constants.LOCAL_STORAGE_DISCOURSES_ARRAY,
  )

  if (!localStorageDiscoursesArray) {
    console.log(
      'OnStartUp, discourse array is empty. Populating with default object : ',
      Constants.LOCAL_STORAGE_DISCOURSES_ARRAY_DEFAULT_VALUE,
    )
    localStorage.setItem(
      Constants.LOCAL_STORAGE_DISCOURSES_ARRAY,
      JSON.stringify(Constants.LOCAL_STORAGE_DISCOURSES_ARRAY_DEFAULT_VALUE),
    )
  } else {
    console.log(
      'OnStartUp, discourse array is available. Populated object : ',
      JSON.stringify(Constants.LOCAL_STORAGE_DISCOURSES_ARRAY_DEFAULT_VALUE),
    )
    console.log(
      'OnStartUp, discourse array is available. but resetting to ',
      JSON.stringify(Constants.LOCAL_STORAGE_DISCOURSES_ARRAY_DEFAULT_VALUE),
    )
    localStorage.setItem(
      Constants.LOCAL_STORAGE_DISCOURSES_ARRAY,
      JSON.stringify(Constants.LOCAL_STORAGE_DISCOURSES_ARRAY_DEFAULT_VALUE),
    )
  }
})()

export const addDiscourseToLocalStorageDiscourseArray = (discourseObj) => {
  let localStorageDiscoursesArrayJSONUnparsed = localStorage.getItem(
    Constants.LOCAL_STORAGE_DISCOURSES_ARRAY,
  )

  if (localStorageDiscoursesArrayJSONUnparsed !== undefined) {
    let localStorageDiscoursesArray = JSON.parse(
      localStorageDiscoursesArrayJSONUnparsed,
    )
    let exists = localStorageDiscoursesArray.find(
      (element) => element.discourseId === discourseObj.discourseId,
    )
    if (!exists) {
      localStorageDiscoursesArray.push(discourseObj)
      console.log(
        `added discourse :${discourseObj.discourseId} to localStorage. Total object : ${localStorageDiscoursesArray.length} `,
      )
      localStorage.setItem(
        Constants.LOCAL_STORAGE_DISCOURSES_ARRAY,
        JSON.stringify(localStorageDiscoursesArray),
      )
    } else {
      console.log(
        `Discourse : ${discourseObj.discourseId} already available in the array. So not adding`,
      )
    }
  } else {
    console.log(
      "Object not available, this shouldn't be the case. We are creating onStartUp. Debug this",
    )
  }
}

export const populateUserObject = (userObject) => {
  let loginUserJson = JSON.parse(localStorage.getItem(Constants.LOGIN_USER))
  console.log(userObject)
  console.log('loginUserJson : ', loginUserJson)
  if (loginUserJson != null) {
    localStorage.setItem(Constants.LOGIN_USER, JSON.stringify(userObject))
  } else {
    console.log('No user id available')
  }
}

export const getUserObjectFromLocalStorage = () => {
  let loginUser = JSON.parse(localStorage.getItem(Constants.LOGIN_USER))
  console.log('loginUser : ', loginUser)
  if (loginUser != null) {
    return loginUser
  } else {
    console.log('No user id available')
  }
}

export const getUserNameFromLocalStorage = () => {
  let loginUser = JSON.parse(localStorage.getItem(Constants.LOGIN_USER))
  console.log('loginUser  : ', loginUser)
  if (loginUser != null) {
    return loginUser.userName
  } else {
    console.log('No user id available')
  }
}

export const getUserIdFromLocalStorage = () => {
  let loginUser = JSON.parse(localStorage.getItem(Constants.LOGIN_USER))
  console.log('loginUser  : ', loginUser)
  if (loginUser != null) {
    return loginUser.userId
  } else {
    console.log('No user id available')
  }
}

export const getBookmarkArrayFromLocalStorage = (userObject) => {
  let loginUser = JSON.parse(localStorage.getItem(Constants.LOGIN_USER))

  console.log('loginUser  : ', loginUser)
  if (loginUser != null) {
    return loginUser.bookmarkArray
  } else {
    console.log('No user id available')
  }
}

export const removeUserObjectFromLocalStorage = () => {
  let loginUserJson = JSON.parse(localStorage.getItem(Constants.LOGIN_USER))
  console.log('loginUserJson : ', loginUserJson)
  if (loginUserJson != null) {
    localStorage.removeItem(Constants.LOGIN_USER)
  } else {
    console.log('No user id available which should not be case. Please check')
  }
}

export default getBookmarkArrayFromLocalStorage
