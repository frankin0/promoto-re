import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles'; 
import { createMuiTheme, fade, makeStyles } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import grey from '@material-ui/core/colors/grey';
import red from '@material-ui/core/colors/red';
import yellow from '@material-ui/core/colors/yellow';
import { Drawer, CssBaseline,  Button, Hidden, TextField, CardActionArea,  Grid, CardContent, CardActions, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import ListSettings from '../../components/ListSettings/ListSettings';

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
    },
    mediaImage:{
        background: 'no-repeat url(https://www.gstatic.com/identity/boq/accountsettingssecuritycommon/images/sprites/AddPartner_realistic_72-6052e803fdac9b18313d71bbedcdeecc.png) 0 -219px',
        backgroundSize: '72px 1167px',
        margin: '15px auto',
        width: 72,
        height: 72
    }
});


class AddPartner extends Component{

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
                    <div style={{marginTop: 35, maxWidth: 'auto'}}>

                        <div >
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    asd
                                </Grid>

                            </Grid>
                                
                        </div>
                        
                    </div>


                </main>
            </div>
        );
    }

}


AddPartner.propTypes = {
    container: PropTypes.instanceOf(typeof Element === 'undefined' ? Object : Element),
    inputRef: PropTypes.func.isRequired,

};

export default withStyles(styles)(AddPartner);