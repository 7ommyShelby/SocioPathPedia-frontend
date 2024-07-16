import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setPosts } from '../redux/slice'
import Singlepost from './Singlepost'
import { Box } from '@mui/material'


const Postcollection = ({ userid, isProfile = false }) => {

    const dispatch = useDispatch()
    const posts = useSelector((state) => state.posts)
    const token = useSelector((state) => state.token)

    const getposts = async () => {
        const postresponse = await fetch('https://sociopathpedia-backend.onrender.com/api/posts', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: token
            },
        })
        const res = await postresponse.json()
        console.log(res);
        dispatch(setPosts({ posts: res }))
    }

    const getuserposts = async () => {
        const postresponse = await fetch(`https://sociopathpedia-backend.onrender.com/api/${userid}/post`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: token
            },
        })
        const res = await postresponse.json()
        // console.log(res);
        dispatch(setPosts({ posts: res }))
    }

    console.log(posts);

    useEffect(() => {
        if (isProfile) {
            getuserposts()
        } else {
            getposts()
        }
    }, [])



    return (
        <>
            {posts.map((e) => {
                return (
                    
                    <Singlepost key={e._id}
                        postId={e._id}
                        postUserId={e.userid}
                        name={`${e.firstName} ${e.lastName}`}
                        description={e.description}
                        location={e.location}
                        picturePath={e.picturePath}
                        userPicturePath={e.userPicturePath}
                        likes={e.likes}
                        comments={e.comments} />
                   
                )
            })}
        </>
    )
}

export default Postcollection
