import { useState } from 'react'
import { EditOutlined, DeleteOutlined, AttachFileOutlined, GifBoxOutlined, ImageOutlined, MicOutlined, MoreHorizOutlined } from '@mui/icons-material'
import { Box, Typography, Divider, InputBase, useTheme, IconButton, Button, useMediaQuery } from '@mui/material'
import Dropzone from 'react-dropzone'
import StyledComp from './StyledComp'
import Userimage from './Userimage'
import Wrapper from './Wrapper'
import { useDispatch, useSelector } from 'react-redux'
import { setPost } from '../redux/slice'



const Createpost = ({ picturePath }) => {

    const dispatch = useDispatch()
    const [isImage, setIsImage] = useState(false)
    const [image, setImage] = useState(null)
    const [post, setpost] = useState("")
    const { palette } = useTheme()
    const { _id } = useSelector((state) => state.user)
    const token = useSelector((state) => state.token)
    const isNonMobileScreen = useMediaQuery("(min-width : 1024px)")
    const mediummain = palette.neutral.mediumMain
    const medium = palette.neutral.medium


    const handlepost = async () => {

        const formData = new FormData()

        formData.append("userid", _id)

        formData.append("description", post)

        if (image) {
            formData.append('picture', image)
            formData.append('picturePath', image.name)
        }

        const userpost = await fetch(`http://localhost:10000/api/createpost`, {
            method: "POST",
            headers: {
                Authorization: token
            },
            body: formData,
        })

        const postdata = await userpost.json()
        console.log(postdata);
        dispatch(setPost({ postdata }))
        setImage(null)
        setpost("")
    }

    // console.log(post);

    return (
        <>
            <Wrapper>
                <StyledComp gap='1rem'>
                    <Userimage image={picturePath} />
                    <InputBase placeholder='Write something confusing...' onChange={(e) => setpost(e.target.value)} value={post} sx={{
                        width: "100%",
                        backgroundColor: palette.neutral.light,
                        borderRadius: '2rem',
                        padding: '1rem 2rem'
                    }} />

                </StyledComp>
                {
                    isImage && (
                        <Box border={`1px solid ${medium}`} borderRadius='5px' mt='1rem' p='1rem' >
                            <Dropzone
                                acceptedFiles=".jpeg,.jpg ,.png"
                                multiple={false}
                                onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
                            >
                                {({ getRootProps, getInputProps }) => {
                                    return (
                                        <StyledComp>
                                            <Box
                                                {...getRootProps()}
                                                border='2px dashed green'
                                                padding='1rem'
                                                width='100%'
                                                sx={{
                                                    '&:hover': {
                                                        cursor: 'pointer'
                                                    }
                                                }}
                                            >
                                                <input {...getInputProps()} />
                                                {!image ? (
                                                    <p>Add photo</p>
                                                ) : (
                                                    <StyledComp>
                                                        <Typography>{image.name}</Typography>
                                                        <EditOutlined />
                                                    </StyledComp>
                                                )}
                                            </Box>
                                            {image && (
                                                <>
                                                    <IconButton onClick={() => setImage(null)} sx={{
                                                        width: "15%"
                                                    }}>
                                                        <DeleteOutlined />
                                                    </IconButton>
                                                </>
                                            )}
                                        </StyledComp>
                                    )
                                }}
                            </Dropzone>
                        </Box>
                    )
                }

                <Divider sx={{ margin: '1.25rem 0' }} />
                <StyledComp>
                    <StyledComp gap='0.25rem' onClick={() => setIsImage(!isImage)}>
                        <ImageOutlined sx={{ color: mediummain }} />
                        <Typography color={mediummain} sx={{
                            "&:hover": {
                                cursor: 'pointer',
                                color: medium
                            }
                        }}> Image </Typography>
                    </StyledComp>
                    {
                        isNonMobileScreen ? (
                            <>
                                <StyledComp gap='0.25rem'>
                                    <GifBoxOutlined sx={{ color: mediummain }} />
                                    <Typography color={mediummain}>Clip</Typography>
                                </StyledComp>
                                <StyledComp gap='0.25rem'>
                                    <AttachFileOutlined sx={{ color: mediummain }} />
                                    <Typography color={mediummain}>Attatchment</Typography>
                                </StyledComp>
                            </>
                        ) : (
                            <>
                                <StyledComp gap='0.25rem'>
                                    <MoreHorizOutlined sx={{ color: mediummain }} />
                                </StyledComp>
                            </>
                        )
                    }

                    <Button disabled={!post}
                        onClick={handlepost}
                        sx={{
                            // color: palette.background.alt,
                            color: 'black',
                            backgroundColor: palette.primary.main,
                            border: '1px solid black',
                            borderRadius: '12px',
                            "&:hover": {
                                backgroundColor: "#ABB2B9"
                            }
                        }}
                    >
                        Post
                    </Button>

                </StyledComp>
            </Wrapper>
        </>
    )
}

export default Createpost
