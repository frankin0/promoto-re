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
import { Base64 } from 'js-base64';
import CircularProgress from '@material-ui/core/CircularProgress';
import Tooltip from '@material-ui/core/Tooltip';
import { lightBlue, grey, red } from '@material-ui/core/colors';
import KeyboardTabIcon from '@material-ui/icons/KeyboardTabRounded';


import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
  
} from '@material-ui/pickers';


/*
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
*/


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
    hiddenInput:{
        display: 'none'
    },
    fabProgress:{
        position: "absolute"
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

class Settings extends Component{

    constructor(props){
        super(props);

        this.state = {
            mobileOpen: false,
            age: 1,//new Date(),
            typeU: '',
            profilePic: null,
            user: JSON.parse(localStorage.getItem('user_info')),
            loadImage: false,
            removeImage: false
        }

    }

    componentDidMount(){
        document.body.classList.add("__settings");

        this.setState({
            age: new Date(this.state.user.UserBirthday+"T21:11:54"),
            typeU: this.state.user.UserGender,
            profilePic: this.state.user.UserProfilePic,
        });
    }

    componentWillUnmount(){
        document.body.classList.remove("__settings");
    }

    handleDrawerToggle = () => {
        this.setState({
            mobileOpen: !this.state.mobileOpen
        });
    };

    typeChange = e =>{ 
        if(e.currentTarget == undefined){
            this.setState({
                age: e
            });
        }else{
            let name = e.currentTarget.name; 
            let value = e.currentTarget.value;
    
            this.setState({
                [name]: value
            });
        }
    
    }

    handleChange = (e) => {
        let res = this.state.user;
        res[e.currentTarget.name] = e.currentTarget.value;

        this.setState({
            res
        });
    }

    removeProfilePic = () => {
        const {user} = this.state;

        this.setState({
            removeImage: true
        });
        User.RemoveImage(localStorage.getItem('user'))
            .then((data) => { 
                this.setState({
                    removeImage: false
                });

                if(data.data._SUCCESS_ == true){
                    this.props.enqueueSnackbar("Immagine eliminata", { 
                        variant: 'default',
                    });

                    user.UserProfilePic = null;
                    localStorage.setItem('user_info', JSON.stringify(user));
                }else if(data.data._SUCCESS_ == false){
                    this.props.enqueueSnackbar(data.data._ERROR_, { 
                        variant: 'error',
                    });
                }else{
                    this.props.enqueueSnackbar("Show error in console", { 
                        variant: 'error',
                    });
                }
            })
            .catch((e) => console.log(e));
    }

    fileClick = () => {
       
        const me = this;
        document.getElementById('profilepic').click();
        document.body.onfocus = function () {
            setTimeout(function(){
                if(document.getElementById('profilepic').value.length <= 0){
                    me.setState({
                        loadImage: false
                    });
                }else{
                    me.setState({
                        loadImage: true
                    });
                }

                document.body.onfocus = null;
            }, 100); 
        };
       
    }

    checkImage = (event) =>{
        let files = event.target.files;
        let reader = new FileReader();
        reader.readAsDataURL(files[0]);

        reader.onload = (e) => {
            const { user } = this.state;

            this.setState({
                profilePic: e.target.result,
            })
            
            //Get a web
            User.UploadImage(localStorage.getItem('user'),  e.target.result)
                .then((data) => { 
                    console.log(data);
                    this.setState({
                        loadImage: false
                    });

                    if(data.data._SUCCESS_ == true){
                        this.props.enqueueSnackbar("Informazioni aggiornate", { 
                            variant: 'default',
                        });

                        user.UserProfilePic = data.data._RESULT_;
                        localStorage.setItem('user_info', JSON.stringify(user))
                    }else if(data.data._SUCCESS_ == false){
                        this.props.enqueueSnackbar(data.data._ERROR_, { 
                            variant: 'error',
                        });
                    }else{
                        this.props.enqueueSnackbar("Show error in console", { 
                            variant: 'error',
                        });
                    }
                })
                .catch((e) => console.log(e));
        }
    }

    handleClickMail = () => {
        const { user } = this.state;

        if(user.userEmail == null){
            return;
        }
        
        User.UpdateUserInfo(localStorage.getItem('user'), user)
        .then((data) => { 
            if(data.data._SUCCESS_ == true){
                this.props.enqueueSnackbar("Informazioni aggiornate", { 
                    variant: 'default',
                });


                localStorage.setItem('user_info', JSON.stringify(user))

            }else if(data.data._SUCCESS_ == false){
                this.props.enqueueSnackbar(data.data._ERROR_, { 
                    variant: 'error',
                });
            }else{
                this.props.enqueueSnackbar("Show error in console", { 
                    variant: 'error',
                });
            }
        })
        .catch((e) => console.log(e));
    }

    handleClickUserIndo = () => {
        const { user, typeU } = this.state;

        user.UserGender = typeU;

        User.UpdateUserInfo(localStorage.getItem('user'), user)
        .then((data) => { 
            if(data.data._SUCCESS_ == true){
                this.props.enqueueSnackbar("Informazioni aggiornate", { 
                    variant: 'default',
                });

                localStorage.setItem('user_info', JSON.stringify(user))

            }else if(data.data._SUCCESS_ == false){
                this.props.enqueueSnackbar(data.data._ERROR_, { 
                    variant: 'error',
                });
            }else{
                this.props.enqueueSnackbar("Show error in console", { 
                    variant: 'error',
                });
            }
        })
        .catch((e) => console.log(e));
    }

    render(){

        const {classes, container } = this.props;
        const { user, typeU, loadImage, profilePic } = this.state;
        
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
                        <b>Il mio profilo</b>
                    </Typography>

                    <div className={classes.boxF}>
                        <div>
                            {
                                this.state.profilePic == null ? 
                                    <Avatar variant="rounded" className={classes.rounded} >
                                        {user.UserRealName != null ? user.UserRealName.toUpperCase().substr(0,1) : ""}{user.UserRealSurname != null ? user.UserRealSurname.toUpperCase().substr(0,1) : "NS"}
                                    </Avatar>
                                : <Avatar alt="Remy Sharp"  className={classes.rounded} src={this.state.profilePic} />
                            }
                        </div>
                        <div style={{marginLeft: 15}}>
                            <input type="file" name="profilepic" id="profilepic" onChange={this.checkImage} className={classes.hiddenInput} />
                            <Button variant="contained" className={classes.btnCnt} onClick={this.fileClick} disableElevation disabled={loadImage}>{loadImage ? <CircularProgress color="secondary"  size={15} className={classes.fabProgress} /> : ""} Carica immagine</Button>
                            <Tooltip title="Rimuovi immagine" placement="top">
                                <Button variant="contained" color="secondary" onClick={this.removeProfilePic} disableElevation className={classes.buttonTrush} disabled={!profilePic}><DeleteForeverRoundedIcon /></Button>
                            </Tooltip>

                            <Typography variant="caption"color="textSecondary" component="p" style={{marginBottom: 10}}>
                                Accettiamo i file in formato JPG, PNG e GIF, fino a 5 MB.<br />
                                Sistema di auto upload
                            </Typography>
                        </div>
                    </div>
                    
                    
                    <Typography variant="h6" component="div" color="textSecondary">
                        Indirizzo email
                    </Typography>

                    <div style={{maxWidth: 424, marginBottom: 50}}>
                        <Typography variant="caption" component="p" style={{marginBottom: 10,maxWidth: 424, marginTop: 16}} >
                            <div className={classes.boxF} style={{marginBottom: 10}}>
                                <div>
                                    <InfoOutlinedIcon style={{fontSize: '.955rem'}} /> 
                                </div>
                                <div style={{marginLeft: 10, color: '#6a6f85'}}>
                                    Il tuo indirizzo email verrà utilizzato per tutte le comunicazioni ed aggiornamenti. 
                                </div>
                            </div>
                        </Typography>

                        <RedditTextField
                            label="Email"
                            onChange={this.handleChange}
                            className={[classes.fieldText, this.state.usernameError ? "filedError" : ""].join(" ")}
                            defaultValue="react-reddit"
                            variant="filled"
                            type="text"
                            value={user.userEmail}
                            name="userEmail"
                            id="reddit-input"

                            color="textSecondary"
                        />
                        <Button variant="contained" color="secondary" className={classes.saveButton} disableElevation disabled={!user.userEmail} onClick={this.handleClickMail}>Aggiorna</Button>
                    </div>

                    <Typography variant="h6" component="div" color="textSecondary">
                        Numero di telefono cellulare
                    </Typography>

                    <div style={{maxWidth: 424, marginBottom: 50}}>
                        <Typography variant="caption" style={{marginBottom: 10,maxWidth: 424, marginTop: 16}} >
                            <div className={classes.boxF} style={{marginBottom: 10}}>
                                <div>
                                    <InfoOutlinedIcon style={{fontSize: '.955rem'}} /> 
                                </div>
                                <div style={{marginLeft: 10, color: '#6a6f85'}}>
                                    Recapito telefonico, queste informazioni non verranno divulgate fuori questo portale.
                                </div>
                            </div>
                        </Typography>

                        <div style={{textAlign: 'left', display: 'block', padding: 10,borderRadius: 3, paddingBottom: 5}} className={["MuiFormControl-root MuiTextField-root MuiInputBase-root MuiFilledInput-root MuiInputBase-formControl", classes.fieldText, this.state.usernameError ? "filedError" : ""].join(" ")}>
                            <InputLabel htmlFor="formatted-text-mask-input" style={{transform: 'scale(0.75)'}}>Telefono cellulare</InputLabel>
                            <Input
                                value={user.UserPhone}
                                //onChange={}
                                id="formatted-text-mask-input"
                                name="UserPhone"
                                inputComponent={RedditMaskedInput}
                                onChange={this.handleChange}
                                style={{border: 'none', width: '100%'}}
                            />
                        </div>
                    </div>

                    <Typography variant="h6" component="div" color="textSecondary">
                        Codice fiscale o P.IVA
                    </Typography>

                    <div style={{maxWidth: 424, marginBottom: 50}}>
                        <Typography variant="caption" style={{marginBottom: 10,maxWidth: 424, marginTop: 16}} >
                            <div className={classes.boxF} style={{marginBottom: 10}}>
                                <div>
                                    <InfoOutlinedIcon style={{fontSize: '.955rem'}} /> 
                                </div>
                                <div style={{marginLeft: 10, color: '#6a6f85'}}>
                                    Il campo accetta il codice fiscale oppure la partita iva della tua attività
                                </div>
                            </div>
                        </Typography>

                        <Grid item xs={12}>
                            <RedditTextField
                                    label="Codice fiscale o P.iva"
                                    onChange={this.handleChange}
                                    className={[classes.fieldText, this.state.usernameError ? "filedError" : ""].join(" ")}
                                    defaultValue="react-reddit"
                                    variant="filled"
                                    type="text"
                                    value={user.UserPIVA == null || user.UserPIVA == "*" ? "" : user.UserPIVA}
                                    name="UserPIVA"
                                    id="reddit-input"
                                    color="textSecondary"
                                />
                        </Grid>
                    </div>

                    <Typography variant="h6" component="div" color="textSecondary">
                        Informazioni personali
                    </Typography>

                    <div style={{maxWidth: 424, marginTop: 15}}>
                        <Grid container  spacing={3}>
                            <Grid item xs={6}>

                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
            
                                    <KeyboardDatePicker
                                        disableToolbar
                                        variant="inline"
                                        format="dd/mm/yyyy"
                                        margin="normal"
                                        id="date-picker-inline"
                                        label="Data di nascita"
                                        color="secondary"
                                        className={[classes.fieldText , "makeStyle-input"].join(" ")}
                                        value={this.state.age}
                                        inputVariant="filled"
                                        name="age"
                                        style={{marginTop: 0}}
                                        onChange={this.typeChange}
                                        maxDate={new Date().setFullYear(2020 - 18)}
                                        invalidDateMessage="Formato data errato!"
                                        maxDateMessage="Devi avere minimo 18 anni"
                                        autoOk
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    />
                                </MuiPickersUtilsProvider>
                            </Grid>
                            <Grid item xs={6}>
                                <RedditTextField
                                    label="Città di residenza"
                                    onChange={this.handleChange}
                                    className={[classes.fieldText, this.state.usernameError ? "filedError" : ""].join(" ")}
                                    defaultValue="react-reddit"
                                    variant="filled"
                                    type="text"
                                    value={user.UserCity}
                                    name="UserCity"
                                    id="reddit-input"
                                    color="textSecondary"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl variant="filled" className={[classes.fieldText, 'makeStyle-input', 'makeStyle-input-h', this.state.usernameError ? "filedError" : ""].join(" ")}>
                                    <InputLabel htmlFor="filled-age-native-simple">Genere</InputLabel>
                                    <Select
                                        native
                                        value={typeU}
                                        onChange={this.typeChange}
                                        inputProps={{
                                            name: 'typeU',
                                            id: 'filled-age-native-simple',
                                        }}
                                    >
                                        <option value="" />
                                        <option value={'m'}>Uomo</option>
                                        <option value={'f'}>Donna</option>
                                        <option value={'o'}>Altro</option>
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Button variant="contained" color="secondary" className={classes.saveButton} disableElevation disabled={!user.UserPhone || !user.UserBirthday || !user.UserCity || user.UserGender == "" } onClick={this.handleClickUserIndo}>Aggiorna</Button>
                    </div>



                </main>
            </div>
        );
    }

}


Settings.propTypes = {
    container: PropTypes.instanceOf(typeof Element === 'undefined' ? Object : Element),
    inputRef: PropTypes.func.isRequired,

};

export default withStyles(styles)(
    withSnackbar(Settings)
);