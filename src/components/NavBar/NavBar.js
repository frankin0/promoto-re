import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { AppBar, Toolbar, Typography, IconButton, Menu, Switch, FormControlLabel, FormGroup, MenuItem, Avatar } from '@material-ui/core';
import logo from '../../assets/img/logo.png';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
        display: 'none'
    },
    title: {
        flexGrow: 1,
    },
    logo: {
        margin: 10
    },
    navbar:{
        backgroundColor: 'transparent',
        color: '#898999',
        border: 'none',
        boxShadow: 'none',
        padding: 20
    },
    avatar:{
        margin: 10,
        margin: 10,
        width: 45,
        height: 45,
        borderRadius: 17
    }
}));

export default function MenuAppBar() {
    const classes = useStyles();
    const [auth, setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleChange = event => {
        setAuth(event.target.checked);
    };

    const handleMenu = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className={classes.root}>
            <AppBar position="static" className={classes.navbar}>
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <Menu />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        <img src={logo} height="35px" alt="Promo-to" className={classes.logo} rel="romo-to" />
                    </Typography>
                    {auth && (
                        <div>
                            <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" onClick={handleMenu} className={classes.avatar} />

                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                                }}
                                open={open}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleClose}>Profile</MenuItem>
                                <MenuItem onClick={handleClose}>My account</MenuItem>
                            </Menu>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
        </div>
    );
}