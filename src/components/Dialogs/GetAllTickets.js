import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles'; 
import { createMuiTheme, fade, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import CloseRounded from '@material-ui/icons/CloseRounded';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspaceRounded';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import ShoppingCartOutlined from '@material-ui/icons/ShoppingCartOutlined';
import { withSnackbar } from 'notistack';
import User from '../../services/User/User';


import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
  
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';



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
    rootL:{
        
        overflow: 'hidden'
    },
    headerDialog:{
        borderBottom: '1px solid #eeedf2',
        fontSize: '1.125rem',
        lineHeight: '1.5rem',
        textAlign: 'center'
    },
    darkBorderColor:{
        borderColor: '#383838'
    },
    Bg:{
        borderLeft: '1px solid #eeedf2',
        backgroundColor: '#f8f7fa'
    },
    BgDark: {
        borderLeft: '1px solid #383838',
        backgroundColor: '#424242'
    },
    closeBtn:{
        position: 'absolute',
        top: 10,
        right: 10
    },
    footerDialog:{
        borderTop: '1px solid #eeedf2',
        fontSize: '1.125rem',
        lineHeight: '1.5rem',
        justifyContent: 'space-between'
    },
    dateX :{
        display: 'block',
        fontSize: '0.75rem',
        color: '#6f7287',
        lineHeight: '1rem'
    },
    titleList:{
        fontSize: '1rem',
        lineHight: '1.5rem',
        fontWeight: 600,
        color: '#39364F'
    },
    block:{
        display: 'block'
    },
    contain_rp_pp:{
        padding: 20
    },
    rp_pp:{
        fontWeight: 600
    },
    centerBox:{
        alignContent: 'center',
        WebkitBoxAlign: 'center',
        MsFlexAlign: 'center',
        alignItems: 'center',
        margin: 'auto',
        WebkitBoxPack: 'center',
        justifyContent: 'center'
    },
    mright:{
        float: 'right'
    },
});

class MaxWidthDialog extends Component{
    constructor(props){
        super(props);

        this.state = {
            tickets: [
                {
                    title: "Titolo biglietto #1",
                    price: 10,
                    dateExpired: '10-02-2020',
                    value: 0,
                    tax: 0,
                    delivery: 0
                },
                {
                    title: "Titolo biglietto #2",
                    price: 20,
                    dateExpired: '10-02-2020',
                    value: 0,
                    tax: 0,
                    delivery: 0
                },
                {
                    title: "Titolo biglietto #3",
                    price: 30,
                    dateExpired: '10-02-2020',
                    value: 0,
                    tax: 2,
                    delivery: 1
                },
                {
                    title: "Titolo biglietto #4",
                    price: 40,
                    dateExpired: '10-02-2020',
                    value: 0,
                    tax: 0,
                    delivery: 0
                }
            ],
            ticketSelected:[],
            subtotal: 0,
            tax: 0,
            delivery: 0,
            total: 0,
            stepTwo: false,
            user: JSON.parse(localStorage.getItem('user_info')),
            typeU: '',
        }
    }

    componentDidMount(){
        const {tickets} = this.state;

        tickets.forEach((element, index) => {
            this.setState((prevState) => ({
                ...prevState,
                ticketSelected: {
                    ...prevState.ticketSelected,
                        [index]: 0
                }})
            );
        });



        this.setState({
            typeU: "U"//this.state.user.UserGender,
        });
    }

    handleClose = () => {
        this.props.closeModal(true);
    };

    changeValue = (i, e) =>{  console.log(i, e);
        var name = e.currentTarget.name;
        var value = e.currentTarget.value;
        this.setState((prevState) => ({
            ...prevState,
            ticketSelected: {
                ...prevState.ticketSelected,
                    [i]: value
            }})
        );

        this.setState({
            total: value * this.state.tickets[i].price,
            tax: value * this.state.tickets[i].tax,
            delivery: value * this.state.tickets[i].delivery,
        });

    }

