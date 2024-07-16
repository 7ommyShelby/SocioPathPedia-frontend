import React from 'react'
import Friends from './Friends'
import { setallusers } from '../redux/slice'
import { useDispatch, useSelector } from 'react-redux'



const Allusers = () => {

    const dispatch = useDispatch()
    const allusers = useSelector((state) => state.allusers)
    const getalusers = async () => {

        const res = await fetch(`https://sociopathpedia-backend.onrender.com/api/user/getall`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        })

        const data = await res.json()
        dispatch(setallusers({ allusers: data }))

    }


    return (
        <>{
            allusers.map((e) => {
                <Friends friendId={e._id} name={`${e.firstName} ${e.lastName}`} subtitle={e.occupation} userPicturePath={e.picturePath} />
            })
        }
        </>
    )
}

export default Allusers
