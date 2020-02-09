import { AppBar, Avatar, Button, IconButton, Link, Menu, MenuItem, Toolbar, Tooltip, Typography } from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';
import FilterListRounded from '@material-ui/icons/FilterListRounded';
import HelpRounded from '@material-ui/icons/HelpRounded';
import NotificationsRounded from '@material-ui/icons/NotificationsRounded';
import ShoppingCartRounded from '@material-ui/icons/ShoppingCartRounded';
import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import logo from '../../assets/img/logo.png';


const styles = theme => ({
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
    },
});

class MenuAppBar extends Component {

    constructor(props){
        super(props);

        this.state = {
            auth: false,
            anchorEl: null,
            userInfo: []
        }
    }

    componentDidMount(){
        if(localStorage.getItem("user") !== null){
            this.setState({
                auth: true,
                userInfo: JSON.parse(localStorage.getItem("user_info"))
            });
            
        }
    }

    handleChange = event => {
        this.setState({
            auth: !this.state.auth
        });
    };

    handleMenu = (event) => { 
        this.setState({
            anchorEl: event.currentTarget
        });
    };

    handleClose = () => {
        this.setState({
            anchorEl: null
        });

    };

    openLoginPanel = () =>{
        this.props.login(true);
    }

    logout = () => {
        localStorage.removeItem("user");
        window.location.reload();
    }

    render (){

        const { classes } = this.props; 
        const { anchorEl } = this.state;
        const isMenuOpen = Boolean(anchorEl);

        return (
            <div className={classes.root}>
                <AppBar position="static" className={classes.navbar}>
                    <Toolbar>
                        <IconButton edge="start" className={classes.menuButton} color="textSecondary" aria-label="menu">
                            <Menu />
                        </IconButton>
                        <Typography variant="h6" className={classes.title} color="textSecondary">
                            <Link href="#/">
                                <img src={logo} height="35px" alt="Promo-to" className={classes.logo} rel="romo-to" />
                            </Link>
                        </Typography>
    
                        {this.state.auth ? (
                            <span style={{display: 'contents'}}>
                                <Tooltip title="Crea evento" aria-label="add">
                                    <Button size="small" color="primary" className={classes.margin} onClick={this.handleChange}>Crea</Button>
                                </Tooltip>
    
                                <Tooltip title="Storico eventi" aria-label="add">
                                    <IconButton aria-label="delete"  color="primary" className={classes.margin}>
                                        <FilterListRounded  color="textSecondary" />
                                    </IconButton>
                                </Tooltip>
    
                                <IconButton aria-label="delete"  color="primary" className={classes.margin}>
                                    <NotificationsRounded />
                                </IconButton>
    
                                <IconButton aria-label="delete" color="primary"  className={classes.margin}>
                                    <ShoppingCartRounded />
                                </IconButton>
    
                                <Tooltip title="Hai bisogno d'aiuto?" aria-label="add">
                                    <IconButton aria-label="delete" color="primary" className={classes.margin}>
                                        <HelpRounded />
                                    </IconButton>
                                </Tooltip>
    
                                <Avatar alt="Remy Sharp" ref={this.state.anchorRef} aria-controls="menu-appbar" aria-haspopup="true" src={this.state.userInfo ? this.state.userInfo.UserProfilePic : ""} onClick={this.handleMenu} className={classes.avatar} />
    
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorEl}
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
                                    open={isMenuOpen}
                                    onClose={this.handleClose}
                                    className={classes.menu}
                                >
                                    <MenuItem onClick={this.handleClose} color="textSecondary"><Link color="textSecondary" style={{ textDecoration: 'none'}} href="#/Settings">Profilo</Link></MenuItem>
                                    <MenuItem onClick={this.handleClose}><Link color="textSecondary" style={{ textDecoration: 'none'}} href="#/Settings">Impostazioni</Link></MenuItem>
                                    <MenuItem disabled><hr className={classes.hrDivide} /></MenuItem>
                                    <MenuItem ><Link color="textSecondary" onClick={this.logout} style={{ textDecoration: 'none'}} href="#/">Esci</Link></MenuItem>
                                </Menu>
                            </span>
                        ) : (
                            <React.Fragment>
                                <Button size="small" onClick={this.openLoginPanel} className={classes.margin} style={{marginRight: 10}}>Accedi</Button>
                                <Button size="small" onClick={this.openLoginPanel} color="primary" variant="contained" disableElevation className={classes.margin}>Provalo Gratis</Button>
                            </React.Fragment>
                        )}
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

export default withStyles(styles)(
    withRouter(MenuAppBar)
);
