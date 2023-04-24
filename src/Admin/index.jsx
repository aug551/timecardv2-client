import { Link, NavLink, Outlet, useNavigate, useOutletContext } from 'react-router-dom';
import './index.css';
import React, { useEffect, useState } from 'react'
import LogoutBtn from '../Components/LogoutBtn';
import { Button, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import BadgeIcon from '@mui/icons-material/Badge';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import BarChartIcon from '@mui/icons-material/BarChart';
import MenuIcon from '@mui/icons-material/Menu';
import { Box } from '@mui/system';


const Admin = () => {
    const [emp, setEmp] = useOutletContext();
    const [showMenu, setShowMenu] = useState(false);
    const [openMenu, setOpenMenu] = useState("employees");
    const navigate = useNavigate();

    const menuItems = [
        {
            id: "employees",
            text: "Employees",
            icon: <BadgeIcon />,
            onClick: () => setOpenMenu("employees")
        },
        {
            id: 'shifts',
            text: "Shifts",
            icon: <CalendarMonthIcon />,
            onClick: () => setOpenMenu("shifts")
        },
        {
            id: 'reports',
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
        // setShowMenu(true);
    }, [])

    return (
        <>
            {/* <Button variant='contained' onClick={() => toggleDrawer(true)}>Drawer</Button> */}
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
                            return (
                                <NavLink key={menuItem.text} to={menuItem.id} >
                                    <ListItem disablePadding >
                                        <ListItemButton
                                            onClick={menuItem.onClick}>
                                            <ListItemIcon >{menuItem.icon}</ListItemIcon>
                                            <ListItemText
                                                disableTypography
                                                primary={menuItem.text} />
                                        </ListItemButton>
                                    </ListItem>
                                </NavLink>
                            )
                        })}
                    </List>
                    <LogoutBtn logOut={logOut} />
                </Box>
            </Drawer>
            <nav className="icon-container">
                <IconButton color='primary' aria-label='open menu' component='label' onClick={() => toggleDrawer(true)}>
                    <MenuIcon sx={{ fontSize: '3rem' }} />
                </IconButton>
            </nav>
            <main className='page-container'>


                <Outlet />
            </main>

        </>
    )
}

export default Admin