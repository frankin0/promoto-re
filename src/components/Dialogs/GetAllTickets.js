import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles'; 
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import CloseRounded from '@material-ui/icons/CloseRounded';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import ShoppingCartOutlined from '@material-ui/icons/ShoppingCartOutlined';


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
    Bg:{
        borderLeft: '1px solid #eeedf2',
        backgroundColor: '#f8f7fa'
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
        marginLeft: 'calc(100% - 176px)'
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
                    value: 0
                },
                {
                    title: "Titolo biglietto #2",
                    price: 20,
                    dateExpired: '10-02-2020',
                    value: 0
                },
                {
                    title: "Titolo biglietto #3",
                    price: 30,
                    dateExpired: '10-02-2020',
                    value: 0
                },
                {
                    title: "Titolo biglietto #4",
                    price: 40,
                    dateExpired: '10-02-2020',
                    value: 0
                }
            ],
            ticketSelected:[],
            total: 0,
            stepTwo: false
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
    }

    handleClose = () => {
        this.props.closeModal(true);
    };

    changeValue = (i, e) =>{
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
            total: value * this.state.tickets[i].price
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
        const {tickets, ticketSelected, total, stepTwo} = this.state;
        const formatter = new Intl.NumberFormat('it-IT', {
            style: 'currency',
            currency: 'EUR'
        });
        const options = {'month': 'long', 'day': '2-digit', 'year' : 'numeric'};

        var n = Array(0);
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
                            <DialogTitle id="max-width-dialog-title" className={classes.headerDialog} >{stepTwo ? "Continua" : title} {stepTwo ? "" : <small className={classes.dateX}>{date}</small>} </DialogTitle>
                            {
                                stepTwo ?
                                <DialogContent>
                                    <DialogContentText>
                                        <Typography
                                            component="div"
                                            variant="h6"
                                            className={classes.block}
                                            color="textPrimary"
                                        >
                                            Informazioni di contatto
                                        </Typography>   
                                        
                                    </DialogContentText>
                                </DialogContent>
                                :
                                <DialogContent style={{height: '56vh'}}>
                                    <DialogContentText>
                                        <List className={classes.root}>
                                            {tickets.map((val, index) => (
                                                <ListItem key={index} alignItems="flex-start" style={{borderBottom: '1px solid #eeedf2'}}>
                                                    <ListItemText
                                                        primary={<p className={classes.titleList}>{val.title}</p>}
                                                        secondary={
                                                            <React.Fragment>
                                                                <Typography
                                                                    component="span"
                                                                    variant="body2"
                                                                    className={classes.block}
                                                                    color="textPrimary"
                                                                >
                                                                    {<b style={{marginBottom: 4}}>{formatter.format(val.price)}</b>}
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
                            <DialogActions className={classes.footerDialog}>
                                {
                                    stepTwo ?
                                        <Button onClick={this.handleBack} disabled={total <=0} variant="contained" color="primary" style={{paddingLeft: 25, paddingRight: 25, marginLeft: 30}}>
                                            Indietro
                                        </Button>
                                    : ""
                                }
                                <Button onClick={this.handleContinue} className={stepTwo ? "" : classes.mright} disabled={total <=0} variant="contained" color="secondary" style={{paddingLeft: 25, paddingRight: 25, marginRight: 30}}>
                                    Continua
                                </Button>
                            </DialogActions>
                            </div>
                        </Grid>
                        <Grid item xs={4} className={[classes.Bg, 'center-box'].join(" ")}>
                            <img src={this.props.copertine} width="100%" style={{borderBottom: '1px solid #eeedf2',}} />
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
                                            className={classes.rp_pp}
                                            color="textPrimary"
                                        >
                                            
                                            Totale <span style={{float: 'right'}}>{formatter.format(eval(n.join('+')))}</span>
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


export default withStyles(styles)(MaxWidthDialog);