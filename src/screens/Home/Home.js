import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles'; 
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import grey from '@material-ui/core/colors/grey';
import red from '@material-ui/core/colors/red';
import NavBar from '../../components/NavBar/NavBar';
import { Container, Grid, CssBaseline, Typography, Paper } from '@material-ui/core';
import CardEvents from '../../components/CardEvents/CardEvents';
import video from '../../assets/videos/video1.mp4';
import CategoryList from '../../components/CategoryList/CategoryList';
import PanelLogin from '../../screens/Auth/Auth';

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
        color: '#404a52',
        outline: 'none',
        paddingLeft: 65
    },
    iconSearch:{
        position: 'absolute',
        color: '#dbdbdb',
        top: 22,
        fontSize: '1.4rem',
        left: 25
    },
    catname:{
        fontWeight: 700
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
            openLogin: false
        }
    }

    panelLogin = (e) =>{
        this.setState({
            openLogin: e
        });
    }

    render(){
        const {classes } = this.props;
        
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
                                    <Typography variant="h4" component="h1" className={classes.title}>Welcome Frankin0,</Typography>
                                    <Typography variant="h4" component="h2" className={classes.subtitle}>Find Your Event</Typography>
                                </Paper>
                            </Grid>

                            <Grid item xs={12}>
                                <Paper className={classes.paper2}>
                                    <i className={`${"icofont-search"} ${classes.iconSearch}`}></i>
                                    <input type="text" className={classes.searchNav} placeholder="Cerca Eventi, Locali, Personaggi pubblici" />
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
                        <Grid container spacing={3} style={{marginTop: 60,position: 'relative',display: 'block'}}>
                            <Grid item xs={12}>
                                <Typography variant="body1" component="div" className={classes.catname} color="secondary">I più popolari</Typography>
                            </Grid>

                            <Grid item xs={12}>
                                <CategoryList type={"vetrina"} />
                            </Grid>

                            {/*
                                [1, 2, 3, 4].map((index) =>{

                                    return (
                                        <Grid item md={3} xs={12}>
                                            <CardEvents key={index} type={"vetrina"} />
                                        </Grid>
                                    )
                                })
                            */}
                        </Grid>
                    </Container>

                    <Container fixed>
                    <Grid container spacing={3} style={{marginTop: 60,position: 'relative',display: 'block'}}>
                            <Grid item xs={12}>
                                <Typography variant="body1" component="div" className={classes.catname} color="secondary">Nei prossimi giorni in Puglia</Typography>
                            </Grid>

                            <Grid item xs={12}>
                                <CategoryList style={{height: 250}} />
                            </Grid>

                            {/*
                                [1, 2, 3, 4, 5, 6].map((index) =>{

                                    return (
                                        <Grid item md={2}>
                                            <CardEvents key={index} height={250} />
                                        </Grid>
                                    )
                                })
                            */}
                        </Grid>
                    </Container>

                    <Container fixed>
                        <Grid container spacing={3} style={{marginTop: 30}}>
                            <Grid item xs={12}>
                                <Typography variant="body1" component="div" className={classes.catname} color="secondary">Altro</Typography>
                            </Grid>
                            {
                                [1, 2, 3, 4, 5, 6,7,8,9,10,11,12,13,14,15,16,17,18].map((index) =>{

                                    return (
                                        <Grid item key={index} md={4} xs={12}>
                                            <CardEvents key={index} type={"default"} style={{height: 300,  width: '100%', marginRight: 10}} />
                                        </Grid>
                                    )
                                })
                            }
                        </Grid>
                    </Container>
                </div>
            </ThemeProvider>
        )
    }

}

export default withStyles(styles)(Home);