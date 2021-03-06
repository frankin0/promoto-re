import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles'; 
import { createMuiTheme, fade, makeStyles } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { Drawer, ListItemAvatar, Avatar, FormControl, Link, Select, CssBaseline,  Button, List, InputLabel, ListItem, ListItemText, Grid, Hidden, Fade, Input, TextField, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import MaskedInput from 'react-text-mask';
import DateFnsUtils from '@date-io/date-fns';
import ListSettings from '../../components/ListSettings/ListSettings';
import User from '../../services/User/User';
import { withSnackbar } from 'notistack';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { lightBlue, grey, red } from '@material-ui/core/colors';
import KeyboardTabIcon from '@material-ui/icons/KeyboardTabRounded';



const styles = theme => ({

    root: {
        display: 'flex',
      },
      drawer: {
        [theme.breakpoints.up('sm')]: {
          width: 275,
          flexShrink: 0,
        },
      },
      appBar: {
        [theme.breakpoints.up('sm')]: {
          width: `calc(100% - ${275}px)`,
          marginLeft: 275,
        },
      },
      menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
          display: 'none',
        },
      },
      toolbar: theme.mixins.toolbar,
      drawerPaper: {
        width: 275,
        borderRight: 0,
        /*backgroundColor: '#fafafc'*/
      },
      content: {
        flexGrow: 1,
        padding: theme.spacing(6),
      },
      subtitle:{
        padding: '0 8px',
        fontSize: 12,
        fontWeight: 600,
        lineHeight: '16px',
        fontFamily: "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen-Sans,Ubuntu,Cantarell,'Helvetica Neue',sans-serif"
      },
      listM:{
        borderRadius: 4,
        alignItems: 'center',
        padding: '4px 8px',
        display: 'flex',
        textDecoration: 'none',
        fontWeight: 400,
        justifyContent: 'flex-start',
        marginBottom: 5
      },
      listMFont:{
        fontFamily: "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen-Sans,Ubuntu,Cantarell,'Helvetica Neue',sans-serif",
        fontSize: '.9rem'
      },
      rounded:{
        color: theme.palette.getContrastText(lightBlue[200]),
        backgroundColor: lightBlue[200],
        border: '1px solid #e9eaf0',
        height: '6.5rem',
        width: '6.5rem',
        borderRadius: 5
      },
      boxF:{
            display: 'flex',
            marginBottom: '2.5rem',
            maxWidth: 424
      },
      btnCnt:{
          textTransform: 'none',
          backgroundColor: '#f5f6fa',
          boxShadow: 'none',
          fontWeight: 600,
          fontFamily: "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen-Sans,Ubuntu,Cantarell,'Helvetica Neue',sans-serif",
          marginBottom: 10
      },
      buttonTrush:{
          paddingLeft: 10,
          paddingRight: 10,
          minWidth: 'auto',
          marginLeft: 15,
          marginBottom: 10,
          backgroundColor: lightBlue[200],
          color: theme.palette.getContrastText(lightBlue[200]),
      },
      fieldText:{
        marginRight: 10,
        width: '100%',
        [theme.breakpoints.down('sm')]: {
            width: '100%',
            marginBottom: 10
        }
    },
    saveButton:{
        textTransform: 'none',
        boxShadow: 'none',
        fontWeight: 600,
        fontFamily: "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen-Sans,Ubuntu,Cantarell,'Helvetica Neue',sans-serif",
        paddingLeft: 10,
        paddingRight: 10,
        minWidth: 'auto',
        marginBottom: 10,
        marginTop: 15,
        backgroundColor: lightBlue[200],
        color: theme.palette.getContrastText(lightBlue[200]),
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
function RedditMaskedInput(props) {
    const classes = useStylesReddit();
    const { inputRef, ...other } = props;

    return <MaskedInput
            {...other}
            ref={ref => {
            inputRef(ref ? ref.inputElement : null);
            }}
            mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
            placeholderChar={'\u2000'}
            showMask
        />;
}


class Security extends Component{

    constructor(props){
        super(props);

        this.state = {
            mobileOpen: false,
            age: 1,//new Date(),
            typeU: '',
            user: JSON.parse(localStorage.getItem('user_info')),
            oldPassword: '',
            newPassword: '',
            repeatPassword: '',
            conferme: true
        }
    }

    componentDidMount(){
        document.body.classList.add("__settings");
    }


    componentWillUnmount(){
        document.body.classList.remove("__settings");
    }

    handleDrawerToggle = () => {
        this.setState({
            mobileOpen: !this.state.mobileOpen
        });
    };
    handleDateChange = e => {

        this.setState({
            age: e
        });
    }

    typeChange = e =>{ 
        this.setState({
            typeU: e.currentTarget.value
        });
    }

    handleChange = (e) => {

        let res = this.state.user;
        res[e.currentTarget.name] = e.currentTarget.value;

        this.setState({
            res,
            [e.currentTarget.name]: e.currentTarget.value
        });
    }

    logout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("UserInfoLog");
        localStorage.removeItem("user_info");
        localStorage.removeItem("__paypal_storage__");
        window.location.reload(); 
    }

    handleSendData = (e) => {
        const {oldPassword, newPassword, repeatPassword} = this.state;
        
        // customized
        const action = key => (
            <React.Fragment>
                <Button onClick={() => this.logout()}>
                    Scollega Account
                </Button>
                <IconButton size="small" aria-label="close" color="inherit" onClick={() => { this.props.closeSnackbar(key) }}>
                    <CloseIcon fontSize="small" />
                </IconButton>
            </React.Fragment>
        );

        if(newPassword != repeatPassword && newPassword.length < 6){
            console.log("Error");
            return;
        }else if(oldPassword.length < 6){
            console.log("Error");
            return;
        }

        User.postNewPassword(localStorage.getItem('user'), oldPassword, repeatPassword)
            .then((data) => { 
                if(data.data.status._SUCCESS_UPDATED_ == "false"){
                    this.props.enqueueSnackbar(data.data.status._MESSAGE_, { 
                        variant: 'error',
                    });
                }else if(data.data.status._SUCCESS_UPDATED_ == "true"){
                    
                    this.props.enqueueSnackbar("Password Modificata correttamente!",{ 
                        variant: 'success',
                        action
                    });

                    this.setState({
                        oldPassword: '',
                        newPassword: '',
                        repeatPassword: '',
                    });
                }else{
                    this.props.enqueueSnackbar("Error: Try another second!");
                }
            })
            .catch((e) => console.log(e));

    }

    render(){

        const {classes, container } = this.props;
        const { oldPassword, newPassword, repeatPassword, conferme } = this.state;


        return (
            <div className={classes.root}>
                <CssBaseline />
                <nav className={classes.drawer} aria-label="mailbox folders">
                    {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                    <Hidden smUp implementation="css">
                        <Drawer
                            container={container}
                            variant="temporary"
                            anchor={'left'}
                            open={this.state.mobileOpen}
                            onClose={this.handleDrawerToggle}
                            
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                            ModalProps={{
                                keepMounted: true, // Better open performance on mobile.
                            }}
                        >
                            {<ListSettings classes={classes} {...this.props} closeMenu={this.handleDrawerToggle} />}
                        </Drawer>
                    </Hidden>
                    <Hidden xsDown implementation="css">
                        <Drawer
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                            variant="permanent"
                            open
                        >
                            {<ListSettings classes={classes} {...this.props} />}
                        </Drawer>
                    </Hidden>
                </nav>
                <main className={classes.content}>
                    <Button onClick={this.handleDrawerToggle} className="noDesk" startIcon={
                                                    <KeyboardTabIcon style={{marginTop: 5}} />
                                                } style={{fontSize: '1rem', textTransform: 'none', fontWeight: 400, marginBottom: 30}}> Apri menu</Button>

                    <Typography variant="h5" component="h2" color="textSecondary" style={{marginBottom: 10}}>
                        <b>Sicurezza</b>
                    </Typography>
                    <br />
                    <Typography variant="h6" component="div" color="textSecondary">
                        Aggiornamento Password
                    </Typography>

                    <div style={{maxWidth: 424, marginBottom: 50}}>
                        <Typography variant="caption" component="p" style={{marginBottom: 10,maxWidth: 424, marginTop: 16}} >
                            <div className={classes.boxF} style={{marginBottom: 10}}>
                                <div>
                                    <InfoOutlinedIcon style={{fontSize: '.955rem'}} /> 
                                </div>
                                <div style={{marginLeft: 10, color: '#6a6f85'}}>
                                    Inserisci una nuova password, ma ricorda di inserire prima la vecchia password.
                                </div>
                            </div>
                        </Typography>

                        <RedditTextField
                            label="Vecchia Password"
                            onChange={this.handleChange}
                            className={[classes.fieldText, this.state.usernameError ? "filedError" : ""].join(" ")}
                            defaultValue="react-reddit"
                            variant="filled"
                            type="password"
                            value={oldPassword}
                            name="oldPassword"
                            id="reddit-input"
                            style={{marginBottom: 20}}
                            color="textSecondary"
                        />

                        <RedditTextField
                            label="Nuova Password"
                            onChange={this.handleChange}
                            className={[classes.fieldText, this.state.usernameError ? "filedError" : ""].join(" ")}
                            defaultValue="react-reddit"
                            variant="filled"
                            type="password"
                            value={newPassword}
                            name="newPassword"
                            id="reddit-input"
                            style={{marginBottom: 10}}
                            color="textSecondary"
                        />
                        <RedditTextField
                            label="Ripeti nuova Password"
                            onChange={this.handleChange}
                            className={[classes.fieldText, this.state.usernameError ? "filedError" : ""].join(" ")}
                            defaultValue="react-reddit"
                            variant="filled"
                            type="password"
                            value={repeatPassword}
                            name="repeatPassword"
                            id="reddit-input"

                            color="textSecondary"
                        />


                        <Button variant="contained" onClick={this.handleSendData} disabled={!(newPassword.length >=6 && newPassword == repeatPassword && conferme && oldPassword.length >= 6)} color="secondary" className={classes.saveButton} disableElevation>Aggiorna</Button>
                    </div>



                </main>
            </div>
        );
    }

}


Security.propTypes = {
    container: PropTypes.instanceOf(typeof Element === 'undefined' ? Object : Element),
    inputRef: PropTypes.func.isRequired,
};

export default withStyles(styles)(
    withSnackbar(Security)
);