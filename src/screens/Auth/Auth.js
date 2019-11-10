import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles'; 
import { createMuiTheme, makeStyles, fade } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';
import red from '@material-ui/core/colors/red';
import { Box, AppBar, Toolbar, IconButton, Button, TextField, Fade,FormControlLabel, Switch,Paper } from '@material-ui/core';
import CloseRounded from '@material-ui/icons/CloseRounded';
import LoginPanel from './Login';
import RegistrationACQ from './RegistrationACQ';
import RegistrationORG from './RegistrationORG';

const theme = createMuiTheme({
    palette: {
        type: 'light',
        primary: { 
            main: grey[600]
        },
        secondary: { main: red[400] }
    },
    typography: {
        fontFamily: [
            '"Montserrat"', 'sans-serif'
        ].join(",")
    }
});

const useStylesReddit = makeStyles(theme => ({
    root: {
      border: '1px solid #e2e2e1',
      overflow: 'hidden',
      borderRadius: 4,
      backgroundColor: '#fcfcfb',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      '&:hover': {
        backgroundColor: '#fff',
      },
      '&$focused': {
        backgroundColor: '#fff',
        boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
        borderColor: theme.palette.primary.main,
      },
    },
    focused: {},
  }));

function RedditTextField(props) {
    const classes = useStylesReddit();
  
    return <TextField InputProps={{ classes, disableUnderline: true }} {...props} />;
}

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    main: {
        width: "100%",
    },
    boxL: {
        position: 'fixed',
        overflow: 'auto',
        right: 0,
        maxWidth: 'calc(100% - 27.5em)',
        width: '55em',
        background: '#ffffff',
        height: '100%',
        top: 0,
        margin: 0,
        zIndex: 999999,
        transition: 'all 0.5s cubic-bezier(0.77, 0, 0.175, 1)',
        boxShadow: '0 0 12px 0 rgba(0,0,0,0.1), 0 10px 30px 0 rgba(0,0,0,0.2)',
        flexGrow: 1,
        transform: 'translateX(110%)'
    },
    boxLOpened: {
        position: 'fixed',
        overflow: 'auto',
        right: 0,
        maxWidth: 'calc(100% - 27.5em)',
        width: '55em',
        background: '#ffffff',
        height: '100%',
        top: 0,
        margin: 0,
        zIndex: 999999,
        transition: 'all 0.5s cubic-bezier(0.77, 0, 0.175, 1)',
        boxShadow: '0 0 12px 0 rgba(0,0,0,0.1), 0 10px 30px 0 rgba(0,0,0,0.2)',
        flexGrow: 1,
        transform: 'translateX(0%)',
        [theme.breakpoints.down('sm')]: {
            maxWidth: '100%'
        }
    },
    expandPanel: {
        maxWidth: 'calc(100% - 130px)',
        width: '100%',
        [theme.breakpoints.down('sm')]: {
            maxWidth: '100%'
        }
    },
    title: {
        flexGrow: 1,
        fontWeight: 600,
        color: '#404a52',
        marginBottom: 10
    },
    Button:{
        float: 'right',
        marginLeft: 10
    },
    navBarBox:{
        boxShadow: 'none',
        borderBottom: '1px solid #e8ebed'
    },
    BottomNav: {
        borderTop: '1px solid #e8ebed',
        borderBottom: 'none',
        textAlign: 'left'
    },
    lineButtons: {
        position: 'absolute',
        right: 10
    },
    textCenter:{
        textAlign: 'center',
        marginTop: 50
    },
    boxSpacing: {
        marginTop: 30
    },
    fieldText:{
        marginRight: 10,
        width: 'calc(50% - 3.875em)'
    },
    ButtonBng: {
        marginTop: 0,
        height: 57,
    },
    buttonLarge:{
        height: "60px",
        minWidth: "170px",
        marginBottom: 30
    },
    lineBox:{
        textAlign: 'left',
    },
    mSize:{
        transform: 'scale(.7)',
        userSelect: 'none'
    },
    link:{
        float: 'right',
        marginTop: 10
    }, 
    ShowPanel:{
        opacity: 1,
        transition: '.3s'
    },
    hiddenPanel:{
        opacity: 0,
        transition: '.3s'
    },
    maxContainer:{
        width: '100%'
    },
    mw:{
        [theme.breakpoints.up('sm')]: {
            width: 550
        },
        width: '100%'
    }
});

class Login extends Component{

    constructor(props){
        super(props);

        this.state = {
            username: '',
            password: '',
            remember: false,
            expandPanel: false,
            truePanel: true,
            checked_login: true,
            checked_registration: false,
            orgc: false
        };
    }

    componentDidMount(){
        
    }


    handleChange = e =>{
        var name = e.target.name;
        var value = e.target.value;

        this.setState({
            [name]: value
        });
    }

    rememberMe = () =>{
        this.setState({
            remember: !this.state.remember
        });
    }

    closePanel = () =>{
        this.props.closed(false);
    }
    
    expandPanel = () => {
        if(this.state.expandPanel){
            this.setState({
                expandPanel: !this.state.expandPanel,
                checked_login: !this.state.checked_login,
                checked_registration: !this.state.checked_registration,
                orgc: false
            });
        }else{
            this.closePanel();
        }

    }
    
    expandPanelL = () => {
        //if(!this.state.expandPanel){
            this.setState({
                expandPanel: (this.state.expandPanel ? true : true),
                checked_login: false,
                checked_registration:  (this.state.checked_registration ? true : true),
                orgc: !this.state.orgc
            });
        /*}else{

        }*/
    }
    
    regOrg = (e) =>{ 
        this.setState({
            expandPanel: (this.state.expandPanel ? true : true),
            checked_login: false,
            checked_registration:  (this.state.checked_registration ? true : true),
            orgc: false
        });
    }

    render(){
        const { classes, open } = this.props;
        const { expandPanel, checked_login, checked_registration, orgc } = this.state;

        return (
            <Box component="span" m={1} className={[(open ? classes.boxLOpened: classes.boxL), (expandPanel ? classes.expandPanel: "") , "__kijd4"].join(" ")}>
                <AppBar position="static" color="inherit" className={classes.navBarBox}>
                    <Toolbar>
                        <IconButton edge="start" className={classes.menuButton} onClick={this.closePanel} aria-label="menu">
                            <CloseRounded />
                        </IconButton>
                        <div className={classes.lineButtons}>
                            <Button size="small" color="inherit" className={classes.Button} onClick={this.expandPanel}>Accedi</Button>
                            <Button size="small" color="inherit" className={classes.Button} onClick={this.expandPanelL}>{!orgc ? "Registrati come Acquirente" : "Registrati come Organizzatore"}</Button>
                        </div>
                    </Toolbar>
                </AppBar>
                    
            
                    <Fade in={checked_login} {...(checked_login ? { timeout: 1000 } : {})}>
                        <Paper elevation={0} className={classes.paper}>
                        {
                            !expandPanel ? 
                                <LoginPanel className={classes.maxContainer} regOrg={this.regOrg} />
                            :
                            ""
                        }
                        </Paper>
                    </Fade>
                
                    <Fade in={checked_registration} {...(checked_registration ? { timeout: 1000 } : {})}>
                        <Paper elevation={0} className={classes.paper}>
                        {
                            !expandPanel ? 
                                ""
                            :
                                orgc ? 
                                    <RegistrationACQ className={classes.mw} />
                                :
                                    <RegistrationORG className={classes.mw} />

                        }
                        </Paper>
                    </Fade>
                
                
            </Box>
        );
    }

}

  
export default withStyles(styles)(Login);