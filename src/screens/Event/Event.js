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
import CardEvents from '../../components/CardEvents/CardEvents';
import ThisEvent from '../../services/Events/GetEvent';
import GetEventLists from '../../services/Events/GetAllEvents';
import {Configuration} from '../../constants/Configuration';
import GetAllTickets from '../../components/Dialogs/GetAllTickets';
import User from '../../services/User/User';



const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    main: {
        width: "100%",
    },
    title:{
        fontWeight: 200
    },
    subtitle: {
        fontWeight: 600
    },
    paper:{
        border: 'none',
        boxShadow: 'none',
        marginTop: 0,
        backgroundColor: 'transparent'
    },
    ltp:{
        margin: '10px 0' ,
        fontSize: '.8rem',
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
            },
            event: {},
            gallery: Array(),
            mostEvents: [],
            ticketShow: false,
            imageG: 0,
            user: {}
        }
    }

    componentDidMount(){
        window.scrollTo(0,0 );

        this.setState({
            id: this.props.match.params.id
        });

        ThisEvent.GetEvent(this.props.match.params.id)
            .then((data) => {
                this.setState({
                    event: data.data.event,
                });

                if( data.data.event.ticketCopertine){
                    this.setState({ 
                        gallery: this.state.gallery.concat([ data.data.event.ticketCopertine]),
                        imageG: this.state.imageG + 1
                    });

                }

                if(data.data.event.gallery.length > 0){
                    var n = 1;
                    data.data.event.gallery.forEach(element => {
                        console.log(element);
                        this.setState({ 
                            gallery: this.state.gallery.concat([
                                (element.GalleryImage.indexOf("http://") == 0 || element.GalleryImage.indexOf("https://") == 0 ? element.GalleryImage : Configuration.FILES + element.GalleryImage)
                            ]),
                            imageG: this.state.imageG + 1
                        });

                        n++;
                    });
                }
            })
            .catch((e) => {
                console.log(e);
            });

        GetEventLists.GetMostEvents(4, 0)
            .then(data => { 
                this.setState({
                    mostEvents: data.data.lists
                });
            })
            .catch(e => {
                console.log(e);
            });

        if(localStorage.getItem('user') !== null){
            User.postUser(localStorage.getItem('user'))
            .then((data) => { 
                
                if(typeof data.data.status === "object"){            
                    this.setState({
                        user: data.data.status
                    });
                    localStorage.setItem("user_info", JSON.stringify(data.data.status));
                }else{
                    localStorage.removeItem("user");
                    localStorage.removeItem("user_info");
                    //window.location.reload();
                }
            })
            .catch((e) => console.log(e));
        }
    }

    componentWillUnmount(){

    }

    componentDidUpdate(){
        if(this.props.match.params.id !== this.state.id){
            window.scrollTo(0,0 );
            //window.location.reload();
            this.setState({
                id: this.props.match.params.id,
                gallery: Array(),

            });
    
            ThisEvent.GetEvent(this.props.match.params.id)
                .then((data) => {
                    this.setState({
                        event: data.data.event,
                    });
    
                    if( data.data.event.ticketCopertine){
                        this.setState({ 
                            gallery: this.state.gallery.concat([ data.data.event.ticketCopertine])
                        });
                    }
    
                    if(data.data.event.gallery.length > 0){
                        var n = 1;
                        data.data.event.gallery.forEach(element => {
    
                            this.setState({ 
                                gallery: this.state.gallery.concat([
                                    (element.GalleryImage.indexOf("http://") == 0 || element.GalleryImage.indexOf("https://") == 0 ? element.GalleryImage : Configuration.FILES + element.GalleryImage)
                                ])
                            });
    
                            n++;
                        });
                    }
                })
                .catch((e) => {
                    console.log(e);
                });
    
            GetEventLists.GetMostEvents(4, 0)
                .then(data => { 
                    this.setState({
                        mostEvents: data.data.lists
                    });
                })
                .catch(e => {
                    console.log(e);
                });
        }
    }


    panelLogin = (e) =>{
        this.setState({
            openLogin: e
        });
        
    }

    handleModalTicketSow = () => {
        this.setState({
            ticketShow: true
        });
    }

    closeModal = () => {
        this.setState({
            ticketShow: false
        });
    }

    render(){
        const {classes } = this.props;
        const {event, gallery} = this.state;

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

        const GROUP2 = gallery;

        var imageG = 0;
        if(this.state.imageG === 0){
            imageG = 1;
        }else{
            imageG = this.state.imageG;
        }

        const center = { lat: 0, lng: 0 };
        const options = {'month': 'long', 'day': '2-digit', 'year' : 'numeric'};

        return (
            <React.Fragment>
                <div className={classes.root}>
                    <NavBar login={this.panelLogin} />
                    <PanelLogin open={this.state.openLogin} closed={this.panelLogin} />

                    <CssBaseline />

                    <Container fixed>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Paper className={classes.paper}>
                                    <Typography variant="h4" component="h1" color="textSecondary" className={classes.subtitle}><MyLocationTwoTone style={{marginRight: 10}} />{event.ticketSimple}</Typography>
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
                                <Typography variant="h6" component="h2"  color="textSecondary" className={classes.subtitle}>{event.Author ? event.Author.UserRealName && event.Author.UserRealSurname ? event.Author.UserRealName + " " + event.Author.UserRealSurname : event.Author.userName : "..."}</Typography>
                            </Grid>
                            <Grid item xs={12} md={6} > 
                                <Typography variant="body1" component="div"  color="textSecondary" className={classes.ltp}><MyLocationTwoTone style={{marginRight: 10}} /> <span className={classes.ltpText}>{event.ticketCountry ? event.ticketCountry : "..."} in {event.ticketLocation ? event.ticketLocation : "..."}</span></Typography>
                                <Typography variant="body1" component="div" color="textSecondary" className={classes.ltp}><CalendarTodayOutlined style={{marginRight: 10}} /> <span className={classes.ltpText}>{new Date(event.ticketDateStart).toLocaleString('it-IT', options)} - {new Date(event.ticketDateEnd).toLocaleString('it-IT', options)}</span> <TimeOutlined style={{marginRight: 5, marginLeft: 10}} /> <span className={classes.ltpText}>{event.ticketDateStart ? event.ticketDateStart.substr(11, 5) : "..."} - {event.ticketDateEnd ? event.ticketDateEnd.substr(11, 5) : "..."}</span> </Typography>
                            </Grid>
                            <Grid item md={6} xs={12} >
                                <Grid container justify="center" alignItems="center">
                                    <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" className={classes.avatar} />
                                    <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" className={classes.avatar} />
                                    <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" className={classes.avatar} />
                                    <Avatar className={classes.avatarlpb}>9+</Avatar>
                                    <Fab variant="contained" color="secondary" className={classes.button} onClick={ this.handleModalTicketSow}>Get Tickets</Fab>
                                    <GetAllTickets copertine={GROUP2[0]} title={event.ticketSimple} date={new Date(event.ticketDateStart).toLocaleString('it-IT', options) + " - " + new Date(event.ticketDateEnd).toLocaleString('it-IT', options)} show={this.state.ticketShow} closeModal={this.closeModal} />
                                </Grid>
                            </Grid>
                            <Grid item xs={12} >
                                <Typography variant="h6" component="div" color="textSecondary" className={classes.ltpText} style={{fontWeight: 600}}>Descrizione</Typography>
                                <Typography variant="body1" component="p" color="textSecondary" className={classes.ltpText} dangerouslySetInnerHTML={{ __html: event.ticketDesc ? event.ticketDesc : "..." }}></Typography>
                            </Grid>
                            <Grid item xs={12} >
                                <Typography variant="h6" component="div"  color="textSecondary" className={classes.ltpText} style={{fontWeight: 600}}>Tags e Artisti</Typography>
                                {/*<Chip size="small" label="Eventi a bari" className={classes.chips} />
                                <Chip
                                    size="small"
                                    avatar={<Avatar alt="Natacha" src="https://material-ui.com/static/images/avatar/1.jpg" />}
                                    className={classes.chips}
                                    label="Jon Chena"
                                    />*/}
                                {
                                    event.ticketTags ? 
                                        event.ticketTags.map(element => {
                                            if(element.tag) {
                                                return <Chip size="small" label={element.tag} className={classes.chips} />
                                            }else{
                                                return <Chip
                                                            size="small"
                                                            avatar={<Avatar alt={element.name} src={element.avatar} />}
                                                            className={classes.chips}
                                                            label={element.name}
                                                        />
                                            }
                                        })
                                    : "..."
                                }
                            </Grid>
                            <Grid item xs={12} >
                                <Typography variant="h6" component="div" color="textSecondary" className={classes.ltpText} style={{fontWeight: 600}}>Condividi con gli amici</Typography>
                                <Box textAlign="center" style={{marginTop: 30}}>
                                    <Link href="#" style={{margin: 10}} className={classes.iconBrands}>
                                        <FontAwesomeIcon  icon={faFacebookF} />
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
                                <Typography variant="h6" component="div" color="textSecondary" className={classes.ltpText} style={{fontWeight: 600}}>Località</Typography>
                                {
                                    event.ticketCountry ? <Maps label={Configuration.OFFICES[event.ticketOffice] + " " + event.ticketLocation} query={event.ticketCountry} /> : "Loading..."
                                }

                                <Typography variant="subtitle1" color="textSecondary" component="div" className={classes.ltpText} style={{fontWeight: 600, textAlign: 'center', marginTop: 35}}>Puoi trovarci in</Typography>
                                <Typography variant="body1" color="textSecondary" component="div" className={classes.ltpText} style={{ textAlign: 'center'}}>{event.ticketCountry} {Configuration.OFFICES_STRING[event.ticketOffice]} <strong>{event.ticketLocation}</strong></Typography>

                                <Box textAlign="center" style={{marginTop: 30}}>
                                    <Tooltip title="Calcola percorso in auto" placement="top">
                                        <Link href={"https://maps.google.com/?saddr=My+Location&daddr="+event.ticketCountry+"&driving"} target="_blank" style={{margin: 10}}>
                                            <Icon color="textSecondary">directions_car</Icon>
                                        </Link>
                                    </Tooltip>
                                    <Tooltip title="Calcola percorso in bici" placement="top">
                                        <Link href={"https://maps.google.com/?saddr=My+Location&daddr="+event.ticketCountry+"&dirflg=b&mode=bicycling"} target="_blank" style={{margin: 10}}>
                                            <Icon color="textSecondary">directions_bike</Icon>
                                        </Link>
                                    </Tooltip>
                                    
                                    <Tooltip title="Mezzi Pubblici" placement="top">
                                        <Link href={"https://maps.google.com/?saddr=My+Location&daddr="+event.ticketCountry+"&dirflg=r&mode=transit"} target="_blank" style={{margin: 10}}>
                                            <Icon color="textSecondary">directions_bus</Icon>
                                        </Link>
                                    </Tooltip>
                                    
                                    <Tooltip title="Calcola percorso a piedi" placement="top">
                                        <Link href={"https://maps.google.com/?saddr=My+Location&daddr="+event.ticketCountry+"&dirflg=w&mode=walk"} target="_blank" style={{margin: 10}}>
                                            <Icon color="textSecondary">directions_walk</Icon>
                                        </Link>
                                    </Tooltip>
                                </Box>
                                
                            </Grid>
                            <Grid item  xs={12}>
                                <Grid container xs={12}>
                                    <Grid item xs={12}>
                                        <Typography variant="h6" color="textSecondary" component="div" className={classes.ltpText} style={{fontWeight: 600, marginBottom: 20}}>I più ricercati</Typography>
                                    </Grid>
                                        
                                        { this.state.mostEvents ? 
                                            Object.values(this.state.mostEvents).map((item, index) => {
                                                return (
                                                    <Grid item lg={3} md={4} sm={6} spacing={3} xs={12}>
                                                        <CardEvents key={index} id={item.ticketPublicID} type={"default"} copertine={item.ticketCopertine} title={item.ticketSimple} dateStart={item.ticketDateStart} style={{width: '100%', height: 200}} />
                                                    </Grid>
                                                );
                                            }) : ""
                                        }
                                    {/*<div style={{position: 'relative'}}>
                                        <CategoryList type={"vetrina"} style={{borderRadius: 6}} />
                                    </div>*/}
                                </Grid>
                            </Grid>
                            
                        </Grid>

                    </Container>

                </div>
                <Footer />
            </React.Fragment>
        )
    }

}

export default withStyles(styles)(Event);