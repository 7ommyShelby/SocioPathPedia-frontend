import { useState } from 'react'
import { Box, IconButton, InputBase, Typography, Select, MenuItem, FormControl, useTheme, useMediaQuery } from '@mui/material'
import { Search, Message, DarkMode, LightMode, Notifications, Help, Menu, Close } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { setMode, setLogout } from '../redux/slice'
import { useNavigate } from 'react-router-dom'
import StyledComp from './StyledComp'


const Navbar = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector((state) => state.user)
    const isNonMobileScreen = useMediaQuery("(min-width : 1024px)")
    const theme = useTheme()
    const neutralLight = theme.palette.neutral.light
    const dark = theme.palette.neutral.dark
    const background = theme.palette.background.default
    const primaryLight = theme.palette.primary.light;
    const alt = theme.palette.background.alt;

    const fullname = `${user.firstName} ${user.lastName}`
    // const fullname = "Robert J Oppenheimer"

    const [isMobile, setMobile] = useState(false)


    return (
        <>
            <StyledComp padding='1rem 6%' backgroundColor={alt}>
                <StyledComp gap='1.75rem'>
                    <Typography fontWeight={'bold'} fontSize={'clamp(1rem, 2rem , 2.25rem)'} color={'#808B96'} onClick={() => navigate('/home')} sx={{ "&:hover": { color: '#2874A6', cursor: 'pointer' } }}>
                        Ascent
                    </Typography>
                    {isNonMobileScreen && (
                        <StyledComp backgroundColor={neutralLight} borderRadius={'9px'} gap={'3rem'} padding={'.1rem 1.5rem'}>
                            <InputBase placeholder='Search...' />
                            <IconButton><Search /></IconButton>
                        </StyledComp>
                    )}
                </StyledComp>

                {
                    isNonMobileScreen ? (
                        <>
                            <StyledComp gap={'1rem'} >
                                <IconButton onClick={() => dispatch(setMode())}>
                                    {theme.palette.mode === 'dark' ? <DarkMode sx={{ fontSize: '25px' }} /> : <LightMode sx={{ fontSize: '25px', color: 'dark' }} />}
                                </IconButton>
                                <Message sx={{ fontSize: '25px' }} />
                                <Notifications sx={{ fontSize: '25px' }} />
                                <Help sx={{ fontSize: '25px' }} />
                                <FormControl variant='standard' >
                                    <Select value={fullname} sx={{  fontSize: '.7rem', backgroundColor: neutralLight, width: 'fit-content', maxWidth:'100%', padding: '5px 1rem', borderRadius : '10px' }} >
                                        <MenuItem value={fullname}>
                                            <Typography>{fullname}</Typography>
                                        </MenuItem>
                                        <MenuItem onClick={() => dispatch(setLogout())} >Logout</MenuItem>
                                    </Select>
                                </FormControl>
                            </StyledComp>
                        </>
                    ) : (<>
                        <IconButton onClick={() => setMobile(!isMobile)}>
                            <Menu />
                        </IconButton>
                    </>)
                }


                {
                    isMobile && !isNonMobileScreen && (
                        <>
                            <Box position={'fixed'} right='0' bottom='0' height='100%' zIndex='10' maxWidth='500px' minWidth='300px' backgroundColor={background}>
                                <Box display='flex' justifyContent='flex-end' padding='1rem'>
                                    <IconButton onClick={() => setMobile(!isMobile)}>
                                        <Close />
                                    </IconButton>
                                </Box>

                                <StyledComp display='flex' flexDirection='column' justifyContent='center' alignItems='center' gap={'3rem'} >
                                    <IconButton onClick={() => dispatch(setMode())}>
                                        {theme.palette.mode === 'dark' ? <DarkMode sx={{ fontSize: '25px' }} /> : <LightMode sx={{ fontSize: '25px', color: 'dark' }} />}
                                    </IconButton>
                                    <Message sx={{ fontSize: '25px' }} />
                                    <Notifications sx={{ fontSize: '25px' }} />
                                    <Help sx={{ fontSize: '25px' }} />
                                    <FormControl variant='standard' >
                                        <Select value={fullname} sx={{ fontSize: '.7rem', backgroundColor: neutralLight, width: 'fit-content', maxWidth:'100%', padding: '5px 1rem', borderRadius : '10px'}} >
                                            <MenuItem value={fullname}>
                                                <Typography>{fullname}</Typography>
                                            </MenuItem>
                                            <MenuItem onClick={() => dispatch(setLogout())} >Logout</MenuItem>
                                        </Select>
                                    </FormControl>
                                </StyledComp>
                            </Box>
                        </>
                    )
                }



            </StyledComp>
        </>
    )
}

export default Navbar
