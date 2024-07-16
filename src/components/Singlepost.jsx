import React, { useState } from 'react'
import { ChatBubbleOutlineOutlined, FavoriteBorderOutlined, FavoriteOutlined, ShareOutlined } from '@mui/icons-material'
import { Box, Divider, IconButton, Typography, useTheme } from '@mui/material'
import StyledComp from './StyledComp';
import { setPost } from '../redux/slice';
import Friends from './Friends';
import Wrapper from './Wrapper';
import { useDispatch, useSelector } from 'react-redux';
import { setPosts } from '../redux/slice';

const Singlepost = ({ postId,
  postUserId,
  name,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  comments, }) => {

  const [isComments, setisComments] = useState(false)
  const dispatch = useDispatch()
  const token = useSelector((state) => state.token)
  const loggeduserid = useSelector((state) => state.user._id)

  // const [isliked, setIsLiked] = useState(Boolean(likes[loggeduserid]))

  const statelikes = useSelector((state) => state.posts.filter((e) => e._id === postId))

  console.log(statelikes[0].likes);

  const [likecount, setlikescount] = useState(Object.keys(statelikes[0].likes).length)

  console.log(statelikes[0].likes[loggeduserid] === true);

  // const isliked = Boolean(likes[loggeduserid])
  const isliked = false

  // const likecount = Object.keys(likes).length

  const { palette } = useTheme()
  const primary = palette.primary.main
  const main = palette.neutral.main

  // console.log(loggeduserid);

  const patchlikes = async () => {

    const response = await fetch(`https://sociopathpedia-backend.onrender.com/api/like/${postId}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
        body: JSON.stringify({ userid: loggeduserid })
      }
    )
    const data = await response.json()
    dispatch(setPost({ post: data }))

    setIsLiked(!isliked)

    if (!statelikes[0].likes[loggeduserid] === true) {
      setlikescount((prev) => {
        return prev + 1
      })
    } else {
      setlikescount((prev) => {
        return prev - 1
      })
    }
  }

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

  return (
    <>
      <Wrapper m='2rem 0' >
        <Friends friendId={postUserId} name={name} subtitle={location} userPicturePath={userPicturePath} />

        <Typography color={main} mt='1rem'>
          {description}
        </Typography>
        {picturePath && (
          <img width='100%' height='auto' src={`https://sociopathpedia-backend.onrender.com/${picturePath}`} alt="post" style={{ borderRadius: '0.75rem', marginTop: '0.75rem' }} />
        )}

        <StyledComp mt='0.25rem'>
          <StyledComp gap='1rem'>
            <StyledComp gap='.3rem'>
              <IconButton onClick={async () => {
                await patchlikes()
                await getposts()
              }}>
                {isliked ? (<FavoriteOutlined color={primary} />) : (<FavoriteBorderOutlined />)}
              </IconButton>
              <Typography>{likecount}</Typography>
            </StyledComp>

            <StyledComp gap='.3rem'>
              <IconButton onClick={() => setisComments(!isComments)}>
                <ChatBubbleOutlineOutlined />
              </IconButton>
              <Typography>{comments?.length}</Typography>
            </StyledComp>
          </StyledComp>

          <IconButton>
            <ShareOutlined />
          </IconButton>
        </StyledComp>

        {
          isComments && (<>
            <Box mt='0.5rem'>
              {comments.map((e, idx) => {
                return (
                  <>
                    <Box key={`${name}${idx}`}  >
                      <Divider />
                      <Typography sx={{
                        color: main,
                        m: '0.5rem 0',
                        pl: '1rem'
                      }}>
                        {e}
                      </Typography>
                      <Divider />
                    </Box>
                  </>
                )
              })}
            </Box>
          </>)
        }

      </Wrapper>
    </>
  )
}

export default Singlepost
