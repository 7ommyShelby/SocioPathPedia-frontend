import React from 'react'
import Navbar from './Navbar'
import UserProfile from './UserProfile';
import { Box, useMediaQuery } from '@mui/material';
import { useSelector } from 'react-redux';
import Createpost from './Createpost';
import Postcollection from './Postcollection';
import Friendlist from './Friendlist';
import Allusers from './Allusers';


const Homepage = () => {

  const isNonMobile = useMediaQuery('(min-width : 1024px)')
  const { _id, picturePath } = useSelector((state) => state.user)

  return (
    <>
      <Box>
        <Navbar />
        <Box width='100%' p='2rem 6%'
          display={isNonMobile ? 'flex' : 'block'}
          gap='.7rem'
          justifyContent='space-between'
        >
          <Box flexBasis={isNonMobile ? '26%' : undefined}>
            <UserProfile userid={_id} picturePath={picturePath} />
          </Box>
          <Box flexBasis={isNonMobile ? '44%' : undefined} mt={isNonMobile ? undefined : '2rem'} >
            <Createpost picturePath={picturePath} />
            <Postcollection userid={_id} />
          </Box>

          {isNonMobile && (
            <>
              <Box flexBasis='26%'>
                <Friendlist userid={_id} />
              </Box>
            </>
          )}

          <Allusers />

        </Box>
      </Box>
    </>

  )
}

export default Homepage
