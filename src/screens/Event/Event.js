import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles'; 
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import grey from '@material-ui/core/colors/grey';
import red from '@material-ui/core/colors/red';
import NavBar from '../../components/NavBar/NavBar';
import { Container, Grid, CssBaseline, Typography, Paper, Avatar,Fab, Chip, Box, Link, Icon, Tooltip } from '@material-ui/core';
import PanelLogin from '../../screens/Auth/Auth';
import MyLocationTwoTone from '@material-ui/icons/MyLocationTwoTone';
import CalendarTodayOutlined from '@material-ui/icons/CalendarTodayOutlined';
import TimeOutlined from '@material-ui/icons/TimerOutlined';
import { LightgalleryProvider, LightgalleryItem } from "react-lightgallery";
import "lightgallery.js/dist/css/lightgallery.css";
import Maps from '../../components/Google/Maps';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faFacebookMessenger } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import Footer from '../../components/Footer/Footer';
import CategoryList from '../../components/CategoryList/CategoryList';


const theme = createMuiTheme({
    palette: {
        type: 'light',
        primary: { 
            main: grey[600]
        },
        secondary: { main: red[400] }
    },
    typography: {
        fontFamily: [
            '"Montserrat"', 'sans-serif'
        ].join(",")
    }
});


const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    main: {
        width: "100%",
    },
    title:{
        fontWeight: 200,
        color: '#404a52'
    },
    subtitle: {
        fontWeight: 600,
        color: '#404a52'
    },
    paper:{
        border: 'none',
        boxShadow: 'none',
        marginTop: 40,
        backgroundColor: 'transparent'
    },
    ltp:{
        margin: '10px 0' ,
        fontSize: '.8rem',
        color: '#4f4f4f'
    },
    ltpText:{
        position: 'relative',
        top: -6
    },
    avatar:{
        marginRight: 5
    },
    avatarlpb:{
        marginRight: 5,            
        fontSize: '.8rem',
        color: '#000',
        fontWeight: 500
    },
    button:{
        textTransform: 'initial',
        padding: '0 26px',
        marginLeft: 30,
        boxShadow: 'none',
        '&:hover':{
            boxShadow: 'none'
        }
    },
    chips:{
        marginRight: 10
    },
    iconBrands:{
        fontSize: '1rem'
    }
});

class Event extends Component{

    constructor(props){
        super(props);

        this.state = {
            openLogin: false,
            id: 0,
            viewport: {
                width: 400,
                height: 400,
                latitude: 37.7577,
                longitude: -122.4376,
                zoom: 8
            }
        }
    }

    componentDidMount(){
        window.scrollTo(0,0 );

        this.setState({
            id: this.props.match.params.id
        });
    }

    componentDidUpdate(){
        if(this.props.match.params.id !== this.state.id){
            window.scrollTo(0,0 );
        }
    }

    panelLogin = (e) =>{
        this.setState({
            openLogin: e
        });
        
    }

