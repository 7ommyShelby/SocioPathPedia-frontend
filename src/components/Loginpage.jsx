import React from 'react'
import { Box, Typography, useTheme, useMediaQuery } from '@mui/material'
import Form from './Form';


const Loginpage = () => {

  const theme = useTheme();
  const isMobile = useMediaQuery('(min-width : 1024px)');

  return (
    <>
      <Box >
        <Box width='100%' padding='1rem 6%' backgroundColor={theme.palette.background.alt} textAlign='center' >
          <Typography fontWeight="bold" fontSize='32px' color='primary' >Ascent</Typography>
        </Box>

        <Box width={isMobile ? '50%' : '92%'}
          padding='2rem'
          margin='2rem auto'
          borderRadius='1.5rem'
          backgroundColor={theme.palette.background.alt}
        >

          <Typography variant='h5' fontWeight='500' sx={{ marginBottom: '1.5rem' }}>
            Welcome to Ascent, the Socializing platform for Sociopaths
          </Typography>
          <Form />
        </Box>
      </Box>
    </>
  )
}

export default Loginpage
