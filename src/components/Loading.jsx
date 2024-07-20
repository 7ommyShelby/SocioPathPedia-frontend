import { Box } from '@mui/material'
import React from 'react'
import { RotatingLines } from 'react-loader-spinner'

const Loading = () => {
    return (
        <>
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                overflow: 'hidden',
                height: '100%',
                width: '100%',
                backgroundColor: 'black',
                overflow: "hidden",
                opacity: '0.75',
                padding: '1rem',
                m: '1rem 0'
            }}>
                <RotatingLines
                    visible={true}
                    height="35"
                    width="35"
                    strokeColor="grey"
                    strokeWidth="5"
                    animationDuration="0.75"
                    ariaLabel="rotating-lines-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                />
            </Box>
        </>
    )
}

{/* <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    width: '100vw',
    backgroundColor: '#5F6A6A'
}}>
    <Loading />
</div> */}

export default Loading
