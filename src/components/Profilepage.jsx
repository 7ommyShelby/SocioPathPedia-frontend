import { Box, useMediaQuery } from '@mui/material'
import Friendlist from './Friendlist'
import Navbar from './Navbar'
import Singlepost from './Singlepost'
import Postcollection from './Postcollection'
import UserProfile from './UserProfile'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Createpost from './Createpost'



const Profilepage = () => {

  const [user, setuser] = useState(null)
  const { id } = useParams()
  const token = useSelector((state) => state.token)
  const isNonMobile = useMediaQuery("(min-width : 1024px)")

  const getuser = async () => {

    const response = await fetch(`http://localhost:10000/api/user/${id}`, {
      method: "GET",
      headers: {
        "Authorization": token
      }
    })
    const data = await response.json()
    setuser(data)

  }

  useEffect(() => {
    getuser()
  }, [])

  if (!user) return null

  return (
    <> <Box>
      <Navbar />
      <Box width='100%' p='2rem 6%'
          display={isNonMobile ? 'flex' : 'block'}
          gap='.7rem'
          justifyContent='space-between'
        >
          <Box flexBasis={isNonMobile ? '26%' : undefined}>
            <UserProfile userid={id} picturePath={user.picturePath} />
          </Box>
          <Box flexBasis={isNonMobile ? '44%' : undefined} mt={isNonMobile ? undefined : '2rem'} >
            <Createpost picturePath={user.picturePath} />
            <Postcollection userid={id} />
          </Box>

          {isNonMobile && (
            <>
              <Box flexBasis='26%'>
                <Friendlist userid={id} />
              </Box>
            </>
          )}

        </Box>
    </Box>
    </>
  )
}

export default Profilepage
