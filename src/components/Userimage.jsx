import { Box } from '@mui/material'
import React from 'react'


const Userimage = ({ image, size = '60px' }) => {
    return (
        <>
            <Box width={size} height={size}>
                <img style={{ objectFit: 'cover', borderRadius: '50%' }} height={size} width={size} alt='user' src={`https://sociopathpedia-backend.onrender.com/images/${image}`} />
            </Box>
        </>
    )
}

export default Userimage
