import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles'; 
import { createMuiTheme, fade, makeStyles } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import grey from '@material-ui/core/colors/grey';
import red from '@material-ui/core/colors/red';
import yellow from '@material-ui/core/colors/yellow';
import deepOrange from '@material-ui/core/colors/orange';
import deepPurple from '@material-ui/core/colors/purple';
import { Badge, Drawer, CssBaseline,  Button, Hidden, List, ListItem, ListItemAvatar, ListItemText, ListItemSecondaryAction, AppBar, TextField, Avatar, Toolbar, InputBase ,ListSubheader,  Typography, Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import ListSettings from '../../components/ListSettings/ListSettings';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import SearchIcon from '@material-ui/icons/Search';
import Partner from '../../services/Partners/Partner';
import DialogConferme from '../../components/Dialogs/DialogConferme';
import { withSnackbar } from 'notistack';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';


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
        paddingBottom: 0
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
    },
    iconR1:{
        float: 'right',
        position: 'relative',
        top: 13,
        right: 8    
    },
    secondary:{
        color: theme.palette.getContrastText(red[400]),
        backgroundColor: red[400],
    },
    yellow:{
        color: theme.palette.getContrastText(yellow[400]),
        backgroundColor: yellow[400],
    },
    orange: {
        color: theme.palette.getContrastText(deepOrange[500]),
        backgroundColor: deepOrange[500],
    },
    purple: {
        color: theme.palette.getContrastText(deepPurple[500]),
        backgroundColor: deepPurple[500],
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
        display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: 0,
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
        marginLeft: 0,
        width: '100%',
        },
    },
    searchIcon: {
        width: theme.spacing(7),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 7),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
        width: '100%',
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
        display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
        display: 'none',
        },
    },
    bodySecondWRK:{
        paddingRight:  theme.spacing(3),
        paddingLeft:  theme.spacing(3),
    }
});



class PartnerUpdateInfo extends Component{

    constructor(props){
        super(props);

        this.state = {
            account: this.props.account,
            dialogOpen: false
        }
    }

    componentDidUpdate(){
        const { account } = this.state;
        if(account != null){
            if(account.id != this.props.account.id){
                this.setState({
                    account: this.props.account
                });
            }
        }
    }

    handleRemove = () => {
        this.setState({
            dialogOpen: true
        });
    }

    closeDialog = () =>{
        this.setState({
            dialogOpen : !this.state.dialogOpen
        });
    }

    handleChange = (e) => {
        e.preventDefault();
        let name = e.currentTarget.name;
        let val = e.currentTarget.value;

        this.setState((prevState) => ({
            ...prevState,
            account: {
                ...prevState.account,
                    [name]: val
            }})
        );
    }

    confermeRemove = (e) => {
        
        if(e){
            Partner.removePartner(localStorage.getItem('user'), this.state.account.id)
                .then((response) => {
                    if(response.data._SUCCESS_){
                        this.props.enqueueSnackbar(response.data._ERROR_, { 
                            variant: 'default',
                        });
                        this.props.removeId(this.state.account.id, this.props.index);
                    }else if(response.data._SUCCESS_ == false){
                        this.props.enqueueSnackbar(response.data._ERROR_ , { 
                            variant: 'error',
                        });
                    }else{
                        this.props.enqueueSnackbar(response.data , { 
                            variant: 'error',
                        });
                    }
                })
                .catch((err) => {
                    console.log("ErrorPartner: " + err);
                });
        }
    }

    handleSave = () => {
        if(this.state.account.prtPassword){
            Partner.updatePartner(localStorage.getItem('user'), this.state.account)
                .then((response) => {
                    if(response.data._SUCCESS_){
                        this.props.enqueueSnackbar(response.data._ERROR_, { 
                            variant: 'default',
                        });
                        this.props.changeAccount(this.state.account, this.props.index);
                    }else if(response.data._SUCCESS_ == false){
                        this.props.enqueueSnackbar(response.data._ERROR_ , { 
                            variant: 'error',
                        });
                    }else{
                        this.props.enqueueSnackbar(response.data , { 
                            variant: 'error',
                        });
                    }
                })
                .catch((err) => {
                    console.log("ErrorPartner: " + err);
                });
        }else{
            this.props.enqueueSnackbar("Inserisci una password" , { 
                variant: 'error',
            });
        }
    }

    switchChange = (e) => {
        e.preventDefault(); 

        var array = this.state.account; // make a separate copy of the array
        array.prtStatus = e.target.checked;
        this.setState({account: array});
        console.log(array.prtStatus, this.state.account);
    }

