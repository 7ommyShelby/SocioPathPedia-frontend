import { Box, Typography, useMediaQuery } from '@mui/material'
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
  const posts = useSelector((state) => state.posts.filter((e) => e.userid === id))

  const getuser = async () => {

    const response = await fetch(`https://sociopathpedia-backend.onrender.com/api/user/get/${id}`, {
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

  console.log(posts);

  if (!user) return null

  return (
    <> <Box>
      <Navbar />
      <Box width='100%' p='2rem 6%'
        display={isNonMobile ? 'flex' : 'block'}
        gap='1rem'
        justifyContent='center'
      >
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }} flexBasis={isNonMobile ? '26%' : undefined} >
          <UserProfile userid={id} picturePath={user.picturePath} />

          {isNonMobile && (
            <>
              <Box flexBasis='26%'>
                <Friendlist userid={id} />
              </Box>
            </>
          )}

        </Box>

            <Box display={ `${posts.length === 0 ? 'none' : 'block'}`} flexBasis={isNonMobile ? '44%' : undefined} mt={isNonMobile ? undefined : '2rem'} >
              <Postcollection userid={id} isProfile />
            </Box>
        
      </Box>
    </Box>
    </>
  )
}

export default Profilepage