    render(){
        const {classes } = this.props;

        const PhotoItem = ({ image, group }) => {
            const imageonerror = (ev) => {
                ev.target.src = "https://espoweb.it/demo/imgCreate/?txt=404&size=40&w=950&h=600";
            }

            return(
                <div style={{ maxWidth: "250px", width: "200px", padding: "5px" }} className={"galleryItem"}>
                    <LightgalleryItem group={group} src={image}>
                        <div className="react_lightgallery_image" style={{backgroundImage: 'url('+ image +')'}} onError={imageonerror} ></div>
                        <img src={image} onError={imageonerror} id="ev" style={{ width: "100%", display: 'none'}} />
                    </LightgalleryItem>
                </div>
            );
        };

        const GROUP2 = [
            "https://espoweb.it/demo/imgCreate/?txt=404&size=40&w=1440&h=1024",
            "https://espoweb.it/demo/imgCreate/?txt=404&size=40&w=1440&h=1024",
            "https://espoweb.it/demo/imgCreate/?txt=404&size=40&w=1440&h=1024",
            "https://espoweb.it/demo/imgCreate/?txt=404&size=40&w=1440&h=1024",
        ];

        var imageG = 0;
        /*if(this.state.imageG === 0){
            imageG = 1;
        }else{
            imageG = this.state.imageG;
        }*/

        const center = { lat: 0, lng: 0 };
        

        return (
            <ThemeProvider theme={theme}>
                <div className={classes.root}>
                    <NavBar login={this.panelLogin} />
                    <PanelLogin open={this.state.openLogin} closed={this.panelLogin} />

                    <CssBaseline />

                    <Container fixed>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Paper className={classes.paper}>
                                    <Typography variant="h4" component="h1" className={classes.subtitle}><MyLocationTwoTone style={{marginRight: 10}} />Nome Evento</Typography>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Container>

                    {
                        /**
                         * Gallery Desktop
                         */
                    }

                    <Container fixed>
                        <Grid container spacing={3}>
                            <Grid item xs={12} className="gallery">
                                <LightgalleryProvider
                                    lightgallerySettings={{
                                        mode: 'lg-fade',
                                        cssEasing : 'cubic-bezier(0.25, 0, 0.25, 1)',
                                        closable: true,
                                        escKey: true,
                                        keyPress: true,
                                        controls: true,
                                        showAfterLoad: true,
                                        download: false,
                                    }}
                                    onAfterSlide={(e) => {

                                        //console.log("onAfterSlide", e);
                                    }}
                                >
                                    <div style={{ display: "flex", alignItems: "center" }} className={"max-count_ nBox" + imageG}>
                                        {GROUP2.map((p, idx) => {
                                            if(p !== null ){
                                                return(
                                                    <PhotoItem key={idx} image={p} onError={this.imageonerror} group="group2" />
                                                )
                                            }
                                        })}
                                    </div>
                                </LightgalleryProvider>
                            </Grid>
                        </Grid>
                    </Container>

                    <Container fixed>
                        <Grid container spacing={3}>
                            <Grid item xs={12} >
                                <Typography variant="h6" component="h2" className={classes.subtitle}>UserName</Typography>
                            </Grid>
                            <Grid item xs={12} md={6} >
                                <Typography variant="body1" component="div" className={classes.ltp}><MyLocationTwoTone style={{marginRight: 10}} /> <span className={classes.ltpText}>Rome, Italy</span></Typography>
                                <Typography variant="body1" component="div" className={classes.ltp}><CalendarTodayOutlined style={{marginRight: 10}} /> <span className={classes.ltpText}>15 Sept 2019</span> <TimeOutlined style={{marginRight: 5, marginLeft: 10}} /> <span className={classes.ltpText}>19:22 - 22:00</span> </Typography>
                            </Grid>
                            <Grid item md={6} xs={12} >
                                <Grid container justify="center" alignItems="center">
                                    <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" className={classes.avatar} />
                                    <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" className={classes.avatar} />
                                    <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" className={classes.avatar} />
                                    <Avatar className={classes.avatarlpb}>9+</Avatar>
                                    <Fab variant="contained" color="secondary" className={classes.button}>Get Tickets</Fab>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} >
                                <Typography variant="h6" component="div" className={classes.ltpText} style={{fontWeight: 600}}>Descrizione</Typography>
                                <Typography variant="body1" component="p" className={classes.ltpText}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                </Typography>
                            </Grid>
                            <Grid item xs={12} >
                                <Typography variant="h6" component="div" className={classes.ltpText} style={{fontWeight: 600}}>Tags e Artisti</Typography>
                                <Chip size="small" label="Eventi a bari" className={classes.chips} />
                                <Chip
                                    size="small"
                                    avatar={<Avatar alt="Natacha" src="https://material-ui.com/static/images/avatar/1.jpg" />}
                                    className={classes.chips}
                                    label="Jon Chena"
                                />
                            </Grid>
                            <Grid item xs={12} >
                                <Typography variant="h6" component="div" className={classes.ltpText} style={{fontWeight: 600}}>Condividi con gli amici</Typography>
                                <Box textAlign="center" style={{marginTop: 30}}>
                                    <Link href="#" style={{margin: 10}} className={classes.iconBrands}>
                                        <FontAwesomeIcon icon={faFacebookF} />
                                    </Link>
                                    <Link href="#" style={{margin: 10}} className={classes.iconBrands}>
                                        <FontAwesomeIcon icon={faFacebookMessenger} />
                                    </Link>
                                    <Link href="#" style={{margin: 10}} className={classes.iconBrands}>
                                        <FontAwesomeIcon icon={faEnvelope} />
                                    </Link>
                                </Box>
                            </Grid>
                            <Grid item xs={12} >
                                <Typography variant="h6" component="div" className={classes.ltpText} style={{fontWeight: 600}}>Località</Typography>
                                <Maps />

                                <Typography variant="subtitle1" component="div" className={classes.ltpText} style={{fontWeight: 600, textAlign: 'center', marginTop: 35}}>Puoi trovarci in </Typography>
                                <Typography variant="body1" component="div" className={classes.ltpText} style={{ textAlign: 'center'}}>Viale delle nazioni N° 123 Bari, Italia</Typography>

                                <Box textAlign="center" style={{marginTop: 30}}>
                                    <Tooltip title="In Auto" placement="top">
                                        <Link href="#" style={{margin: 10}}>
                                            <Icon color="primary">directions_car</Icon>
                                        </Link>
                                    </Tooltip>
                                    <Tooltip title="In Bici" placement="top">
                                        <Link href="#" style={{margin: 10}}>
                                            <Icon color="primary">directions_bike</Icon>
                                        </Link>
                                    </Tooltip>
                                    
                                    <Tooltip title="Mezzi Pubblici" placement="top">
                                        <Link href="#" style={{margin: 10}}>
                                            <Icon color="primary">directions_bus</Icon>
                                        </Link>
                                    </Tooltip>
                                    
                                    <Tooltip title="A piedi" placement="top">
                                        <Link href="#" style={{margin: 10}}>
                                            <Icon color="primary">directions_walk</Icon>
                                        </Link>
                                    </Tooltip>
                                </Box>
                                
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="h6" component="div" className={classes.ltpText} style={{fontWeight: 600, marginBottom: 20}}>I più ricercati</Typography>
                                <div style={{position: 'relative'}}>
                                    <CategoryList type={"vetrina"} style={{borderRadius: 6}} />
                                </div>
                            </Grid>
                        </Grid>

                    </Container>

                </div>
                <Footer />
            </ThemeProvider>
        )
    }

}

export default withStyles(styles)(Event);