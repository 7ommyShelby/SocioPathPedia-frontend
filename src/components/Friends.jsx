import React from 'react'
import { PersonAddOutlined, PersonRemoveOutlined } from '@mui/icons-material'
import { Box, IconButton, Typography, useTheme, } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import StyledComp from './StyledComp'
import { setFriends } from '../redux/slice'
import Userimage from './Userimage';
import { useNavigate } from 'react-router-dom'


const Friends = ({ friendId, name, subtitle, userPicturePath }) => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const friends = useSelector(state => state.user.friends)
    const { _id } = useSelector((state) => state.user)
    const token = useSelector((state) => state.token)

    const { palette } = useTheme()
    const primarylight = palette.primary.light
    const primarydark = palette.primary.dark
    const main = palette.neutral.main
    const medium = palette.neutral.medium

    console.log(friends);

    const isFriend = friends?.find((friend) => friend._id === friendId)
    // const isFriend = false
    // const isFriend = friends.includes(friendId)

    console.log(isFriend);

    const patchFriend = async () => {
        const response = await fetch(`https://sociopathpedia-backend.onrender.com/api/user/${_id}/${friendId}/updatefriends`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
        })

        const data = await response.json()
        dispatch(setFriends({ friends: data }))

    }

    return (
        <>
            <StyledComp>
                <StyledComp gap='1rem'>
                    <Userimage image={userPicturePath} size='55px' />
                    <Box onClick={() => { navigate(`/profile/${friendId}`); navigate(0) }}>
                        <Typography color={main} variant='h5' fontWeight='500' sx={{
                            "&:hover": {
                                color: primarylight,
                                cursor: 'pointer'
                            }
                        }}>
                            {name}
                        </Typography>
                        <Typography color={medium} variant='h6' fontWeight='0.75rem'>{subtitle}</Typography>
                    </Box>
                </StyledComp>

                {_id !== friendId &&

                    <IconButton onClick={patchFriend} sx={{
                        backgroundColor: primarylight,
                        p: '0.6rem'
                    }} >
                        {
                            isFriend ? <PersonRemoveOutlined sx={{ color: primarydark }} /> : <PersonAddOutlined sx={{ color: primarydark }} />
                        }
                    </IconButton>
                }

            </StyledComp>
        </>
    )
}

export default Friends
