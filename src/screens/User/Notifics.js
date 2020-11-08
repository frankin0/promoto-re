import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles'; 
import { createMuiTheme, fade, makeStyles } from '@material-ui/core/styles';
import { withSnackbar } from 'notistack';

import { lightBlue, grey, red, yellow } from '@material-ui/core/colors';
import { Drawer, Avatar, Checkbox, ListSubheader, Switch, Divider, CssBaseline,  Button, List, IconButton, ListItem, ListItemText, Grid, Hidden, Fade, Input, TextField, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import ListSettings from '../../components/ListSettings/ListSettings';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import EmailTwoToneIcon from '@material-ui/icons/EmailTwoTone';
import PhoneIphoneTwoToneIcon from '@material-ui/icons/PhoneIphoneTwoTone';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Partner from '../../services/Partners/Partner';
import ServiceNoty from '../../services/Notifics/Index';

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
    }
});


class Notifics extends Component{

    constructor(props){
        super(props);

        this.state = {
            userInfo: JSON.parse(localStorage.getItem('user_info')),
            mobileOpen: false,
            personalExpansionPanel: false,
            personal: [],
            partnerLists: [],
            team: []
        }
    }

    componentDidMount(){
        document.body.classList.add("__settings");

        Partner.getPartnerLists(localStorage.getItem('user'))
        .then(result => {
            this.setState({
                partnerLists: result.data.lists
            });
        })
        .catch((e) => console.log(e));

        ServiceNoty.getUserNotifics(localStorage.getItem('user'))
        .then(result => { 
            this.setState({
                personal: result.data
            });
        })
        .catch((e) => console.log(e));

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

    handlePersonalCheck = (e, name, index, val, device) => { 
        let item = this.state.personal[name][index]; 
        item[device] = !item[device]; 
        this.setState({
            item
        });
        
        ServiceNoty.setNotific(localStorage.getItem('user'), item.string, [(item.checkedApp ? 1 : 0), (item.checkedMail ? 1: 0)])
        .then(result => { 
            this.props.enqueueSnackbar("Impostazioni aggiornate" ,{ 
                variant: 'success'
            });
        })
        .catch((e) => console.log(e));
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

    handlePartnerCheck = (e, name, account, index, val, device) =>{
        let item = this.state.partnerLists[account].notifics[name][index];
        item[device] = !item[device]; 
        this.setState({
            item
        });

        ServiceNoty.setPartnerNotific(
            localStorage.getItem('user'), 
            item.string, 
            [(item.checkedApp ? 1 : 0), (item.checkedMail ? 1: 0)], 
            this.state.partnerLists[account].id
        ).then(result => { 
            this.props.enqueueSnackbar("Impostazioni aggiornate" ,{ 
                variant: 'success'
            });
        })
        .catch((e) => console.log(e));
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
        const { team, partnerLists, userInfo, personal } = this.state; 

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
                                    <Typography className={classes.heading} style={{display: 'flex', lineHeight: 2.3}}>
                                        <Avatar alt={userInfo.UserRealName != null && userInfo.UserRealSurname != null ? userInfo.UserRealName.charAt(0).toUpperCase() + userInfo.UserRealName.slice(1) + " " + userInfo.UserRealSurname.charAt(0).toUpperCase() + userInfo.UserRealSurname.slice(1) : "NS"} style={{transform: 'scale(.6)'}} src={this.state.userInfo.UserProfilePic} />  {userInfo.UserRealName} {userInfo.UserRealSurname} 
                                    </Typography>
                                    {/*<FormControlLabel
                                        aria-label="Acknowledge"
                                        onClick={event => event.stopPropagation()}
                                        onFocus={event => event.stopPropagation()}
                                        control={<Switch onClick={this.handleCheckPersonalAll} />}
                                        style={{position: 'absolute',right: 10, marginTop: 1}}
                                    />*/}
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails style={{display: 'block', padding: 0}}>
                                    {
                                        personal['Generale'] != undefined ? 
                                            Object.keys(personal).map((name, index) => {

                                                return (
                                                    <React.Fragment key={index}>
                                                        <Divider />
                                                        <ListSubheader style={{paddingLeft: 0, paddingRight: 0}}>
                                                            {name}
                                                            <EmailTwoToneIcon className={classes.iconR1} />
                                                            <PhoneIphoneTwoToneIcon className={classes.iconR1} style={{marginRight: 18}} />
                                                        </ListSubheader>
                                                        <Divider />
                                                        <List dense={true} style={{padding: 0}}>
                                                            {
                                                                personal[name].map((val, index2) => {
                                                                    return (
                                                                        <React.Fragment>
                                                                            <ListItem key={index2} style={{paddingLeft: 0,paddingRight: 0}}>
                                                                                <ListItemText
                                                                                    primary={<span style={{fontWeight: 500}}>{val.title}</span>}
                                                                                    secondary={val.subTitle}
                                                                                />
                                                                                <ListItemSecondaryAction style={{right: 0}}>
                                                                                    <Checkbox
                                                                                        checked={val.checkedApp}
                                                                                        onChange={(event) => this.handlePersonalCheck(event, name, index2, val, 'checkedApp')}
                                                                                        id={val.string+"checkedApp"}
                                                                                        name={val.string+"checkedApp"}
                                                                                        value={val.string+"checkedApp"}
                                                                                        inputProps={{ 'aria-label': 'primary checkbox' }}
                                                                                    />
                                                                                    <Checkbox
                                                                                        checked={val.checkedMail}
                                                                                        onChange={(event) => this.handlePersonalCheck(event, name, index2, val, 'checkedMail')}
                                                                                        id={val.string+"checkedMail"}
                                                                                        value={val.string+"checkedMail"}
                                                                                        name={val.string+"checkedMail"}
                                                                                        inputProps={{ 'aria-label': 'primary checkbox' }}
                                                                                    />
                                                                                </ListItemSecondaryAction>
                                                                            </ListItem>
                                                                            <Divider />
                                                                        </React.Fragment>
                                                                    )
                                                                })
                                                            }
                                                        </List>
                                                    </React.Fragment>
                                                );
                                            })
                                        : ""
                                    }
                                </ExpansionPanelDetails>
                            </ExpansionPanel>

                            {
                                partnerLists.length > 0 ? 
                                    partnerLists.map((t, i) => {
                                        return (
                                            <ExpansionPanel color={"transparent"} expanded={t.expansionPanel} onChange={(event) => this.teamExpansionPanel(event, t, i)}  style={{boxShadow: 'none',backgroundColor: 'transparent'}}>
                                                <ExpansionPanelSummary
                                                    expandIcon={<ExpandMoreIcon />}
                                                    aria-controls="panel1a-content"
                                                    id="panel1a-header"
                                                    style={{padding: 0, minHeight: 'auto'}}
                                                >
                                                    <Typography className={classes.heading} style={{display: 'flex', lineHeight: 2.3}}><Avatar className={classes["secondary"]} style={{transform: 'scale(.6)'}}>{t.prtUsername.substr(0,1)}</Avatar> {t.prtUsername}</Typography>
                                                    {/*<FormControlLabel
                                                        aria-label="Acknowledge"
                                                        onClick={event => event.stopPropagation()}
                                                        onFocus={event => event.stopPropagation()}
                                                        control={<Switch onClick={(event) => this.handleCheckAllTeam(event, i, t)} />}
                                                        style={{position: 'absolute',right: 10, marginTop: 1}}
                                                    />*/}
                                                </ExpansionPanelSummary>
                                                <ExpansionPanelDetails style={{display: 'block', padding: 0}}>
                                                {
                                                    Object.keys(t.notifics).map((name, index) => {

                                                        return (
                                                            <React.Fragment key={index}>
                                                                <Divider />
                                                                <ListSubheader style={{paddingLeft: 0, paddingRight: 0}}>
                                                                    {name}
                                                                    <EmailTwoToneIcon className={classes.iconR1} />
                                                                    <PhoneIphoneTwoToneIcon className={classes.iconR1} style={{marginRight: 18}} />
                                                                </ListSubheader>
                                                                <Divider />
                                                                <List dense={true} style={{padding: 0}}>
                                                                    {
                                                                        t.notifics[name].map((val, index2) => { 
                                                                            return (
                                                                                <React.Fragment>
                                                                                    <ListItem key={index2} style={{paddingLeft: 0,paddingRight: 0}}>
                                                                                        <ListItemText
                                                                                            primary={<span style={{fontWeight: 500}}>{val.title}</span>}
                                                                                            secondary={val.subTitle.split("<br>").map(function(item, idx) {
                                                                                                return (
                                                                                                    <span key={idx}>
                                                                                                        {item}
                                                                                                        <br/>
                                                                                                    </span>
                                                                                                 )
                                                                                            })}
                                                                                        />
                                                                                        <ListItemSecondaryAction style={{right: 0}}>
                                                                                            <Checkbox
                                                                                                checked={val.checkedApp}
                                                                                                onChange={(event) => this.handlePartnerCheck(event, name, i, index2, val, 'checkedApp')}
                                                                                                value="secondary"
                                                                                                inputProps={{ 'aria-label': 'primary checkbox' }}
                                                                                            />
                                                                                            <Checkbox
                                                                                                checked={val.checkedMail}
                                                                                                onChange={(event) => this.handlePartnerCheck(event, name, i, index2, val,'checkedMail')}
                                                                                                value="secondary"
                                                                                                inputProps={{ 'aria-label': 'primary checkbox' }}
                                                                                            />
                                                                                        </ListItemSecondaryAction>
                                                                                    </ListItem>
                                                                                    <Divider />
                                                                                </React.Fragment>
                                                                            )
                                                                        })
                                                                    }
                                                                </List>
                                                            </React.Fragment>
                                                        );
                                                    })
                                                }
                                                </ExpansionPanelDetails>
                                            </ExpansionPanel>
                                        );
                                    })
                                : ""
                            }
                            
                            {/*
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
                                                    <Typography className={classes.heading} style={{display: 'flex', lineHeight: 2.3}}><Avatar className={classes[t.color]} style={{transform: 'scale(.6)'}}>{t.prtUsername.substr(0,1)}</Avatar> {t.prtUsername}</Typography>
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
                                */ }
                            
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

export default withStyles(styles)(
    withSnackbar(Notifics)
);