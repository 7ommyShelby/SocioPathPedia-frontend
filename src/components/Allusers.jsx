import React, { useEffect } from 'react'
import Friends from './Friends'
import { setallusers } from '../redux/slice'
import { useDispatch, useSelector } from 'react-redux'
import { Stack, Typography } from '@mui/material';
import Wrapper from './Wrapper';
import { useTheme } from '@emotion/react';



const Allusers = () => {

    const dispatch = useDispatch()
    const allusers = useSelector((state) => state.allusers)
    const token = useSelector((state) => state.token)
    const id = useSelector((state) => state.user._id)
    const { palette } = useTheme()

    const getallusers = async () => {

        // const link = 'https://sociopathpedia-backend.onrender.com'

        const res = await fetch(`https://sociopathpedia-backend.onrender.com/api/user/getall`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        })

        const data = await res.json()
        console.log(data.allusers);
        dispatch(setallusers({ allusers: data.allusers }))

    }

    console.log(allusers);

    useEffect(() => {
        getallusers()
    }, [])

    return (
        <>
            <Wrapper >
                <Typography color={palette.neutral.dark} variant='h5' fontWeight='500' mb='1.5rem'>
                    All Users
                </Typography>
                
                <Stack gap='1rem'>
                    {
                        allusers?.map((e) => {
                            return (
                                <>
                                    <Friends friendId={e._id} name={`${e.firstName} ${e.lastName}`} subtitle={e.occupation} userPicturePath={e.picturePath} />
                                </>
                            )

                        })
                    }
                </Stack>
            </Wrapper>
        </>
    )
}

export default Allusers
