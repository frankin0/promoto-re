import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles'; 
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import grey from '@material-ui/core/colors/grey';
import red from '@material-ui/core/colors/red';
import NavBar from '../../components/NavBar/NavBar';
import { Container, Grid, CssBaseline, Typography, Paper } from '@material-ui/core';


const theme = createMuiTheme({
    palette: {
        type: 'light',
        primary: { main: grey[600] },
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
    }
});

class Home extends Component{

    constructor(props){
        super(props);

        this.state = {

        }
    }

    render(){
        const {classes } = this.props;

        return (
            <ThemeProvider theme={theme}>
                <div className={classes.root}>
                    <NavBar />

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
                </div>
            </ThemeProvider>
        )
    }

}

export default withStyles(styles)(Home);