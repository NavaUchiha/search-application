import React, { useState, useEffect, useRef } from 'react'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import SearchBar from './SearchBar'
import { DiscourseAsList, DiscourseAsTiles } from './DiscourseList'
import { fetchDiscourse, fetchDiscourseWithSynonyms } from './QuickFetch.js'
import {
  Alert,
  Typography,
  Box,
  Stack,
  Container,
  Fab,
  Toolbar,
  Skeleton,
  Snackbar,
} from '@mui/material'
import { bookmarkDiscourse, getUserObject } from './../service/ServiceWrapper'
import HandleAlerts from './HandleAlerts'
import { green, teal, lightGreen } from '@mui/material/colors'
import Image from '../data/Dattatreya.JPG'
import UserAvatarChip from './UserAvatarChip'
import DisplayToggler from './DisplayToggler'
import ScrollToTop from './ScrollToTop'
import MyAppBar from './MyAppBar'

import '../css/SearchBar.css'
import NavBarWithUserInfo from './NavBarWithUserInfo'
import Masonry from '@mui/lab/Masonry'
const Constants = require('./../data/Constants')

const SearchLayout = () => {
  const [orientation, setOrientation] = useState('list')
  const [discourseArray, setDiscourseArray] = useState([])
  const [showAlert, setShowAlert] = useState(false)
  const [loadingFlag, setLoadingFlag] = useState(false)
  const [alertObject, setAlertObject] = useState({})
  const discourseDisplayRef = React.createRef(null)

  const snackbarHandleClose = (event, reason) => {
    console.log(reason)
    if (reason === 'clickaway') {
      return
    }
    setShowAlert(false)
  }
  // console.log(
  //   'Array(10) : ',
  //   Array(10).for((e) => console.log('hi')),
  // )
  const callBackForOrientation = (value) => {
    if (value) {
      setOrientation(value)
    }
  }
  const styles = {
    width: '40%',
    height: '100%',
    backgroundImage: `url(${Image})`,
    //backgroundImage: `url(https://source.unsplash.com/random)`,
    backgroundSize: 'cover',
    backgroundOrigin: 'content-box',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    pt: '2%',
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
          setLoadingFlag(true)
          const anchor = document.querySelector('#back-to-top-anchor')

          if (anchor) {
            anchor.scrollIntoView({
              behavior: 'smooth',
              block: 'center',
            })
          }
        } else {
          console.log('something went wrong or no data to show')
        }
      })
      .catch((e) => {
        if (e.message === Constants.ERROR_NO_RESULTS) {
          console.log('populate no results to show')
          setShowAlert(true)
          setLoadingFlag(false)

          // NoDataAlert = <HandleAlerts message="" flag={true} />;
          const alertObj = {}
          alertObj[Constants.MESSAGE] = Constants.SEARCH_NO_RESPONSE_ALERT
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
      <Box
        sx={{
          mx: '10%',
          my: '1%',
          height: '75vh',

          boxShadow: 15,
          boxSizing: 'border-box',
        }}
      >
        <Stack
          direction="row"
          sx={{
            height: '100%',
          }}
          spacing={10}
        >
          <Box item alignSelf="center" sx={styles}></Box>

          <Stack>
            <Stack sx={{ mt: 2.5 }}>
              <NavBarWithUserInfo />
            </Stack>
            <Stack
              sx={{ my: 10 }}
              justifySelf="center"
              alignSelf="center"
              direction="column"
            >
              <Box>
                <Stack spacing={1} alignItems="flex-start">
                  <Typography variant="h2" sx={{ ml: 0, color: green[700] }}>
                    Universal Spirituality
                  </Typography>
                  <Typography sx={{ pl: 0.5, color: teal[500] }} variant="h4">
                    Search Divine Knowledge
                  </Typography>
                </Stack>
              </Box>
            </Stack>
            <Stack
              sx={{ pr: 10 }}
              alignSelf="center"
              alignItems="center"
              spacing={1}
            >
              <Box>
                <Stack spacing={2} sx={{}} alignItems="center">
                  <Box>
                    <DisplayToggler
                      callBackForOrientation={callBackForOrientation}
                    />
                  </Box>
                </Stack>
              </Box>
            </Stack>
          </Stack>
        </Stack>

        <Snackbar
          open={showAlert}
          autoHideDuration={2000}
          onClose={snackbarHandleClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert
            onClose={snackbarHandleClose}
            severity={alertObject.severity}
            sx={{ width: '100%' }}
          >
            {alertObject.message}
          </Alert>
        </Snackbar>
      </Box>

      <Box>
        <Box className="job-search">
          <SearchBar
            callBackForOrientation={callBackForOrientation}
            callBackForDocumentsFetch={callBackForDocumentsFetch}
            callBackForDocumentsFetchWithSynonyms={
              callBackForDocumentsFetchWithSynonyms
            }
          />
        </Box>
        <Toolbar id="back-to-top-anchor" />
        <Box alignItems="center" sx={{ mt: '5%' }}>
          {orientation === 'list' ? (
            <React.Fragment>
              {discourseArray.length > 0 ? (
                <DiscourseAsList discourseArray={discourseArray} />
              ) : loadingFlag ? (
                <Stack justifyContent="center" alignItems="center" spacing={10}>
                  {Array(10)
                    .fill(1)
                    .map((e) => (
                      <Skeleton
                        variant="rectangular"
                        width={'60%'}
                        height={200}
                      />
                    ))}
                </Stack>
              ) : (
                <p></p>
              )}
            </React.Fragment>
          ) : (
            <React.Fragment>
              {discourseArray.length > 0 ? (
                <DiscourseAsTiles discourseArray={discourseArray} />
              ) : loadingFlag ? (
                // <Stack justifyContent="center" alignItems="center" spacing={10}>
                //   {Array(10)
                //     .fill(1)
                //     .map((e) => (
                //       <Skeleton
                //         variant="rectangular"
                //         width={'60%'}
                //         height={200}
                //       />
                //     ))}
                // </Stack>
                <Container sx={{ mlr: 1 }}>
                  <Masonry
                    columns={{ xs: 1, sm: 2, md: 3, lg: 3, xl: 3 }}
                    spacing={3}
                  >
                    {Array(30)
                      .fill(1)
                      .map((e) => (
                        <Skeleton
                          variant="rectangular"
                          width={'30%'}
                          height={400}
                        />
                      ))}
                  </Masonry>
                </Container>
              ) : (
                <p></p>
              )}
            </React.Fragment>
          )}
          <ScrollToTop>
            <Fab color="primary" size="small" aria-label="scroll back to top">
              <KeyboardArrowUpIcon />
            </Fab>
          </ScrollToTop>
        </Box>
      </Box>
    </React.Fragment>
  )
}

export default SearchLayout
