import React, { useState } from 'react'
import { Box, Button, TextField, Typography, useMediaQuery } from '@mui/material';
import Dropzone from 'react-dropzone';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from 'react-redux';
import Wrapper from './Wrapper';
import StyledComp from './StyledComp';
import { setLogin } from '../redux/slice';
import { useNavigate } from 'react-router-dom';
import { EditOutlined } from '@mui/icons-material';

const EditProfile = () => {

    const token = useSelector((state) => state.token)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [formData, setFormData] = useState({});
    const isNonMobile = useMediaQuery('(min-width : 1024px)')

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(formData);

        const data = new FormData();

        for (let val in formData) {
            // console.log(val);
            data.append(val, formData[val]);
        }

        if (formData.picture) {
            // data.append('picture', formData.picture);
            data.append('picturePath', formData.picture.name);
        }

        // console.log('Form submitted', Object.fromEntries(data.entries()));
        updateuser(data)

    };

    const updateuser = async (data) => {

        try {

            const response = await toast.promise(
                fetch('https://sociopathpedia-backend.onrender.com/api/user/update', {
                    method: 'PUT',
                    headers: {
                        'Authorization': token
                    },
                    body: data
                }), {
                pending: 'Updating Profile',
                success: 'Profile Updated',
                error: 'Failed to Update Profile'
            }
            )

            const result = await response.json()
            console.log(result);
            dispatch(setLogin({ user: result.user }))
            // dispatch(setLogin({ token: token }))
            // navigate('/')

        } catch (error) {
            console.log(error);
        }
    }


    return (
        <>
            <ToastContainer />

            <Wrapper sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh'
            }} >
                <Box
                    component="form"
                    sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: !isNonMobile ? '100%' : '75%', textAlign: 'center' }}
                    onSubmit={handleSubmit}
                >
                    <Typography variant="h4">Update Info</Typography>
                    <TextField
                        label="First Name"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}

                    />
                    <TextField
                        label="Last Name"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}

                    />
                    <TextField
                        label="Password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}

                    />
                    <Dropzone acceptedFiles=".jpeg,.jpg ,.png" onDrop={(acceptedFiles) => setFormData((prevData) => ({
                        ...prevData,
                        picture: acceptedFiles[0]
                    }))}>
                        {({ getRootProps, getInputProps }) => (
                            <section>
                                <Box {...getRootProps()} border='2px dashed green'
                                    padding='.7rem'
                                    sx={{
                                        '&:hover': {
                                            cursor: 'pointer'
                                        }
                                    }}>
                                    <input placeholder='Upload Image...'  {...getInputProps()} />{
                                        formData.picture ? (
                                            <>
                                                <p>{formData.picture.name}</p>
                                            </>
                                        ) : (
                                            <><Box>
                                                <StyledComp>
                                                    <p>Drag & drop some files here, or click to select files</p>
                                                    <EditOutlined />
                                                </StyledComp>
                                            </Box>
                                            </>
                                        )
                                    }
                                </Box>
                            </section>
                        )}
                    </Dropzone>
                    <TextField
                        label="Occupation"
                        name="occupation"
                        type="occupation"
                        value={formData.occupation}
                        onChange={handleChange}

                    />
                    <TextField
                        label="Location"
                        name="location"
                        type="location"
                        value={formData.location}
                        onChange={handleChange}

                    />
                    <Box sx={{ display: 'flex', gap: '1rem' }}>
                        <Button onClick={() => navigate('/home')} variant='outlined' sx={{ color: '#C0392B', backgroundColor: '#85C1E9' }}>Cancel</Button>
                        <Button variant="contained" type="submit">Submit</Button>
                    </Box>
                </Box>

            </Wrapper >
        </>
    )
}




export default EditProfile
