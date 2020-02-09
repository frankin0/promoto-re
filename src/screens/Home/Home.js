import { Container, CssBaseline, Grid, Link, Paper, Typography, Input } from '@material-ui/core';
import grey from '@material-ui/core/colors/grey';
import red from '@material-ui/core/colors/red';
import { createMuiTheme } from '@material-ui/core/styles';
import withStyles from '@material-ui/core/styles/withStyles';
import { ThemeProvider } from '@material-ui/styles';
import React, { Component } from 'react';
import video from '../../assets/videos/video1.mp4';
import CardEvents from '../../components/CardEvents/CardEvents';
import NavBar from '../../components/NavBar/NavBar';
import PanelLogin from '../../screens/Auth/Auth';
import GetAllEvents from '../../services/Events/GetAllEvents';
import User from '../../services/User/User';


const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    main: {
        width: "100%",
    },
    title:{
        fontWeight: 200,
    },
    subtitle: {
        fontWeight: 600,
    },
    paper:{
        border: 'none',
        boxShadow: 'none',
        marginTop: 40,
        backgroundColor: 'transparent'
    },
    paper2:{
        border: 'none',
        boxShadow: 'none',
        marginTop: 40,
        backgroundColor: 'transparent',
        position: 'relative'
    },
    searchNav:{
        width: '100%',
        minHeight: '4rem',
        border: 'none',
        backgroundColor: '#ffff',
        boxShadow: '0px 0px 17px 0px rgba(0, 0, 0, .05)',
        borderRadius: 50,
        padding: '10px 40px',
        fontSize: '1.1rem',
        outline: 'none',
        paddingLeft: 65
    },
    iconSearch:{
        position: 'absolute',
        top: 22,
        fontSize: '1.4rem',
        left: 25
    },
    catname:{
        fontWeight: 'initial',
    },
    cardMediaVideo:{
        width: '100%',
        height: 480,
        position: 'relative',
        display: 'block',
        borderRadius: 20,
        overflow: 'hidden'
    },
    media:{
        width: '100%',
        height: '100%'
    }
});

class Home extends Component{

    constructor(props){
        super(props);

        this.state = {
            openLogin: false,
            allEvents: [],
            user: {}
        }
    }

    componentDidMount(){

        GetAllEvents.GetAllEvents(10000, 0)
        .then((event) => {
            console.log(event);
            this.setState({
                allEvents: event.data.lists
            });
        })
        .catch((e) => console.error(e));


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

    panelLogin = (e) =>{
        this.setState({
            openLogin: e
        });

        if(e){
            document.body.classList.add("no-overflow");
        }else{
            document.body.classList.remove("no-overflow");
        }
        
    }

    render(){
        const {classes } = this.props;

        
        
        return (
            <div className={classes.root}>
                <NavBar login={this.panelLogin} />
                <PanelLogin open={this.state.openLogin} closed={this.panelLogin} />

                <CssBaseline />
                <Container fixed>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Paper className={classes.paper}>
                                <Typography variant="h4" component="h1" color="textSecondary" className={classes.title}>Welcome Frankin0,</Typography>
                                <Typography variant="h4" component="h2" color="textSecondary" className={classes.subtitle}>Find Your Event</Typography>
                            </Paper>
                        </Grid>

                        <Grid item xs={12}>
                            <Paper className={classes.paper2}>
                                <i className={`${"icofont-search"} ${classes.iconSearch}`}></i>
                                <input type="text" className={[classes.searchNav, "loadThemeProvider"].join(" ")} placeholder="Cerca Eventi, Locali, Personaggi pubblici" />
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>

                <Container fixed>
                    <Grid container spacing={3} style={{marginTop: 60}}>
                        <Grid item xs={12}>
                            <Paper className={classes.cardMediaVideo}>
                                <video autoPlay className={classes.media} controlsList="nodownload" muted crossOrigin="anonymous" loop playsInline preload="metadata" style={{objectFit: "cover"}}>
                                    <source id="mp4" src={video} type="video/mp4" />
                                </video>
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>

                <Container fixed>
                    <Grid container spacing={3} style={{marginTop: 60,position: 'relative'}}>
                        <Grid item xs={12}>
                            <Typography variant="body1" component="div" className={classes.catname} color="textSecondary">I più popolari</Typography>
                        </Grid>

                        {/*<Grid item xs={12}>
                            <CategoryList type={"vetrina"} />
                        </Grid>*/}

                        
                        {    [1, 2, 3, 4].map((index) =>{

                                return (
                                    <Grid item lg={3} md={4} sm={6} spacing={3} xs={12} style={{padding: 0}}>
                                        <CardEvents key={index} type={"vetrina_"} style={{width: '100%', height: 200}} />
                                    </Grid>
                                )
                            })
                        }

                        <Grid item xs={12}>
                            <Typography variant="body1" component="div" className={classes.catname} color="textSecondary">
                                <Link href="#/" style={{color: 'red', fontWeight: 600}}>Mostra Altro</Link>    
                            </Typography>
                        </Grid>
                    </Grid>
                </Container>

                <Container fixed>
                    <Grid container spacing={3} style={{marginTop: 60,position: 'relative'}}>
                        <Grid item xs={12}>
                            <Typography variant="body1" component="div" className={classes.catname} color="textSecondary">Nei prossimi giorni in Puglia</Typography>
                        </Grid>

                        {/*<Grid item xs={12}>
                            <CategoryList style={{height: 150}} />
                        </Grid>*/}

                        
                        {[1, 2, 3, 4].map((index) =>{

                            return (
                                <Grid item lg={3} md={4} sm={6} spacing={3} xs={12} style={{padding: 0}}>
                                    <CardEvents key={index} type={"vetrina_"} style={{width: '100%', height: 200}} />
                                </Grid>
                            )
                        })}
                        
                        <Grid item xs={12}>
                            <Typography variant="body1" component="div" className={classes.catname} color="textSecondary">
                                <Link href="#/" style={{color: 'red', fontWeight: 600}}>Mostra Altro</Link>    
                            </Typography>
                        </Grid>
                    </Grid>
                </Container>

                <Container fixed>
                    <Grid container spacing={3} style={{marginTop: 30}}>
                        <Grid item xs={12}>
                            <Typography variant="body1" component="div" className={classes.catname} color="textSecondary">Altro</Typography>
                        </Grid>
                        {
                            Object.values(this.state.allEvents).map((item, index) =>{
                                return (
                                    <Grid item key={index} md={4} xs={12}>
                                        <CardEvents key={index} id={item.ticketPublicID} type={"default"} copertine={item.ticketCopertine} title={item.ticketSimple} dateStart={item.ticketDateStart} ticket={item.ticket} style={{height: 400,  width: '100%', marginRight: 10}} />
                                    </Grid>
                                )
                            })
                        }
                    </Grid>
                </Container>
            </div>
        )
    }

}

export default withStyles(styles)(Home);