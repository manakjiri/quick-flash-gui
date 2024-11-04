"use client";
import React from 'react';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Button, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';




function SuccessMessage(){

    const theme = useTheme(); // Access the theme
    const primaryColor = theme.palette.primary.main;
    return (
        <>
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '100px',
            color: primaryColor // Full height to vertically center
        }}>
        <CheckCircleOutlineIcon style={{
            fontSize: '80px', color: primaryColor
        }}></CheckCircleOutlineIcon>
        <Typography textAlign="center" variant='h5'>Successfully flashed!</Typography>
        <span style={{
            padding: '50px'
        }}><Button variant='contained' color='primary' href="/flash/target" >Finish</Button></span>
        </div>
        </>
    );
}

export default SuccessMessage
