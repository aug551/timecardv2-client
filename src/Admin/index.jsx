import { useOutletContext } from 'react-router-dom';
import './index.css';
import React, { useEffect, useState } from 'react'
import LogoutBtn from '../Components/LogoutBtn';
import { Button, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import BadgeIcon from '@mui/icons-material/Badge';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import BarChartIcon from '@mui/icons-material/BarChart';
import { Box } from '@mui/system';

const Admin = () => {
    const [emp, setEmp] = useOutletContext();
    const [showMenu, setShowMenu] = useState(false);
    const [openMenu, setOpenMenu] = useState("employees");

    const menuItems = [
        {
            text: "Employees",
            icon: <BadgeIcon />,
            onClick: () => setOpenMenu("employees")
        },
        {
            text: "Shifts",
            icon: <CalendarMonthIcon />,
            onClick: () => setOpenMenu("shifts")
        },
        {
            text: "Reports",
            icon: <BarChartIcon />,
            onClick: () => setOpenMenu("reports")
        }
    ];

    function logOut() {
        setEmp(null);
    }

    function toggleDrawer(open) {
        setShowMenu(open);
    }

    useEffect(() => {
        console.log(openMenu);
    }, [openMenu])

    return (
        <>
            <Button variant='contained' onClick={() => toggleDrawer(true)}>Drawer</Button>
            <Drawer
                anchor='left'
                open={showMenu}
                onClose={() => toggleDrawer(false)}>
                <Box
                    sx={{
                        width: 250,
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between'
                    }}
                    role='presentation'
                    onClick={() => toggleDrawer(false)}
                    onKeyDown={() => toggleDrawer(false)} >
                    <h1>Admin Panel</h1>
                    <List>
                        {menuItems.map((menuItem, idx) => {
                            return <ListItem key={menuItem.text} disablePadding >
                                <ListItemButton onClick={menuItem.onClick}>
                                    <ListItemIcon>{menuItem.icon}</ListItemIcon>
                                    <ListItemText
                                        disableTypography
                                        primary={<Typography variant="body2" style={{ fontSize: '1.33rem', fontWeight: 'bold' }}>{menuItem.text}</Typography>} />
                                </ListItemButton>
                            </ListItem>
                        })}
                    </List>
                    <LogoutBtn logOut={logOut} />
                </Box>
            </Drawer>

        </>
    )
}

export default Admin