import React, { Component } from 'react';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Drawer, Dialog, CssBaseline,  Button, Hidden, List, ListItem, ListItemAvatar, ListItemText, ListItemSecondaryAction, AppBar, TextField, Avatar, Toolbar, InputBase ,ListSubheader,  Typography, Grid } from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles'; 
import { lightBlue, grey, red, yellow } from '@material-ui/core/colors';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import { createMuiTheme, fade, makeStyles } from '@material-ui/core/styles';
import Partner from '../../services/Partners/Partner';
import { withSnackbar } from 'notistack';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';


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

class AddPartner extends Component{

    constructor(pros){
        super(pros);

        this.state = {
            email: null,
            username: null,
            password: null,
            expire: null,
            status: 1
        }
    }

    componentDidMount(){
        
    }

    handleClose = () =>{
        this.setState({
            email: null,
            username: null,
            password: null,
            expire: null,
            status: 1
        });
        this.props.closeModal(false);
    }

    switchChange = (e) => {
        e.preventDefault(); 

        this.setState({status: e.target.checked});
    }

    handleChange = (e) => {
        e.preventDefault();
        let name = e.currentTarget.name;
        let val = e.currentTarget.value;

        this.setState({[name]: val});
    }

    handleSave = () => {
        const { email, username, password, expire, status } = this.state;

        if(username == null)
            this.props.enqueueSnackbar("Inserisci un username!", { 
                variant: 'error',
            });

        if(password == null)
            this.props.enqueueSnackbar("Inserisci una password lunga minimo 6 caratteri!", { 
                variant: 'error',
            });

        Partner.addPartner(localStorage.getItem('user'), email, username, password, expire, status)
            .then((response) => {
                if(response.data._SUCCESS_){
                    this.props.enqueueSnackbar("Account partner creato!", { 
                        variant: 'default',
                    });
                    this.handleClose();
                    let acc = {
                        id: response.data.id,
                        prtUsername: username,
                        prtPartnerAccount: {},
                        prtExpiration: expire,
                        prtLogPass: null,
                        prtStatus: status,
                        prtEmail: email
                    };
                    this.props.addPartner(acc);
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

    render(){

        const {classes } = this.props;
        const { email, username, password, expire, status } = this.state;

        return (
            <div>
                <Dialog open={this.props.open} scroll={"body"} onClose={this.handleClose} aria-labelledby="scroll-dialog-title" aria-describedby="scroll-dialog-description">
                    <DialogTitle id="form-dialog-title">Aggiungi partner</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Il partner non è altro che un collaboratore che ti aiuterà con l'autenticità dei tuoi tickets.<br />
                            Espandi il tuo commercio in tutto il territorio assegnando ai tuoi collaboratori un account.
                        </DialogContentText>

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
                                    className={[classes.fieldText, this.state.email ? "filedError" : ""].join(" ")}
                                    variant="filled"
                                    type="text"
                                    value={username}
                                    name="username"
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
                                            Puoi inserire un'email di contatto (scelta opzionale), per poter notificare al tuo partner i dati di questo account.
                                        </div>
                                    </div>
                                </Typography>

                                <RedditTextField
                                    label="Email"
                                    onChange={this.handleChange}
                                    className={[classes.fieldText, this.state.usernameError ? "filedError" : ""].join(" ")}
                                    variant="filled"
                                    type="email"
                                    value={email}
                                    name="email"
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
                                    control={<Switch color="secondary" checked={status} onChange={this.switchChange} />}
                                    label="Attiva questo partner"
                                />
                            </div>
                        </div>

                        <div className={classes.bodySecondWRK} style={{marginTop: 0}}>
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
                                    variant="filled"
                                    type="password"
                                    value={password}
                                    name="password"
                                    id="reddit-input"

                                    color="textSecondary"
                                />
                            </div>

                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Chiudi
                        </Button>
                        <Button onClick={this.handleSave} color="primary">
                            Aggiungi
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
            );
    }

}

export default withStyles(styles)(withSnackbar(AddPartner));