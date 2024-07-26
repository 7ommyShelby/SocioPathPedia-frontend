import { useState } from 'react'
import { Box, useMediaQuery, Typography, useTheme, TextField, Button, Grid } from '@mui/material'
import { EditOutlined } from '@mui/icons-material'
import { Formik } from 'formik'
import * as yup from 'yup'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setLogin } from '../redux/slice'
import Dropzone from 'react-dropzone'
import StyledComp from './StyledComp'
import { setloading } from '../redux/slice'
import Loading from './Loading'
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const registerSchema = yup.object().shape({
    firstName: yup.string().required('required'),
    lastName: yup.string().required('required'),
    email: yup.string().email('Invalid email').required('required'),
    password: yup.string().required('required'),
    location: yup.string().required('required'),
    occupation: yup.string().required('required'),
    picture: yup.string().required('required'),
})

const loginSchema = yup.object().shape({
    email: yup.string().email('Invalid email').required('required'),
    password: yup.string().required('required'),
})

const initialValuesRegister = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    location: '',
    occupation: '',
    picture: '',
}

const initialValuesLogin = {
    email: '',
    password: '',
}

const Form = () => {

    const { palette } = useTheme()
    const [pageType, setPage] = useState('login')

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const isNonMobile = useMediaQuery('(min-width : 600px)')
    const isLogin = pageType === "login"
    const isRegister = pageType === 'register'
    const loading = useSelector((state) => state.loading)

    const register = async (values, onSubmitProps) => {

        let formdata = new FormData();   //to send form with img

        console.log(values);

        for (let val in values) {
            formdata.append(val, values[val])
            // console.log(formdata, val, "inloop");
        }

        formdata.append('picturePath', values.picture.name)

        // dispatch(setloading(true))

        const saveduser = await toast.promise(
            fetch('https://sociopathpedia-backend.onrender.com/api/user/register', {
                method: 'POST',
                body: formdata,
            }),
            {
                pending: 'Validating inputs',
                success: 'Account Successfully Created 👌',
                error: 'Something went wrong, Please try again! 🤯'
            }
        )

        const res = await saveduser.json()
        console.log(res);
        onSubmitProps.resetForm()

        if (res) {
            setPage('login')
            // toast.success("Account Created Successfully !", {
            //     position: "top-center"
            // });
        }

        // dispatch(setloading(false))

    }

    const login = async (values, onSubmitProps) => {
        // dispatch(setloading(true))
        const loggedin = await toast.promise(
            fetch('https://sociopathpedia-backend.onrender.com/api/user/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            }), {
            pending: 'Validating inputs',
            success: 'logged In Successfully 👌',
            error: 'Something went wrong, Please try again! 🤯'
        }

        )

        const res = await loggedin.json()
        onSubmitProps.resetForm()

        console.log(res);

        if (res) {
            dispatch(setLogin({
                user: res.data,
                token: res.token
            }))
            navigate('/home')
            toast.success("Welcome !", {
                position: "top-center"
            });
        }
        // dispatch(setloading(false))
    }

    const handleFormSubmit = async (values, onSubmitProps) => {
        if (isLogin) await login(values, onSubmitProps);
        if (isRegister) await register(values, onSubmitProps);
    }

    return (
        <>
            <ToastContainer />
            <Formik onSubmit={handleFormSubmit} initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
                validationSchema={isLogin ? loginSchema : registerSchema}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleBlur,
                    handleChange,
                    handleSubmit,
                    setFieldValue,
                    resetForm
                }) => (
                    <form onSubmit={handleSubmit}>
                        <Box display='grid' gap='30px' gridTemplateColumns='repeat(4,minmax(0, 1fr))'
                            sx={{ "& > div": { gridColumn: isNonMobile ? undefined : 'span 4' } }}
                        >
                            {isRegister && (
                                <>
                                    <TextField
                                        label='First Name' onBlur={handleBlur} onChange={handleChange} value={values.firstName} name='firstName' error={Boolean(touched.firstName) && Boolean(errors.firstName)} helperText={touched.firstName && errors.firstName} sx={{ gridColumn: 'span 2' }} />

                                    <TextField
                                        label='Last Name' onBlur={handleBlur} onChange={handleChange} value={values.lastName} name='lastName' error={Boolean(touched.lastName) && Boolean(errors.lastName)} helperText={touched.lastName && errors.lastName} sx={{ gridColumn: 'span 2' }} />

                                    <TextField
                                        label='Location' onBlur={handleBlur} onChange={handleChange} value={values.location} name='location' error={Boolean(touched.location) && Boolean(errors.location)} helperText={touched.location && errors.location} sx={{ gridColumn: 'span 4' }} />

                                    <TextField
                                        label='Occupation' onBlur={handleBlur} onChange={handleChange} value={values.occupation} name='occupation' error={Boolean(touched.occupation) && Boolean(errors.occupation)} helperText={touched.occupation && errors.occupation} sx={{ gridColumn: 'span 4' }} />

                                    <Box gridColumn='span 4'
                                        border='1px solid white'
                                        borderRadius='5px'
                                        padding='1rem'
                                    >
                                        <Dropzone
                                            acceptedFiles=".jpeg,.jpg ,.png"
                                            multiple={false}
                                            onDrop={(acceptedFiles) => setFieldValue('picture', acceptedFiles[0])}
                                        >
                                            {({ getRootProps, getInputProps }) => {
                                                return <Box
                                                    {...getRootProps()}
                                                    border='2px dashed green'
                                                    padding='.5rem'
                                                    sx={{
                                                        '&:hover': {
                                                            cursor: 'pointer'
                                                        }
                                                    }}
                                                >
                                                    <input {...getInputProps()} />
                                                    {!values.picture ? (
                                                        <p>Add picture here</p>
                                                    ) : (
                                                        <StyledComp>
                                                            <Typography>{values.picture.name}</Typography>
                                                            <EditOutlined />
                                                        </StyledComp>
                                                    )}
                                                </Box>
                                            }}
                                        </Dropzone>
                                    </Box>
                                </>
                            )}
                            <TextField
                                label='Email' onBlur={handleBlur} onChange={handleChange} value={values.email} name='email' error={Boolean(touched.email) && Boolean(errors.email)} helperText={touched.email && errors.email} sx={{ gridColumn: 'span 4' }} />
                            <TextField
                                label='Password' type='password' onBlur={handleBlur} onChange={handleChange} value={values.password} name='password' error={Boolean(touched.password) && Boolean(errors.password)} helperText={touched.password && errors.password} sx={{ gridColumn: 'span 4' }} />
                        </Box>

                        <Box>{
                            loading ? <Loading /> :
                                <Button fullWidth
                                    type='submit'
                                    sx={{
                                        margin: '2rem 0',
                                        padding: '1rem',
                                        backgroundColor: palette.primary.main,
                                        color: palette.background.alt,
                                        "&:hover": {
                                            color: palette.primary.main
                                        }
                                    }}
                                >
                                    {isLogin ? 'Login' : 'Register'}
                                </Button>
                        }

                            <Typography onClick={() => {
                                setPage(isLogin ? "register" : "login")
                                resetForm()
                            }}
                                sx={{
                                    textDecoration: 'underline',
                                    color: palette.primary.main,
                                    '&:hover': {
                                        cursor: 'pointer',
                                        color: palette.primary.light
                                    }
                                }}>
                                {isLogin ? "Don't have an account? Sign up here." : "Already have an account ? Login here"}
                            </Typography>
                        </Box>

                    </form>
                )}
            </Formik>
        </>
    )
}

export default Form