    handleContinue = () =>{
        this.setState({
            stepTwo: true
        });
        //Se non sei connesso Chiudi la schermata ed apri la schermata di accesso.
        localStorage.setItem("TicketSelected", this.state.ticketSelected);
    }

    handleBack = () => {
        this.setState({
            stepTwo: false
        });
    }

    render(){

        const {classes, title, date } = this.props;
        const {tickets, ticketSelected, total, stepTwo, user, typeU} = this.state;
        const formatter = new Intl.NumberFormat('it-IT', {
            style: 'currency',
            currency: 'EUR'
        });
        const options = {'month': 'long', 'day': '2-digit', 'year' : 'numeric'};

        var n = Array(0), tax_ = Array(0), delivery_ = Array(0);

        console.log(user);
        return (
            <React.Fragment>
                <Dialog
                    fullWidth={true}
                    maxWidth={"md"}
                    open={this.props.show}
                    onClose={this.handleClose}
                    aria-labelledby="max-width-dialog-title"
                    className={classes.rootL}
                >
                    <Grid container spacing={0}>
                        <Grid item xs={8}>
                            <div>
                            <DialogTitle id="max-width-dialog-title" className={[classes.headerDialog, this.props.theme ? classes.darkBorderColor : ""].join(" ")} >
                                {
                                    stepTwo ?
                                        <IconButton aria-label="delete" onClick={this.handleBack} disabled={total <=0} className={classes.margin} style={{
                                            position: "absolute",
                                            left: 10,
                                            top: 10                                        
                                        }}>
                                            <KeyboardBackspaceIcon />
                                        </IconButton>
                                    : ""
                                }
                                {stepTwo ? "Checkout" : title} {stepTwo ? "" : <small className={classes.dateX}>{date}</small>} 
                            </DialogTitle>
                            {
                                stepTwo ?
                                <DialogContent>
                                    <DialogContentText>
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
                                        
                                    </DialogContentText>
                                </DialogContent>
                                :
                                <DialogContent style={{height: '56vh',padding: 0}}>
                                    <DialogContentText>
                                        <List className={classes.root}>
                                            {tickets.map((val, index) => (
                                                <ListItem key={index} alignItems="flex-start" style={{borderBottom: '1px solid ' + (this.props.theme ? "#383838" : "#eeedf2"), padding: "16px 30px"}}>
                                                    <ListItemText
                                                        primary={<p className={classes.titleList} style={this.props.theme ? {color: '#cecece'} : {}}>{val.title}</p>}
                                                        secondary={
                                                            <React.Fragment>
                                                                <Typography
                                                                    component="span"
                                                                    variant="body2"
                                                                    className={classes.block}
                                                                    color="textPrimary"
                                                                >
                                                                    {<span><b style={{marginBottom: 4}}>{formatter.format(val.price)}</b> <small>+ Tassa: {formatter.format(val.tax)} + Spedizione: {formatter.format(val.delivery)}</small></span>}
                                                                </Typography>
                                                                {<span style={{fontWeight: 400}}>Le vendite termineranno il giorno {new Date(val.dateExpired).toLocaleString('it-IT', options)}</span>}
                                                            </React.Fragment>
                                                        }
                                                    />

                                                    <ListItemAvatar>
                                                        <TextField id="outlined-basic" name={val} variant="outlined" type="number" style={{width: 100}} InputProps={{ inputProps: { min: 0, max: 99 } }} value={ticketSelected[index]} onChange={(me) => this.changeValue(index, me)} />
                                                    </ListItemAvatar>
                                                </ListItem>
                                            ))}
                                            
                                        </List>        
                                    </DialogContentText>
                                </DialogContent>
                            }
                            <DialogActions className={[ this.props.theme ? classes.darkBorderColor : "", classes.footerDialog ].join(" ")}>
                                <Button onClick={this.handleContinue} disabled={total <=0} variant="contained" color="secondary" style={{paddingLeft: 25, paddingRight: 25}}>
                                    Continua
                                </Button>
                            </DialogActions>
                            </div>
                        </Grid>
                        <Grid item xs={4} className={[classes.Bg, 'center-box', this.props.theme ? classes.BgDark : ""].join(" ")}>
                            <img src={this.props.copertine} width="100%" style={{borderBottom: '1px solid ' + (this.props.theme ? "#383838" : "#eeedf2")}} />
                            <IconButton aria-label="delete"  onClick={this.handleClose}  className={classes.closeBtn} size="small">
                                <CloseRounded fontSize="inherit" />
                            </IconButton>

                            <React.Fragment>
                                {total > 0 ?
                                    <Typography
                                        component="div"
                                        className={classes.contain_rp_pp}
                                    >
                                        <Typography
                                            component="span"
                                            variant="body2"
                                            className={classes.rp_pp}
                                            color="textPrimary"
                                        >
                                            Riepilogo Ordine
                                        </Typography>

                                        <List dense={true}>
                                            {
                                                Object.keys(ticketSelected).length > 0 ? 
                                                    Object.keys(ticketSelected).map((val, index) => {
                                                        if(Object.values(ticketSelected)[index] > 0){

                                                            n.push(Object.values(ticketSelected)[index] * tickets[index].price)
                                                            tax_.push(Object.values(ticketSelected)[index] * tickets[index].tax)
                                                            delivery_.push(Object.values(ticketSelected)[index] * tickets[index].delivery)

                                                            return (
                                                                
                                                                <ListItem key={index} style={{padding: 0}} className={['ksjdfjsd__']}>
                                                                    <ListItemText
                                                                        primary={Object.values(ticketSelected)[index] +" x "+tickets[index].title}
                                                                        secondary={<span>{formatter.format(Object.values(ticketSelected)[index] * tickets[index].price)}</span>}
                                                                    />
                                                                </ListItem>
                                                            );
                                                        }
                                                    })
                                                : " "
                                            }
                                        </List>

                                        <Divider component="hr" style={{margin: '10px 0'}} />
                                        
                                        <Typography
                                            component="p"
                                            variant="body2"
                                            className={'ksjdfjsd__'}
                                            color="textPrimary"
                                        >
                                            
                                            Totale parziale <span style={{float: 'right'}}>{formatter.format(eval(n.join('+')))}</span>
                                        </Typography>
                                        <Typography
                                            component="p"
                                            variant="body2"
                                            className={'ksjdfjsd__'}
                                            color="textPrimary"
                                        >
                                            
                                            Tasse <span style={{float: 'right'}}>{formatter.format(eval(tax_.join('+')))}</span>
                                        </Typography>
                                        <Typography
                                            component="p"
                                            variant="body2"
                                            className={'ksjdfjsd__'}
                                            color="textPrimary"
                                        >
                                            
                                            Spedizione <span style={{float: 'right'}}>{formatter.format(eval(delivery_.join('+')))}</span>
                                        </Typography>



                                        <Divider component="hr" style={{margin: '10px 0'}} />

                                        <Typography
                                            component="p"
                                            variant="body2"
                                            className={classes.rp_pp}
                                            color="textPrimary"
                                        >
                                            
                                            Totale <span style={{float: 'right'}}>{formatter.format(eval(n.join('+'))  + eval(tax_.join('+')) + eval(delivery_.join('+')))}</span>
                                        </Typography>
                                        
                                    </Typography>
                                : <React.Fragment>
                                    
                                    <div className={[classes.centerBox, "center-box"].join(' ')}>
                                        <ShoppingCartOutlined fontSize="large" style={{color: '#dbdae3'}} />
                                    </div>
                                    
                                </React.Fragment>}
                            </React.Fragment>
                        </Grid>
                    </Grid>
                   
                </Dialog>
            </React.Fragment>
        );
    }
}



export default withStyles(styles)(
    withSnackbar(MaxWidthDialog)
);