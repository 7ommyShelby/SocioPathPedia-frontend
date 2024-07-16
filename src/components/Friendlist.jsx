import { useEffect } from 'react'
import Friends from './Friends'
import Wrapper from './Wrapper'
import { setFriends } from '../redux/slice'
import { Box, Stack, Typography, useTheme } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'

const Friendlist = ({ userid }) => {

    const { palette } = useTheme()
    const dispatch = useDispatch()
    // const { _id } = useSelector((state) => state.user._id)
    const token = useSelector((state) => state.token)
    const friends = useSelector((state) => state.user.friends)


    const getFriends = async () => {

        const res = await fetch(`https://sociopathpedia-backend.onrender.com/api/user/${userid}/friends`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        })
        const data = await res.json()
        console.log(data);
        dispatch(setFriends({ friends: data }))
    }

    useEffect(() => {
        getFriends()
    }, [])

    console.log(friends);

    return (
        <>
            <Wrapper>
                <Typography color={palette.neutral.dark} variant='h5' fontWeight='500' mb='1.5rem'>
                    Friend list
                </Typography>

                <Stack gap='1rem'>
                    {friends.length > 0  && (
                        friends?.map((e) => {
                            return (
                                <>
                                    <Friends
                                        key={e._id}
                                        friendId={e._id}
                                        name={`${e.firstName} ${e.lastName}`}
                                        subtitle={e.occupation}
                                        userPicturePath={e.picturePath} />
                                </>
                            )
                        })
                    )
                    }
                </Stack>

            </Wrapper>
        </>
    )
}

export default Friendlist
