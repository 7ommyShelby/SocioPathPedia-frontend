import React, { useState } from 'react'
import { ChatBubbleOutlineOutlined, DeleteOutlined, FavoriteBorderOutlined, FavoriteOutlined, ShareOutlined } from '@mui/icons-material'
import { Box, Button, Divider, IconButton, InputBase, Typography, useTheme } from '@mui/material'
import StyledComp from './StyledComp';
import { setPost } from '../redux/slice';
import Friends from './Friends';
import Wrapper from './Wrapper';
import { useDispatch, useSelector } from 'react-redux';
import { setPosts } from '../redux/slice';
import Userimage from './Userimage';
import { useLocation } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const Singlepost = ({ postId,
  postUserId,
  name,
  description,
  location,
  picturePath,
  userPicturePath,
  comments,
  getposts,
  getuserposts }) => {

  const pagelocation = useLocation()
  const [isComments, setisComments] = useState(false)
  const dispatch = useDispatch()
  const token = useSelector((state) => state.token)
  const loggeduserid = useSelector((state) => state.user._id)
  const [comment, setcomment] = useState(null)

  const statelikes = useSelector((state) =>
    state.posts.find((e) => e._id === postId)
  );

  const [isliked, setIsLiked] = useState(Boolean(statelikes.likes[loggeduserid]))
  const [likecount, setlikescount] = useState(Object.keys(statelikes.likes).length)

  // console.log(statelikes, "initial");

  const { palette } = useTheme()
  const primary = palette.primary.main
  const main = palette.neutral.main


  const patchlikes = async () => {

    const updatedLikes = { ...statelikes.likes };
    if (isliked) {
      delete updatedLikes[loggeduserid];
    } else {
      updatedLikes[loggeduserid] = true;
    }
    // console.log(updatedLikes, "updated");

    setIsLiked(!isliked);
    setlikescount(Object.keys(updatedLikes).length);

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
    console.log(data);
    dispatch(setPost({ post: data }))

  }

  // const [counter, setcounter] = useState()

  const postcomments = async () => {

    const response = await toast.promise(
      fetch(`https://sociopathpedia-backend.onrender.com/api/post/comment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
        body: JSON.stringify({ postId, comment })
      }), {
      pending: 'Posting comment...',
      success: 'Comment posted successfully',
    }

    )

    const data = await response.json()
    console.log(data);

    dispatch(setPost({ post: data.post }))
    setcomment("")

    if (pagelocation?.pathname === '/home') {
      getposts()
    } else {
      getuserposts()
    }

  }

  const deletepost = async () => {
    try {

      const response = await toast.promise(
        fetch(`https://sociopathpedia-backend.onrender.com/api/post/delete/${postId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': token
          },
        }), {
        pending: 'Deleting post...',
        success: 'Post deleted successfully',
      }
      )
      const updatedpost = await response.json()

      console.log(updatedpost);

      if (pagelocation?.pathname === '/home') {
        getposts()
      } else {
        getuserposts()
      }


    } catch (error) {
      console.log(error);
    }
  }


  return (
    <>
      <Wrapper m='2rem 0' >
        <Friends friendId={postUserId} name={name} subtitle={location} userPicturePath={userPicturePath} />

        <Typography color={main} mt='1rem'>
          {description}
        </Typography>
        {picturePath && (
          <img width='100%' height='auto' src={picturePath} alt="post" style={{ borderRadius: '0.75rem', marginTop: '0.75rem' }} />
        )}

        <StyledComp mt='0.25rem'>
          <StyledComp gap='1rem'>
            <StyledComp gap='.3rem'>
              <IconButton onClick={patchlikes}>
                {isliked ? (<FavoriteOutlined sx={{ color: "#FF0000" }} />) : (<FavoriteBorderOutlined />)}
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

          <StyledComp>{
            statelikes.userid === loggeduserid &&
            <IconButton>
              <DeleteOutlined sx={{
                "&:hover": {
                  color: "#C0392B"
                }
              }} onClick={deletepost} />
            </IconButton>
          }
            <IconButton>
              <ShareOutlined />
            </IconButton>
          </StyledComp>
        </StyledComp>

        {
          isComments && (<>

            <Box>

              <Box sx={{
                display: 'flex'
              }}>
                <InputBase value={comment} onChange={(e) => { setcomment(e.target.value) }} sx={{
                  width: "100%",
                  backgroundColor: palette.neutral.light,
                  borderRadius: '2rem',
                  padding: '5px 1rem'
                }} placeholder='Add a comment...' />
                <Button onClick={postcomments}>send</Button>
              </Box>

            </Box>

            <Box mt='0.5rem' p='5px 0'>
              {statelikes.comments.map((e, idx) => {
                return (
                  <>
                    <Box sx={{ p: '5px' }} key={`${name}${idx}`}  >
                      <Box sx={{
                        display: 'flex',
                        gap: "10px",
                        alignItems: 'center'
                      }}>
                        <Box>
                          <Userimage size='30px' image={e.user.profile} />
                        </Box>
                        <Typography>{e.user.name}</Typography>
                      </Box>
                      <Typography sx={{
                        color: main,
                        m: '0.5rem 0',
                      }}>
                        {e.text}
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
