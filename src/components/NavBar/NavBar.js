import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { AppBar, Toolbar, Typography, IconButton, Menu, Tooltip , Button, MenuItem, Avatar } from '@material-ui/core';
import logo from '../../assets/img/logo.png';
import HelpRounded from '@material-ui/icons/HelpRounded';
import NotificationsRounded from '@material-ui/icons/NotificationsRounded';
import ShoppingCartRounded from '@material-ui/icons/ShoppingCartRounded';
import FilterListRounded from '@material-ui/icons/FilterListRounded';

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
    },
    hrDivide:{
        width: '200%',
        marginLeft: -20,
        marginRight: -20,
        borderColor: 'rgba(0, 0, 0, .1)'
    },
    menu:{
        marginTop: 60,
       /* boxShadow: '0 5px 25px 0 rgba(0,0,0,.1)',
        border: '1px solid rgba(0,0,0,.1)',*/
    }
}));

export default function MenuAppBar() {
    const classes = useStyles();
    const [auth, setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const anchorRef = React.useRef(null);

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

                    <Tooltip title="Crea evento" aria-label="add">
                        <Button size="small" className={classes.margin}>Crea</Button>
                    </Tooltip>

                    <Tooltip title="Storico eventi" aria-label="add">
                        <IconButton aria-label="delete" className={classes.margin}>
                            <FilterListRounded />
                        </IconButton>
                    </Tooltip>

                    <IconButton aria-label="delete" className={classes.margin}>
                        <NotificationsRounded />
                    </IconButton>

                    <IconButton aria-label="delete" className={classes.margin}>
                        <ShoppingCartRounded />
                    </IconButton>

                    <Tooltip title="Hai bisogno d'aiuto?" aria-label="add">
                        <IconButton aria-label="delete" className={classes.margin}>
                            <HelpRounded />
                        </IconButton>
                    </Tooltip>

                    {auth && (
                        <div>
                            <Avatar alt="Remy Sharp" ref={anchorRef} aria-controls="menu-appbar" aria-haspopup="true" src="https://material-ui.com/static/images/avatar/1.jpg" onClick={handleMenu} className={classes.avatar} />

                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorRef.current}
                                keepMounted
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
                                className={classes.menu}
                            >
                                <MenuItem onClick={handleClose}>Profilo</MenuItem>
                                <MenuItem onClick={handleClose}>Impostazioni</MenuItem>
                                <MenuItem disabled><hr className={classes.hrDivide} /></MenuItem>
                                <MenuItem onClick={handleClose}>Esci</MenuItem>
                            </Menu>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
        </div>
    );
}