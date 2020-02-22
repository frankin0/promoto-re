import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles'; 
import { createMuiTheme, fade, makeStyles } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import grey from '@material-ui/core/colors/grey';
import red from '@material-ui/core/colors/red';
import yellow from '@material-ui/core/colors/yellow';
import { Drawer, Avatar, Checkbox, ListSubheader, Switch, Divider, CssBaseline,  Button, List, FormControlLabel, ListItem, ListItemText, Grid, Hidden, Fade, Input, TextField, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import ListSettings from '../../components/ListSettings/ListSettings';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import EmailTwoToneIcon from '@material-ui/icons/EmailTwoTone';
import PhoneIphoneTwoToneIcon from '@material-ui/icons/PhoneIphoneTwoTone';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


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
    }
});


class Notifics extends Component{

    constructor(props){
        super(props);

        this.state = {
            mobileOpen: false,
            personalExpansionPanel: false,
            personal: [
                {
                    title: 'Commercial Spy',
                    subTitle: 'Ricevi una notifica per ogni annuncio simile al tuo',
                    container: 0,
                    checkedMail: true,
                    checkedApp: false,
                },
                {
                    title: 'Promoto',
                    subTitle: 'Ricevi aggiornamenti da Promoto',
                    container: 0,
                    checkedMail: true,
                    checkedApp: false,
                },
                {
                    title: 'Ticket venduto',
                    subTitle: 'Ricevi una notifica per ogni biglietto venduto',
                    container: 2,
                    checkedMail: true,
                    checkedApp: true,
                },
                {
                    title: 'Pagamento ricevuto',
                    subTitle: 'Ricevi una notifica per la conferma di pagamento',
                    container: 1,
                    checkedMail: true,
                    checkedApp: true,
                },
                {
                    title: 'Informazioni Generali',
                    subTitle: 'Ricevi una notifica riguardo le problematiche del tuo conto pay',
                    container: 1,
                    checkedMail: true,
                    checkedApp: false,
                },
                {
                    title: 'Feedback ricevuti',
                    subTitle: 'Ricevi una notifica per ogni feedback ricevuto',
                    container: 2,
                    checkedMail: false,
                    checkedApp: true,
                }
            ],
            team: [
                {
                    id: 0,
                    name: "Marco Rossi",
                    color: 'yellow',
                    expansionPanel: false,
                    privacy: {
                        login: {
                            0: false,
                            1: true
                        },
                        monitoring: {
                            0: true,
                            1: true
                        }
                    }
                },
                {
                    id: 1,
                    name: "Giacomo Leopardi",
                    color: 'secondary',
                    expansionPanel: false,
                    privacy: {
                        login: {
                            0: false,
                            1: true
                        },
                        monitoring: {
                            0: true,
                            1: true
                        }
                    }
                }
            ]
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

    personalExpansionPanel = (event, boolean) =>{
        this.setState({
            personalExpansionPanel: !this.state.personalExpansionPanel
        })
    }

    teamExpansionPanel = (e, t, i) =>{ 
        let item = this.state.team[i];
        item.expansionPanel = !item.expansionPanel;
        this.setState({
            item
        })
    }    

    handleTeamCheckbox = (event, container, id, type, teamIndex,t ) => {
/**
 * privacy: {
                        login: {
                            0: false,
                            1: true
                        },
                        monitoring: {
                            0: true,
                            1: true
                        }
                    }
 */// !this.state.team[teamIndex].privacy[id][type]

        let item = this.state.team[teamIndex];
        item.privacy[id][type] = !this.state.team[teamIndex].privacy[id][type];
        this.setState({
            item
        });
    }

    handlePersonalCheck = (e, index, val, device) => {
        let item = this.state.personal[index];
        item[device] = !item[device];
        this.setState({
            item
        });
    }

    handleCheckPersonalAll = (e) => { 
        let items = this.state.personal;

        
        for(let i = 0; i < items.length; i++){
            items[i].checkedMail = e.target.checked;
            items[i].checkedApp = e.target.checked;
            this.setState({
                items,
                personalExpansionPanel:e.target.checked
            })
        }
    
    }

    handleCheckAllTeam = (e, teamIndex, id) => { 
        let item = this.state.team[teamIndex];


        item.privacy.login[0] = e.target.checked;
        item.privacy.login[1] = e.target.checked;

        item.privacy.monitoring[0] = e.target.checked;
        item.privacy.monitoring[1] = e.target.checked;
        
        item.expansionPanel = e.target.checked;
        this.setState({
            item
        });
    
    }
    
    render(){
        
        const {classes, container } = this.props;
        const { team } = this.state; 
        
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
                        <b>Impostazioni di notifica</b>
                    </Typography>
                    <Typography component="body" color="textSecondary" style={{marginBottom: 10}}>
                        Puoi scegliere di ricevere delle notifiche via email o sull'app mobile Promoto nei casi riportati di seguito.
                    </Typography>

                    <div style={{marginTop: 35, maxWidth: 560}}>

                        <div >
                            <ExpansionPanel color={"transparent"} expanded={this.state.personalExpansionPanel} onChange={this.personalExpansionPanel} style={{boxShadow: 'none',backgroundColor: 'transparent'}}>
                                <ExpansionPanelSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                    style={{padding: 0, minHeight: 'auto'}}
                                >
                                    <Typography className={classes.heading} style={{display: 'flex', lineHeight: 2.3}}><Avatar style={{transform: 'scale(.6)'}} src="https://material-ui.com/static/images/avatar/1.jpg"></Avatar> Nome Cognome</Typography>
                                    <FormControlLabel
                                        aria-label="Acknowledge"
                                        onClick={event => event.stopPropagation()}
                                        onFocus={event => event.stopPropagation()}
                                        control={<Switch onClick={this.handleCheckPersonalAll} />}
                                        style={{position: 'absolute',right: 10, marginTop: 1}}
                                    />
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails style={{display: 'block', padding: 0}}>
                                    
                                    {
                                        ["Generale", "Conto", "Richieste"].map((val2, index2) => (
                                            <React.Fragment key={index2}>
                                                <Divider />
                                                <ListSubheader style={{paddingLeft: 0, paddingRight: 0}}>
                                                    {val2}
                                                    <EmailTwoToneIcon className={classes.iconR1} />
                                                    <PhoneIphoneTwoToneIcon className={classes.iconR1} style={{marginRight: 18}} />
                                                </ListSubheader>
                                                <Divider />

                                                <List dense={true} style={{padding: 0}}>
                                                    {
                                                        this.state.personal.map((val, index) => {

                                                            if(val.container === index2){
                                                                return (
                                                                    <React.Fragment>
                                                                        <ListItem key={index} style={{paddingLeft: 0,paddingRight: 0}}>
                                                                            <ListItemText
                                                                                primary={<span style={{fontWeight: 500}}>{val.title}</span>}
                                                                                secondary={val.subTitle}
                                                                            />
                                                                            <ListItemSecondaryAction style={{right: 0}}>
                                                                                <Checkbox
                                                                                    checked={val.checkedApp}
                                                                                    onChange={(event) => this.handlePersonalCheck(event, index, val, 'checkedApp')}
                                                                                    value="secondary"
                                                                                    inputProps={{ 'aria-label': 'primary checkbox' }}
                                                                                />
                                                                                <Checkbox
                                                                                    checked={val.checkedMail}
                                                                                    onChange={(event) => this.handlePersonalCheck(event, index, val, 'checkedMail')}
                                                                                    value="secondary"
                                                                                    inputProps={{ 'aria-label': 'primary checkbox' }}
                                                                                />
                                                                            </ListItemSecondaryAction>
                                                                        </ListItem>
                                                                        <Divider />
                                                                    </React.Fragment>
                                                                )
                                                            }
                                                        })
                                                        
                                                    }
                                                </List>
                                            </React.Fragment>
                                        ))
                                    }

                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                            
                            {
                                team ? 
                                    team.map((t, i) => {
                                        return (

                                            <ExpansionPanel color={"transparent"} expanded={t.expansionPanel} onChange={(event) => this.teamExpansionPanel(event, t, i)}  style={{boxShadow: 'none',backgroundColor: 'transparent'}}>
                                                <ExpansionPanelSummary
                                                    expandIcon={<ExpandMoreIcon />}
                                                    aria-controls="panel1a-content"
                                                    id="panel1a-header"
                                                    style={{padding: 0, minHeight: 'auto'}}
                                                >
                                                    <Typography className={classes.heading} style={{display: 'flex', lineHeight: 2.3}}><Avatar className={classes[t.color]} style={{transform: 'scale(.6)'}}>{t.name.substr(0,1)}</Avatar> {t.name}</Typography>
                                                    <FormControlLabel
                                                        aria-label="Acknowledge"
                                                        onClick={event => event.stopPropagation()}
                                                        onFocus={event => event.stopPropagation()}
                                                        control={<Switch onClick={(event) => this.handleCheckAllTeam(event, i, t)} />}
                                                        style={{position: 'absolute',right: 10, marginTop: 1}}
                                                    />
                                                </ExpansionPanelSummary>
                                                <ExpansionPanelDetails style={{display: 'block', padding: 0}}>
                                                    
                                                    {
                                                        ["Accesso", "Monitoraggio"].map((val2, index2) => (
                                                            <React.Fragment key={index2}>
                                                                <Divider />
                                                                <ListSubheader style={{paddingLeft: 0, paddingRight: 0}}>
                                                                    {val2}
                                                                    <EmailTwoToneIcon className={classes.iconR1} />
                                                                    <PhoneIphoneTwoToneIcon className={classes.iconR1} style={{marginRight: 18}} />
                                                                </ListSubheader>
                                                                <Divider />
                
                                                                <List dense={true} style={{padding: 0}}>
                                                                    {
                                                                        [
                                                                            {
                                                                                title: 'Accesso alla Dashboard',
                                                                                subTitle: 'Ricevi una notifica quando il tuo operatore accede',
                                                                                container: 0,
                                                                                checkedMail: t.privacy.login[1],
                                                                                checkedApp: t.privacy.login[0],
                                                                                id: 'login'
                                                                            },
                                                                            {
                                                                                title: 'Monitoring Event',
                                                                                subTitle: <p>Ricevi una notifica d'aggiornamento dell'evento <br /> assegnato a questo operatore ogni ora</p>,
                                                                                container: 1,
                                                                                checkedMail: t.privacy.monitoring[1],
                                                                                checkedApp: t.privacy.monitoring[0],
                                                                                id: 'monitoring'
                                                                            },
                                                                        ].map((val, index) => {
                
                                                                            if(val.container === index2){
                                                                                return (
                                                                                    <React.Fragment>
                                                                                        <ListItem key={index} style={{paddingLeft: 0,paddingRight: 0}}>
                                                                                            <ListItemText
                                                                                                primary={<span style={{fontWeight: 500}}>{val.title}</span>}
                                                                                                secondary={val.subTitle}
                                                                                            />
                                                                                            <ListItemSecondaryAction style={{right: 0}}>
                                                                                                <Checkbox
                                                                                                    checked={val.checkedApp}
                                                                                                    onChange={(event) => this.handleTeamCheckbox(event, val.container, val.id, 0, i, t)}
                                                                                                    value="secondary"
                                                                                                    inputProps={{ 'aria-label': 'primary checkbox' }}

                                                                                                />
                                                                                                <Checkbox
                                                                                                    checked={val.checkedMail}
                                                                                                    onChange={(event) => this.handleTeamCheckbox(event, val.container, val.id, 1, i, t)}
                                                                                                    value="secondary"
                                                                                                    inputProps={{ 'aria-label': 'primary checkbox' }}
                                                                                                />
                                                                                            </ListItemSecondaryAction>
                                                                                        </ListItem>
                                                                                        <Divider />
                                                                                    </React.Fragment>
                                                                                )
                                                                            }
                                                                        })
                                                                        
                                                                    }
                                                                </List>
                                                            </React.Fragment>
                                                        ))
                                                    }
                
                                                </ExpansionPanelDetails>
                                            </ExpansionPanel>
                                        )
                                    })
                                : ""
                            }
                            
                        </div>
                        
                    </div>


                </main>
            </div>
        );
    }

}


Notifics.propTypes = {
    container: PropTypes.instanceOf(typeof Element === 'undefined' ? Object : Element),
    inputRef: PropTypes.func.isRequired,

};

export default withStyles(styles)(Notifics);