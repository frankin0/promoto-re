import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles'; 
import { createMuiTheme, fade, makeStyles } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import grey from '@material-ui/core/colors/grey';
import red from '@material-ui/core/colors/red';
import { Drawer, ListItemAvatar, Avatar, FormControl, Link, Select, CssBaseline,  Button, List, InputLabel, ListItem, ListItemText, Grid, Hidden, Fade, Input, TextField, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import MaskedInput from 'react-text-mask';
import DateFnsUtils from '@date-io/date-fns';
import ListSettings from '../../components/ListSettings/ListSettings';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
  } from '@material-ui/pickers';

  const theme = createMuiTheme({
    palette: {
        type: 'dark',
        primary: { 
            main: grey[600]
        },
        secondary: { main: red[400] },
        textPrimary: '#262a3e'
    },
    typography: {
        fontFamily: [
            '"Montserrat"', 'sans-serif'
        ].join(","),
        color: '#262a3e'
    }
});



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
        color: theme.palette.getContrastText(red[400]),
        backgroundColor: red[400],
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
          backgroundColor: red[400],
          color: theme.palette.getContrastText(red[400]),
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
        backgroundColor: red[400],
        color: theme.palette.getContrastText(red[400]),
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
            typeU: ''
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

    typeChange = e =>{ console.log(e.currentTarget.value)
        this.setState({
            typeU: e.currentTarget.value
        });
    }

    render(){

        const {classes, container } = this.props;

        
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
                            {<ListSettings classes={classes} {...this.props} />}
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
                    <Typography variant="h5" component="h2" color="textSecondary" style={{marginBottom: 10}}>
                        <b>Il mio profilo</b>
                    </Typography>

                    <div className={classes.boxF}>
                        <div>
                            <Avatar variant="rounded" className={classes.rounded}>
                                FE
                            </Avatar>
                        </div>
                        <div style={{marginLeft: 15}}>
                            <Button variant="contained" className={classes.btnCnt} disableElevation>Carica un'immagine</Button>
                            <Button variant="contained" color="secondary" disableElevation className={classes.buttonTrush}><DeleteForeverRoundedIcon /></Button>

                            <Typography variant="caption"color="textSecondary" component="p" style={{marginBottom: 10}}>
                                Accettiamo i file in formato PDF, JPG, PNG e GIF, fino a 5 MB
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
                            value={""}
                            name="username"
                            id="reddit-input"

                            color="textSecondary"
                        />
                        <Button variant="contained" color="secondary" className={classes.saveButton} disableElevation>Aggiorna</Button>
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
                                    Per modificare il tuo numero di telefono, contatta il nostro team di assistenza.
                                </div>
                            </div>
                        </Typography>

                        <div style={{textAlign: 'left', display: 'block', padding: 10,borderRadius: 3, paddingBottom: 5}} className={["MuiFormControl-root MuiTextField-root MuiInputBase-root MuiFilledInput-root MuiInputBase-formControl", classes.fieldText, this.state.usernameError ? "filedError" : ""].join(" ")}>
                            <InputLabel htmlFor="formatted-text-mask-input" style={{transform: 'scale(0.75)'}}>Telefono cellulare</InputLabel>
                            <Input
                                value={3271129388}
                                //onChange={}
                                id="formatted-text-mask-input"
                                inputComponent={RedditMaskedInput}
                                style={{border: 'none', width: '100%'}}
                                disabled
                            />
                        </div>
                    </div>

                    <Typography variant="h6" component="div" color="textSecondary">
                        Informazioni personali
                    </Typography>

                    <div style={{maxWidth: 424, marginTop: 15}}>
                        <Grid container  spacing={3}>
                            <Grid item xs={6}>

                                <ThemeProvider theme={theme}> 
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
                                            style={{marginTop: 0}}
                                            onChange={this.handleDateChange}
                                            maxDate={new Date().setFullYear(2020 - 18)}
                                            invalidDateMessage="Formato data errato!"
                                            maxDateMessage="Devi avere minimo 18 anni"
                                            autoOk
                                            KeyboardButtonProps={{
                                                'aria-label': 'change date',
                                            }}
                                        />
                                    </MuiPickersUtilsProvider>                            
                                </ThemeProvider>
                            </Grid>
                            <Grid item xs={6}>
                                <RedditTextField
                                    label="Città di nascita"
                                    onChange={this.handleChange}
                                    className={[classes.fieldText, this.state.usernameError ? "filedError" : ""].join(" ")}
                                    defaultValue="react-reddit"
                                    variant="filled"
                                    type="text"
                                    value={""}
                                    name="username"
                                    id="reddit-input"
                                    color="textSecondary"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl variant="filled" className={[classes.fieldText, 'makeStyle-input', 'makeStyle-input-h', this.state.usernameError ? "filedError" : ""].join(" ")}>
                                    <InputLabel htmlFor="filled-age-native-simple">Genere</InputLabel>
                                    <Select
                                        native
                                        value={this.state.typeU}
                                        onChange={this.typeChange}
                                        inputProps={{
                                            name: 'type',
                                            id: 'filled-age-native-simple',
                                        }}
                                    >
                                        <option value="" />
                                        <option value={1}>Uomo</option>
                                        <option value={2}>Donna</option>
                                        <option value={3}>Altro</option>
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
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

export default withStyles(styles)(Settings);