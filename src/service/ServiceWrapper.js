const { userObjectGlobal } = require('../data/AdvancedFilterGlobalObject')
const { populateUserObject } = require('../service/LocalStorage')
const { useUserContext, useUserUpdateContext } = require('../data/UserContext')
const Constants = require('./../data/Constants')

const registerUserIdService = async function (userName) {
  const parameters = {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({
      userName: userName,
    }),
  }

  const response = await fetch('http://localhost:8080/registerUser', parameters)
    .then((response) => response.json())
    .catch((error) =>
      console.log('Error occurred while fetching from ES!!! ' + error),
    )

  console.log(`from register User : `, response)

  if (response.result === Constants.SUCCESS) {
    console.log(`userId returned : ${response}`)
    localStorage.setItem(Constants.LOGIN_USER, JSON.stringify(response.result))
  }
  return response.response
}

const bookmarkDiscourse = function (userId, discourseId) {
  const parameters = {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({
      userId: userId,
      discourseId: discourseId,
    }),
  }

  const response = fetch('http://localhost:8080/addDiscourse', parameters)
    .then((response) => response.json())
    .then((response) => {
      if (response.response === Constants.SUCCESS) {
        console.log(`response from service wrapper : `, response)
        populateUserObject(response.result)
      }
      return response
    })
    .catch((error) =>
      console.log('Error occurred while fetching from ES!!! ' + error),
    )
  return response
}

// const getUserObject = async function (userId) {
//   const parameters = {
//     method: "POST",
//     mode: "cors",
//     headers: {
//       "Content-type": "application/json; charset=UTF-8",
//     },
//     body: JSON.stringify({
//       userId: userId,
//     }),
//   };

//   const responseJson = await fetch(
//     "http://localhost:8080/getUserObject",
//     parameters
//   )
//     .then((response) => response.json())
//     .then((response) => {
//       if (response.response === Constants.SUCCESS) {
//         console.log(`response from service wrapper : `, response);
//         populateUserObject(response.result);
//         return response;
//       } else {
//         return response;
//       }
//     })
//     .catch((error) =>
//       console.log("Error occurred while fetching from ES!!! " + error)
//     );

//   userObjectGlobal["userObject"] = responseJson;
//   console.log("userObjectGlobal ", userObjectGlobal.userObject);
//   return responseJson;
// };

const removeDiscourse = function (userId, discourseId) {
  const parameters = {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({
      userId: userId,
      discourseId: discourseId,
    }),
  }

  const response = fetch('http://localhost:8080/removeDiscourse', parameters)
    .then((response) => response.json())
    .then((response) => {
      if (response.response === Constants.SUCCESS) {
        console.log(`response from service wrapper : `, response)
        populateUserObject(response.result)
      }
      return response
    })
    .catch((error) =>
      console.log('Error occurred while fetching from ES!!! ' + error),
    )
  return response
}
const getBookmarkDiscourses = function (bookmarkArray) {
  const parameters = {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({
      bookmarkArray: bookmarkArray,
    }),
  }

  const response = fetch(
    'http://localhost:8080/getBookmarkDiscourses',
    parameters,
  )
    .then((response) => response.json())
    .then((response) => {
      console.log(response)
      if (response.result !== 'success') {
        console.log('Error occurred : ' + response.message)
        throw response.message
      }
      return response.bookMarkedDiscourses
    })
    .catch((error) => {
      console.log('Error occurred while fetching from ES!!! ' + error)
      throw error
    })
  return response
}

const getLoginId = async function (userName) {
  const parameters = {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({
      userName: userName,
    }),
  }

  const responseJson = await fetch(
    'http://localhost:8080/getLoginId',
    parameters,
  )
    .then((response) => response.json())
    .catch((error) => {
      console.log('Error occurred while fetching from ES!!! ' + error)
      throw Error(error.message)
    })

  if (responseJson.response === Constants.SUCCESS) {
    populateUserObject(responseJson.result)
  }
  return responseJson
}

const addDiscourseToTag = (userId, tagName, discourseId) => {
  const parameters = {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({
      userId: userId,
      tagName: tagName,
      discourseId: discourseId,
    }),
  }

  const response = fetch('http://localhost:8080/addDiscourseToTag', parameters)
    .then((response) => response.json())
    .then((response) => {
      if (response.response === Constants.SUCCESS) {
        console.log(`response from service wrapper : `, response)
        populateUserObject(response.result)
      }
      return response
    })
    .catch((error) =>
      console.log('Error occurred while fetching from ES!!! ' + error),
    )
  return response
}

const removeDiscourseFromTag = (userId, tagName, discourseId) => {
  const parameters = {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({
      userId: userId,
      tagName: tagName,
      discourseId: discourseId,
    }),
  }

  const response = fetch(
    'http://localhost:8080/removeDiscourseFromTag',
    parameters,
  )
    .then((response) => response.json())
    .then((response) => {
      if (response.response === Constants.SUCCESS) {
        console.log(`response from service wrapper : `, response)
        populateUserObject(response.result)
      }
      return response
    })
    .catch((error) =>
      console.log('Error occurred while fetching from ES!!! ' + error),
    )
  return response
}
const addTag = (userId, tagName) => {
  const parameters = {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({
      userId: userId,
      tagName: tagName,
    }),
  }

  const response = fetch('http://localhost:8080/addTag', parameters)
    .then((response) => response.json())
    .then((response) => {
      if (response.response === Constants.SUCCESS) {
        console.log(`response from service wrapper : `, response)
        populateUserObject(response.result)
      }
      return response
    })
    .catch((error) =>
      console.log('Error occurred while fetching from ES!!! ' + error),
    )
  return response
}

const removeTag = (userId, tagName) => {
  const parameters = {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({
      userId: userId,
      tagName: tagName,
    }),
  }

  const response = fetch('http://localhost:8080/removeTag', parameters)
    .then((response) => response.json())
    .then((response) => {
      if (response.response === Constants.SUCCESS) {
        console.log(`response from service wrapper : `, response)
        populateUserObject(response.result)
      }
      return response
    })
    .catch((error) =>
      console.log('Error occurred while fetching from ES!!! ' + error),
    )
  return response
}

module.exports = {
  registerUserIdService,
  bookmarkDiscourse,
  unMarkDiscourse: removeDiscourse,
  getBookmarkDiscourses,
  getLoginId,
  addTag,
  removeTag,
  addDiscourseToTag,
  removeDiscourseFromTag,
}
