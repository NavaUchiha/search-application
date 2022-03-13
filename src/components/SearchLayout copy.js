import React, { useState, useEffect } from 'react'
import SearchBar from './SearchBar'
import { DiscourseAsList, DiscourseAsTiles } from './DiscourseList'
import { fetchDiscourse, fetchDiscourseWithSynonyms } from './QuickFetch.js'
import { Alert, Typography, Box, Stack, Container } from '@mui/material'
import { bookmarkDiscourse, getUserObject } from './../service/ServiceWrapper'
import HandleAlerts from './HandleAlerts'
import { green, teal, lightGreen } from '@mui/material/colors'
import Image from '../data/Dattatreya.JPG'
import UserAvatarChip from './UserAvatarChip'
import DisplayToggler from './DisplayToggler'
import MyAppBar from './MyAppBar'
import '../css/SearchBar.css'
const Constants = require('./../data/Constants')

const SearchLayout = () => {
  const [orientation, setOrientation] = useState('list')
  const [discourseArray, setDiscourseArray] = useState([])
  const [showAlert, setShowAlert] = useState(false)
  const [alertObject, setAlertObject] = useState({})
  const callBackForOrientation = (value) => {
    if (value) {
      setOrientation(value)
    }
  }
  const styles = {
    width: '30%',
    backgroundImage: `url(${Image})`,
    //backgroundImage: `url(https://source.unsplash.com/random)`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundOrigin: 'content-box',
    height: '100vh',
  }
  const callBackForDocumentsFetch = (searchValue) => {
    console.log('search layout exact shingles' + searchValue)

    fetchDiscourse(searchValue)
      .then((discourseArrayReceived) => {
        setDiscourseArray(discourseArrayReceived)
      })
      .catch((e) => {
        console.log('No records!!!')
      })
  }

  const callBackForDocumentsFetchWithSynonyms = (searchValue) => {
    console.log('search layout with synonyms : ' + searchValue)
    setShowAlert(false)
    setDiscourseArray([])
    fetchDiscourseWithSynonyms(searchValue)
      .then((discourseArrayReceived) => {
        console.log(discourseArrayReceived)
        if (discourseArrayReceived) {
          setDiscourseArray(discourseArrayReceived)
          window.scrollBy({
            top: window.innerHeight / 2,
            behavior: 'smooth',
          })
        } else {
          console.log('something went wrong or no data to show')
        }
      })
      .catch((e) => {
        if (e.message === Constants.ERROR_NO_RESULTS) {
          console.log('populate no results to show')
          setShowAlert(true)
          // NoDataAlert = <HandleAlerts message="" flag={true} />;
          const alertObj = {}
          alertObj[Constants.MESSAGE] =
            Math.random() > 0.5 ? Constants.SEARCH_NO_RESPONSE_ALERT : 'Dummy'
          alertObj[Constants.SEVERITY] = Constants.WARNING
          console.log('alertObj from search layout : ', alertObj)
          setAlertObject(alertObj)
        } else {
          console.log('something went wrong!!!  ' + e.message)
        }
      })
  }
  return (
    <React.Fragment>
      <Stack
        className="parentStack"
        sx={{ mx: 'auto', height: '100vh' }}
        direction="row"
      >
        <Container sx={styles}></Container>

        <Stack
          width="60%"
          sx={{ mx: 'auto', mt: '5%' }}
          justifyContent="space-evenly"
        >
          <Stack direction="row" justifyContent="flex-start">
            <Box sx={{ flexGrow: 1 }}>
              <Stack spacing={1} alignItems="flex-start">
                <Typography variant="h2" sx={{ ml: 0, color: green[700] }}>
                  Universal Spirituality
                </Typography>
                <Typography sx={{ pl: 0.5, color: teal[500] }} variant="h4">
                  Search Divine Knowledge
                </Typography>
              </Stack>
            </Box>

            <Box alignSelf="flex-start">
              <Stack spacing={2} sx={{ mt: 2, mr: 3 }} alignItems="center">
                <Box sx={{}}>
                  <UserAvatarChip />
                </Box>
                <Box>
                  <DisplayToggler
                    callBackForOrientation={callBackForOrientation}
                  />
                </Box>
              </Stack>
            </Box>
          </Stack>

          <Box sx={{ width: '100%' }}>
            <SearchBar
              callBackForOrientation={callBackForOrientation}
              callBackForDocumentsFetch={callBackForDocumentsFetch}
              callBackForDocumentsFetchWithSynonyms={
                callBackForDocumentsFetchWithSynonyms
              }
            />
          </Box>
        </Stack>
        {showAlert ? (
          <HandleAlerts alertObject={alertObject} flag={true} />
        ) : (
          <p></p>
        )}
      </Stack>

      <Box sx={{ height: '100vh' }}>
        {orientation === 'list' ? (
          <DiscourseAsList discourseArray={discourseArray} />
        ) : (
          <DiscourseAsTiles discourseArray={discourseArray} />
        )}
      </Box>
    </React.Fragment>
  )
}

export default SearchLayout
