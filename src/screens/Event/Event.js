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
    }
});

class Event extends Component{

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

                </div>
            </ThemeProvider>
        )
    }

}

export default withStyles(styles)(Event);