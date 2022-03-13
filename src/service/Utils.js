const Constants = require('./../data/Constants')
const { getUserObjectFromLocalStorage } = require('../service/LocalStorage')

export const populateDiscourseObj = (discourse) => {
  console.log('discourse before formatting : ', discourse)
  const discourseObj = {}
  discourseObj[Constants.DISCOURSE_ID] = discourse.discourse_id
  discourseObj[Constants.TITLE] = discourse.title
  discourseObj[Constants.SUMMARY] = discourse.summary
  discourseObj[Constants.TEXT_DC] = discourse.textdc
  discourseObj[Constants.RECORD_DATE] = discourse.recorddate
  console.log('discourse after formatting : ', discourseObj)
  return discourseObj
}

export const listOfTagsContainingDiscourse = (discourseId) => {
  const userObject = getUserObjectFromLocalStorage()
  const tagArray = userObject.tagArray
  const tagsContainingDiscourseId = []
  tagArray.forEach((tag) => {
    console.log(`is ${tag} available : `, userObject.hasOwnProperty(tag))
    if (
      userObject.hasOwnProperty(tag) &&
      userObject[tag].includes(discourseId)
    ) {
      tagsContainingDiscourseId.push(tag)
    }
  })
  return tagsContainingDiscourseId
  console.log(` tagsContainingDiscourseId :  `, tagsContainingDiscourseId)
}
