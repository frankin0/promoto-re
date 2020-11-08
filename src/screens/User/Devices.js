import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles'; 
import { createMuiTheme, fade, makeStyles } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { lightBlue, grey, red, yellow } from '@material-ui/core/colors';
import { Drawer, CssBaseline,  Button, Hidden, Card, CardActionArea,  Grid, CardContent, CardActions, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import ListSettings from '../../components/ListSettings/ListSettings';
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';
import User from '../../services/User/User';
import CircularProgress from '@material-ui/core/CircularProgress';
import { blue } from '@material-ui/core/colors';
import clsx from 'clsx';
import KeyboardTabIcon from '@material-ui/icons/KeyboardTabRounded';


function time_ago(time) {

    switch (typeof time) {
      case 'number':
        break;
      case 'string':
        time = +new Date(time);
        break;
      case 'object':
        if (time.constructor === Date) time = time.getTime();
        break;
      default:
        time = +new Date();
    }
    var time_formats = [
      [60, 'secondi', 1], // 60
      [120, '1 minuto fa', '1 minito da ora'], // 60*2
      [3600, 'minuti', 60], // 60*60, 60
      [7200, '1 ora fa', '1 ora dopo'], // 60*60*2
      [86400, 'ore', 3600], // 60*60*24, 60*60
      [172800, 'Ieri', 'Oggi'], // 60*60*24*2
      [604800, 'giorni', 86400], // 60*60*24*7, 60*60*24
      [1209600, 'La scorsa settimana', 'La prossima settimana'], // 60*60*24*7*4*2
      [2419200, 'settimane', 604800], // 60*60*24*7*4, 60*60*24*7
      [4838400, 'Lo scorso mese', 'Il mese prossimo'], // 60*60*24*7*4*2
      [29030400, 'mese', 2419200], // 60*60*24*7*4*12, 60*60*24*7*4
      [58060800, "Lo scorso anno", "L'anno prossimo"], // 60*60*24*7*4*12*2
      [2903040000, 'anno', 29030400], // 60*60*24*7*4*12*100, 60*60*24*7*4*12
      [5806080000, 'Qualche secolo fa', 'Il prossimo secolo'], // 60*60*24*7*4*12*100*2
      [58060800000, 'secoli', 2903040000] // 60*60*24*7*4*12*100*20, 60*60*24*7*4*12*100
    ];
    var seconds = (+new Date() - time) / 1000,
      token = 'ago',
      list_choice = 1;
  
    if (seconds == 0) {
      return 'Just now'
    }
    if (seconds < 0) {
      seconds = Math.abs(seconds);
      token = 'from now';
      list_choice = 2;
    }
    var i = 0,
      format;
    while (format = time_formats[i++])
      if (seconds < format[0]) {
        if (typeof format[2] == 'string')
          return format[list_choice];
        else
          return Math.floor(seconds / format[2]) + ' ' + format[1] + ' ' + token;
      }
    return time;
  }
  

const styles = theme => ({

    root: {
        display: 'flex',
      },
      wrapper: {
        margin: theme.spacing(1),
        position: 'relative',
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
        background: 'no-repeat url(https://www.gstatic.com/identity/boq/accountsettingssecuritycommon/images/sprites/devices_realistic_72-6052e803fdac9b18313d71bbedcdeecc.png) 0 -219px',
        backgroundSize: '72px 1167px',
        margin: '15px auto',
        width: 72,
        height: 72
    },
    buttonProgress: {
        color: blue[800],
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
    hiddenCard:{
        transition: ".3s",
        opacity: 0,
        visibility: 'hidden'
    }
});


class Devices extends Component{

    constructor(props){
        super(props);

        this.state = {
            mobileOpen: false,
            devices: [],
            loadingDevices: [],
            successDevices: [],
            removeDevices: []
        }
    }

    componentDidMount(){
        document.body.classList.add("__settings");

        User.UserListDevicesConnected(localStorage.getItem('user'))
            .then((data) => { 

                Object.values(data.data.status).map((val, index) =>{
                    User.getIp(val.UserIP)
                        .then((data2) => { 
                            var dt = data.data.status;
                            dt[index].country =  data2.data.country;
                            dt[index].city =  data2.data.city;
                            dt[index].regionName = data2.data.regionName;
                            
                            this.setState({
                                devices: dt
                            });
                            this.setState((prevState) => ({
                                ...prevState,
                                loadingDevices: {
                                    ...prevState.loadingDevices,
                                        [index]: false
                                },
                                successDevices: {
                                    ...prevState.successDevices,
                                        [index]: false
                                },
                                removeDevices: {
                                    ...prevState.removeDevices,
                                        [index]: false
                                }})
                            );
                        })
                        .catch((e) => console.log(e));
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

    handleClick = (id, index, me = 0) => { 

        if (!this.state.loadingDevices[index]) {
            this.setState((prevState) => ({
                ...prevState,
                loadingDevices: {
                    ...prevState.loadingDevices,
                        [index]: true
                },
                successDevices: {
                    ...prevState.successDevices,
                        [index]: false
                }})
            );
            if(me == 1){
                localStorage.removeItem("user");
                localStorage.removeItem("user_info");
                window.location.reload();
            }
          }
       
        User.DeconnectDevice(localStorage.getItem('user'), id)
            .then((data) => { 
                console.log(data);
                this.setState((prevState) => ({
                    ...prevState,
                    loadingDevices: {
                        ...prevState.loadingDevices,
                            [index]: false
                    },
                    successDevices: {
                        ...prevState.successDevices,
                            [index]: true
                    },
                    removeDevices: {
                        ...prevState.removeDevices,
                            [index]: true
                    }})
                );
            })
            .catch((e) => console.log(e));
    }
    
    render(){
        
        const {classes, container } = this.props;
        const { devices, loadingDevices, successDevices, removeDevices } = this.state; 


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
                        <b>Dispositivi su cui hai eseguito l'accesso</b>
                    </Typography>
                    <Typography component="body" color="textSecondary" style={{marginBottom: 10}}>
                        Sei attualmente collegato al tuo Account Promoto su questi dispositivi.
                    </Typography>

                    <div style={{marginTop: 35, maxWidth: 'auto'}}>

                        <div >
                            <Grid container spacing={3}>
                                {
                                    Object.values(devices).map((val, index) => {
                                       
                                        const userAgent = window.navigator.userAgent.toLowerCase();
                                        var MobileDetect = require('mobile-detect'),
                                        md= new MobileDetect(val.UserInfo);

                                        var os = "", style="";
                                        /**
                                         * User devices
                                         */
                                        if(md.os() == "AndroidOS"){
                                            os = "Android";
                                            style = {backgroundPosition: '0px -730px'};
                                        }else if(md.os() == "BlackBerryOS"){
                                            os = "BlackBerry";
                                            style = {backgroundPosition: '0 -436px'};
                                        }else if(md.os() == "PalmOS"){
                                            os = "Palms";
                                            style = {backgroundPosition: '0 -655px'};
                                        }else if(md.os() == "SymbianOS"){
                                            os = "Symbian";
                                            style = {backgroundPosition: '0 -655px'};
                                        }else if(md.os() == "WindowsMobileOS"){
                                            os = "Windows Mobile";
                                            style = {backgroundPosition: '0 -655px'};
                                        }else if(md.os() == "WindowsPhoneOS"){
                                            os = "Windows Phone";
                                            style = {backgroundPosition: '0 -655px'};
                                        }else if(md.os() == "iOS"){
                                            os = "iOS";
                                            style = {backgroundPosition: '0 -1091px'};
                                        }else if(md.os() == "iPadOS"){
                                            os = "iPad";
                                            style = {backgroundPosition: '0 -364px'};
                                        }else if(md.os() == "MeeGoOS"){
                                            os = "MeeGo";
                                            style = {backgroundPosition: '0 -655px'};
                                        }else if(md.os() == "MaemoOS"){
                                            os = "Maemo";
                                            style = {backgroundPosition: '0 -655px'};
                                        }else if(md.os() == "JavaOS"){
                                            os = "JavaOS";
                                            style = {backgroundPosition: '0 -655px'};
                                        }else if(md.os() == "webOS"){
                                            os = "WebOS";
                                            style = {backgroundPosition: '0 -655px'};
                                        }else if(md.os() == "badaOS"){
                                            os = "Bada";
                                            style = {backgroundPosition: '0 -655px'};
                                        }else if(md.os() == "BREWOS"){
                                            os = "BREWOS";
                                            style = {backgroundPosition: '0 -655px'};
                                        }else{
                                            os = "";
                                            style = {};
                                            if(val.UserDevice.toLowerCase().indexOf("windows") == 0){
                                                style = {backgroundPosition: '0 -220px'};
                                            }else if(val.UserDevice.toLowerCase().indexOf("linux") == 0){
                                                style = {backgroundPosition: '0 -800px'};
                                            }else if(val.UserDevice.toLowerCase().indexOf("mac") == 0){
                                                style = {backgroundPosition: '0 -507px'};
                                            }else if(val.UserDevice.toLowerCase().indexOf("android") == 0){
                                                style = {backgroundPosition: '0px -730px'};
                                            }else if(val.UserDevice.toLowerCase().indexOf("ios") == 0){
                                                style = {backgroundPosition: '0 -1091px'};
                                            }else if(val.UserDevice.toLowerCase().indexOf("chrome") == 0){
                                                style = {backgroundPosition: '0 -75px'};
                                            }else{
                                                style = {backgroundPosition: '0 -950px'};
                                            } 
                                        }

                                        var aDay = 24*60*60, datum = Date.parse(val.UserStartSession);
                                        
                                        const buttonClassname = clsx({
                                            [classes.buttonSuccess]: successDevices[index],
                                        });


                                        
                                        return (
                                            <Grid item md={3} xs={12} key={index} className={removeDevices[index] ? classes.hiddenCard : ""}>
                                                <Card variant="outlined">
                                                    <CardActionArea>
                                                        <CardContent>
                                                            <Typography gutterBottom component="div" className={classes.mediaImage} style={style}></Typography>
                                                            <Typography gutterBottom variant="h5" component="h2" style={{marginBottom: 0}}>
                                                                {val.UserDevice}
                                                            </Typography>
                                                            <Typography  color="textSecondary" component="p">
                                                                {md.userAgent() == null ? val.UserInfo.substr(0, val.UserInfo.indexOf('/')) : md.userAgent() + " on "+ os}
                                                            </Typography>
                                                            <Typography variant="body2" color="textSecondary" component="p">
                                                                {val.city ? val.city + " " + val.regionName + ", " + val.country : "Attendi..."} <br />
                                                                {
                                                                    val.UserInfo.toLowerCase() == userAgent ? (
                                                                        <span>
                                                                            <CheckCircleRoundedIcon style={{color: '#1a73e8', fontSize: '1rem', position: 'relative', top: '3px'}} /> Questo dispositivo
                                                                        </span>
                                                                    ) : (
                                                                        <Typography variant="body2" color="textSecondary" component="p">
                                                                            {time_ago(new Date((datum)-aDay))} <br />
                                                                        </Typography>
                                                                    )
                                                                }
                                                            </Typography>
                                                        </CardContent>
                                                    </CardActionArea>
                                                    {
                                                        val.UserInfo.toLowerCase() == userAgent ? (
                                                            <CardActions>
                                                                <Button size="small" fullWidth={true} color="primary" disabled={loadingDevices[index]} className={buttonClassname} onClick={() =>this.handleClick(val.UserDeviceID, index, 1)}>
                                                                    {loadingDevices[index] ? <CircularProgress size={24} className={classes.buttonProgress} /> : "Disconnetti"} <div style={{padding: 13}} />
                                                                </Button>
                                                            </CardActions>
                                                        ) : (
                                                            <CardActions>
                                                                <Button size="small" fullWidth={true} color="primary" disabled={loadingDevices[index]} className={buttonClassname} onClick={() =>this.handleClick(val.UserDeviceID, index)}>
                                                                    {loadingDevices[index] ? <CircularProgress size={24} className={classes.buttonProgress} /> : "Disconnetti"} <div style={{padding: 13}} />
                                                                </Button>
                                                            </CardActions>
                                                        )
                                                    }
                                                </Card>
                                            </Grid>
                                        );
                                    })
                                }
                               
                            </Grid>
                                
                        </div>
                        
                    </div>


                </main>
            </div>
        );
    }

}


Devices.propTypes = {
    container: PropTypes.instanceOf(typeof Element === 'undefined' ? Object : Element),
    inputRef: PropTypes.func.isRequired,

};

export default withStyles(styles)(Devices);