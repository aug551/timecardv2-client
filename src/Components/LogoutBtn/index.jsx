import { Button } from '@mui/material';
import './index.css';
import React from 'react'

const LogoutBtn = (props) => {
    return (
        <Button sx={{ marginTop: '1.3rem' }} variant='contained' onClick={props.logOut}>Log out</Button>
    )
}

export default LogoutBtn