    render(){
        const { classes } = this.props;
        const {account, dialogOpen} = this.state;

        
        if(account == null) return;

        if(dialogOpen) return (<DialogConferme open={dialogOpen} text={"Sei sicuro di voler eliminare questo account?"} title={"Eliminazione dell'account partner"} closeDialog={this.closeDialog} confermeRemove={this.confermeRemove} />);
        
        return(
            <>
                <div className={classes.bodySecondWRK}>
                    <List dense={true} style={{ borderBottom: '1px solid #4f4f4f'}}>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar className={classes.yellow}>N</Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={<Typography component="h3" variant="h6">{account.prtUsername}</Typography>}
                                secondary={<Typography component="div" variant="subtitle2">{account.prtEmail}</Typography>}
                            />
                            <ListItemSecondaryAction>
                                <Button color="primary" onClick={this.handleSave}>Salva</Button>
                                <Button color="secondary" onClick={this.handleRemove}>Elimina</Button>
                            </ListItemSecondaryAction>
                        </ListItem>
                    </List>
                </div>

                <div className={classes.bodySecondWRK} style={{marginTop: 20}}>
                    <Typography variant="h6" component="div" color="textSecondary">
                        Nome utente
                    </Typography>

                    <div style={{maxWidth: 424, marginBottom: 20}}>
                        <Typography variant="caption" component="p" style={{marginBottom: 10,maxWidth: 424, marginTop: 16}} >
                            <div className={classes.boxF} style={{marginBottom: 10}}>
                                <div>
                                    <InfoOutlinedIcon style={{fontSize: '.955rem'}} /> 
                                </div>
                                <div style={{marginLeft: 10, color: '#6a6f85'}}>
                                    Verrà utilizzato per l'accesso al portale.
                                </div>
                            </div>
                        </Typography>

                        <RedditTextField
                            label="UserName"
                            onChange={this.handleChange}
                            className={[classes.fieldText, this.state.usernameError ? "filedError" : ""].join(" ")}
                            defaultValue="react-reddit"
                            variant="filled"
                            type="text"
                            value={account.prtUsername}
                            name="prtUsername"
                            id="reddit-input"
                            color="textSecondary"
                        />
                    </div>

                </div>
                <div className={classes.bodySecondWRK} style={{marginTop: 20}}>
                    <Typography variant="h6" component="div" color="textSecondary">
                        Email (Optional)
                    </Typography>

                    <div style={{maxWidth: 424, marginBottom: 20}}>
                        <Typography variant="caption" component="p" style={{marginBottom: 10,maxWidth: 424, marginTop: 16}} >
                            <div className={classes.boxF} style={{marginBottom: 10}}>
                                <div>
                                    <InfoOutlinedIcon style={{fontSize: '.955rem'}} /> 
                                </div>
                                <div style={{marginLeft: 10, color: '#6a6f85'}}>
                                    Puoi inserire un'email di contatto (scelta opzionale)
                                </div>
                            </div>
                        </Typography>

                        <RedditTextField
                            label="Email"
                            onChange={this.handleChange}
                            className={[classes.fieldText, this.state.usernameError ? "filedError" : ""].join(" ")}
                            defaultValue="react-reddit"
                            variant="filled"
                            type="email"
                            value={account.prtEmail}
                            name="prtEmail"
                            id="reddit-input"
                            color="textSecondary"
                        />
                    </div>

                </div>

                <div className={classes.bodySecondWRK} style={{marginTop: 20, marginBottom: 0}}>
                    <Typography variant="h6" component="div" color="textSecondary">
                        Stato del partner
                    </Typography>

                    <div style={{maxWidth: 424, marginBottom: 0}}>
                        <Typography variant="caption" component="p" style={{marginBottom: 10,maxWidth: 424, marginTop: 16}} >
                            <div className={classes.boxF} style={{marginBottom: 10}}>
                                <div>
                                    <InfoOutlinedIcon style={{fontSize: '.955rem'}} /> 
                                </div>
                                <div style={{marginLeft: 10, color: '#6a6f85'}}>
                                    Se lo stato del partner è impostato su OFF, non potrà essere utilizzato.<br />
                                    Impostare il typo du True.
                                </div>
                            </div>
                        </Typography>

                        <FormControlLabel
                            control={<Switch color="secondary" checked={account.prtStatus} onChange={this.switchChange} />}
                            label="Attiva questo partner"
                        />
                    </div>
                </div>

                <div className={classes.bodySecondWRK} style={{marginTop: 20}}>
                    <Typography variant="h6" component="div" color="textSecondary">
                        Password
                    </Typography>

                    <div style={{maxWidth: 424, marginBottom: 50}}>
                        <Typography variant="caption" component="p" style={{marginBottom: 10,maxWidth: 424, marginTop: 16}} >
                            <div className={classes.boxF} style={{marginBottom: 10}}>
                                <div>
                                    <InfoOutlinedIcon style={{fontSize: '.955rem'}} /> 
                                </div>
                                <div style={{marginLeft: 10, color: '#6a6f85'}}>
                                    Inserisci una password minimo 6 caratteri alfanumerici per l'accesso al portale gestionale.
                                </div>
                            </div>
                        </Typography>

                        <RedditTextField
                            label="Password"
                            onChange={this.handleChange}
                            className={[classes.fieldText, this.state.usernameError ? "filedError" : ""].join(" ")}
                            defaultValue="react-reddit"
                            variant="filled"
                            type="password"
                            value={account.prtPassword != undefined ? account.prtPassword : ""}
                            name="prtPassword"
                            id="reddit-input"
                            required
                            color="textSecondary"
                        />
                    </div>
                </div>

               
            </>
        );
    }

}


export default withStyles(styles)(withSnackbar(PartnerUpdateInfo));