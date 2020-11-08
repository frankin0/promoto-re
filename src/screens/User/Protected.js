import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles'; 
import { createMuiTheme, fade, makeStyles } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { lightBlue, grey, red, yellow } from '@material-ui/core/colors';
import { Drawer, CssBaseline,  Button, Hidden, TextField, CardActionArea,  Grid, CardContent, CardActions, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import ListSettings from '../../components/ListSettings/ListSettings';
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import { withSnackbar } from 'notistack';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import User from '../../services/User/User';
import KeyboardTabIcon from '@material-ui/icons/KeyboardTabRounded';

  const theme = createMuiTheme({
    palette: {
        type: 'dark',
        primary: { 
            main: grey[600]
        },
        secondary: { main: lightBlue[200] },
        textPrimary: '#262a3e'
    },
    typography: {
        fontFamily: [
            '"Montserrat"', 'sans-serif'
        ].join(","),
        color: '#262a3e'
    }
});

function generate(element) {
    return [0, 1, 2].map(value =>
      React.cloneElement(element, {
        key: value,
      }),
    );
  }

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
    },
    iconR1:{
        float: 'right',
        position: 'relative',
        top: 13,
        right: 8    
    },
    secondary:{
        color: theme.palette.getContrastText(lightBlue[200]),
        backgroundColor: lightBlue[200],
    },
    yellow:{
        color: theme.palette.getContrastText(yellow[400]),
        backgroundColor: yellow[400],
    },
    mediaImage:{
        background: 'no-repeat url(https://www.gstatic.com/identity/boq/accountsettingssecuritycommon/images/sprites/Protected_realistic_72-6052e803fdac9b18313d71bbedcdeecc.png) 0 -219px',
        backgroundSize: '72px 1167px',
        margin: '15px auto',
        width: 72,
        height: 72
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

class Protected extends Component{

    constructor(props){
        super(props);

        this.state = {
            mobileOpen: false,
            user_info: JSON.parse(localStorage.getItem("user_info")),
            realname: "",
            realsurname: "",
            paypal: "",
            paypalError: false
        }
    }

    componentDidMount(){
        document.body.classList.add("__settings");

        if(this.state.user_info){
            this.setState({
                realname: this.state.user_info.UserRealName,
                realsurname: this.state.user_info.UserRealSurname,
                paypal: this.state.user_info.UserEmailPayPal ?  this.state.user_info.UserEmailPayPal : "",
            });
        }
    }

    componentWillUnmount(){
        document.body.classList.remove("__settings");
    }

    handleChange = (e) => {

        let res = this.state;
        res[e.currentTarget.name] = e.currentTarget.value;

        if(e.currentTarget.name == "paypal"){
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        
            this.setState({
                paypalError: (re.test(String(e.currentTarget.value).toLowerCase()) ? false : true)
            });
        }

        this.setState({
            res
        });
    }

    handleClick = (e) => {
        const { realname, realsurname, paypal, paypalError, user_info } = this.state; 
        
        if(realname.length < 1){
            this.props.enqueueSnackbar("Inserisci il tuo nome", { 
                variant: 'error',
            });
            return;
        }else if(realsurname.length < 1){
            this.props.enqueueSnackbar("Inserisci il tuo cognome", { 
                variant: 'error',
            });
            return;
        }else if(paypal.length < 6){
            this.props.enqueueSnackbar("Inserisci il account paypal", { 
                variant: 'error',
            });
            return;
        }

        User.UpdatePaymentInfo(localStorage.getItem('user'), realname, realsurname, paypal, "paypal")
            .then((data) => { 
                if(data.data._SUCCESS_ == true){
                    this.props.enqueueSnackbar("Password Modificata correttamente!",{ 
                        variant: 'success'
                    });
                    user_info.UserRealName = realname;
                    user_info.UserRealSurname = realsurname;
                    user_info.UserEmailPayPal = paypal;

                    localStorage.setItem("user_info", JSON.stringify(user_info));
                }else{
                    this.props.enqueueSnackbar(data.data._ERROR_,{ 
                        variant: 'error'
                    });
                }
            })
            .catch((e) => console.log(e));

    }
    handleDrawerToggle = () => {
        this.setState({
            mobileOpen: !this.state.mobileOpen
        });
    };

    render(){
        
        const {classes, container } = this.props;
        const { realname, realsurname, paypal, paypalError } = this.state; 

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
                        <b>I tuoi conti</b>
                    </Typography>
                    <Typography component="body" color="textSecondary" style={{marginBottom: 10}}>
                        Dove vuoi ricevere i pagamenti? 
                    </Typography>

                    <div style={{marginTop: 35, maxWidth: 424}}>

                        <div >
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <Typography variant="h6" component="div" color="textSecondary">
                                        Account Paypal
                                    </Typography>
                                    
                                    <div style={{maxWidth: 424, marginBottom: 10, marginTop: 30}}>
                                        
                                        <RedditTextField
                                            label="Nome completo"
                                            onChange={this.handleChange}
                                            className={[classes.fieldText, this.state.usernameError ? "filedError" : ""].join(" ")}
                                            defaultValue="react-reddit"
                                            variant="filled"
                                            type="text"
                                            value={realname}
                                            name="realname"
                                            id="reddit-input"

                                            color="textSecondary"
                                        />
                                    </div>
                                    <div style={{maxWidth: 424, marginBottom: 10}}>
                                        
                                        <RedditTextField
                                            label="Cognome"
                                            onChange={this.handleChange}
                                            className={[classes.fieldText, this.state.usernameError ? "filedError" : ""].join(" ")}
                                            defaultValue="react-reddit"
                                            variant="filled"
                                            type="text"
                                            value={realsurname}
                                            name="realsurname"
                                            id="reddit-input"

                                            color="textSecondary"
                                        />
                                    </div>
                                   
                                    <div style={{maxWidth: 424, marginBottom: 50}}>
                                        <Typography variant="caption" component="p" style={{marginBottom: 10,maxWidth: 424, marginTop: 16}} >
                                            <div className={classes.boxF} style={{marginBottom: 10}}>
                                                <div>
                                                    <InfoOutlinedIcon style={{fontSize: '.955rem'}} /> 
                                                </div>
                                                <div style={{marginLeft: 10, color: '#6a6f85'}}>
                                                    Riceverai i pagamenti su questo account. "Attenzione questo compo non sarà visibile al pubblico ma solo interno a Promoto"
                                                </div>
                                            </div>
                                        </Typography>
                                        
                                        <RedditTextField
                                            label="Paypal Account"
                                            onChange={this.handleChange}
                                            className={[classes.fieldText, this.state.paypalError ? "filedError" : ""].join(" ")}
                                            defaultValue="react-reddit"
                                            variant="filled"
                                            type="text"
                                            value={paypal}
                                            name="paypal"
                                            id="reddit-input"

                                            color="textSecondary"
                                        />
                                        <Button variant="contained" color="secondary" onClick={this.handleClick} disabled={!(realname.length > 1 && realsurname.length > 1 && paypal.length > 8 && paypalError == false)} className={classes.saveButton} disableElevation>Aggiorna</Button>
                                    </div>

                                </Grid>

                            </Grid>
                                
                        </div>
                        
                    </div>


                </main>
            </div>
        );
    }

}


Protected.propTypes = {
    container: PropTypes.instanceOf(typeof Element === 'undefined' ? Object : Element),
    inputRef: PropTypes.func.isRequired,

};

export default withStyles(styles)(
    withSnackbar(Protected)
);