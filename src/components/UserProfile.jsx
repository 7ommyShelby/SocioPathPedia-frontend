import { useEffect, useState } from 'react'
import { Box, Typography, useTheme, Divider, } from '@mui/material'
import Wrapper from './Wrapper'
import { ManageAccountsOutlined, EditOutlined, LocationOnOutlined, WorkOutlineOutlined, FacebookOutlined, Twitter } from '@mui/icons-material'
import Userimage from './Userimage'
import StyledComp from './StyledComp'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


const UserProfile = ({ userid, picturePath }) => {

    const [user, setuser] = useState(null)
    const { palette } = useTheme()
    const navigate = useNavigate()
    const token = useSelector((state) => state.token)
    const dark = palette.neutral.dark
    const medium = palette.neutral.medium
    const main = palette.neutral.main

    // console.log(token);

    const getUser = async () => {

        const response = await fetch(`https://sociopathpedia-backend.onrender.com/api/user/details/${userid}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${token}`,
                'Authorization': token
            }
        })
        const data = await response.json()
        console.log(data);
        setuser(data)
    }

    useEffect(() => {
        getUser()
    }, [])

    if (!user) {
        return null
    }

    const { firstName, lastName, location, occupation, impressions, viewedProfile, friends } = user

    return (
        <>
            <Wrapper>
                <StyledComp gap='0.5rem' paddingBottom='1.1rem' onClick={() => navigate(`/profile/${userid}`)}>
                    <StyledComp gap='1rem'>
                        <Userimage image={picturePath} />
                        <Box>
                            <Typography variant='h4' color='#1F618D' fontWeight='500' sx={{
                                '&:hover': {
                                    color: '#1B4F72',
                                    cursor: 'pointer'
                                }
                            }}>
                                {firstName} {lastName}
                            </Typography>

                            <Typography color='#ABB2B9'>
                                {`${friends?.length} friends`}
                            </Typography>
                        </Box>
                    </StyledComp>
                    <ManageAccountsOutlined />
                </StyledComp>
                <Divider />

                <Box p='1rem 0'>
                    <Box display='flex' alignItems='center' gap='1rem' mb='0.5rem'>
                        <LocationOnOutlined fontSize='large' color={main} />
                        <Typography color={medium}>{location}</Typography>
                    </Box>
                    <Box display='flex' alignItems='center' gap='1rem'>
                        <WorkOutlineOutlined fontSize='large' color={main} />
                        <Typography color={medium}>{occupation}</Typography>
                    </Box>
                </Box>
                <Divider />
                <Box p='1rem'>
                    <StyledComp mb='0.5rem'>
                        <Typography color={medium}>Who's viewed your profile</Typography>
                        <Typography color={main} fontWeight='500'>{viewedProfile}</Typography>
                    </StyledComp>
                    <StyledComp>
                        <Typography color={medium}>Impressions of your post</Typography>
                        <Typography color={main} fontWeight='500'>{impressions}</Typography>
                    </StyledComp>
                </Box>

                <Divider />
                <Box p='1rem 0'>
                    <Typography fontSize='1rem' color={main} fontWeight='500' mb='1rem'>
                        Social Profiles
                    </Typography>

                    <StyledComp gap='1rem' mb='0.5rem'>
                        <FacebookOutlined fontSize='large' color={main} />
                        <Typography color={medium} ml='1rem'>Facebook</Typography>
                    </StyledComp>

                    <StyledComp gap='1rem'>
                        <Twitter fontSize='large' color={main} />
                        <Typography color={medium} ml='1rem'>Twitter</Typography>
                    </StyledComp>
                </Box>
            </Wrapper>
        </>
    )
}

export default UserProfile
