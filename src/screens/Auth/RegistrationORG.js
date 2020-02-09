import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles'; 
import { createMuiTheme, makeStyles, fade } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';
import red from '@material-ui/core/colors/red';
import { Container, Pape, Grid, Typography, AppBar, Toolbar, Button, FormControlLabel, Checkbox,TextField, Link, List, ListItem, ListItemText, ListItemIcon } from '@material-ui/core';
import CheckRounded from '@material-ui/icons/CheckRounded';

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

const useStylesReddit = makeStyles(theme => ({
    root: {
      border: '1px solid #e2e2e1',
      overflow: 'hidden',
      borderRadius: 4,
      backgroundColor: '#fcfcfb',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      '&:hover': {
        backgroundColor: '#fff',
      },
      '&$focused': {
        backgroundColor: '#fff',
        boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
        borderColor: theme.palette.primary.main,
      },
    },
    focused: {},
  }));

function RedditTextField(props) {
    const classes = useStylesReddit();
  
    return <TextField InputProps={{ classes, disableUnderline: true }} {...props} />;
}

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    main: {
        width: "100%",
    },
    boxL: {
        position: 'fixed',
        overflow: 'auto',
        right: 0,
        maxWidth: 'calc(100% - 27.5em)',
        width: '55em',
        background: '#ffffff',
        height: '100%',
        top: 0,
        margin: 0,
        zIndex: 100,
        transition: 'all 0.5s cubic-bezier(0.77, 0, 0.175, 1)',
        boxShadow: '0 0 12px 0 rgba(0,0,0,0.1), 0 10px 30px 0 rgba(0,0,0,0.2)',
        flexGrow: 1,
        transform: 'translateX(110%)'
    },
    boxLOpened: {
        position: 'fixed',
        overflow: 'auto',
        right: 0,
        maxWidth: 'calc(100% - 27.5em)',
        width: '55em',
        background: '#ffffff',
        height: '100%',
        top: 0,
        margin: 0,
        zIndex: 100,
        transition: 'all 0.5s cubic-bezier(0.77, 0, 0.175, 1)',
        boxShadow: '0 0 12px 0 rgba(0,0,0,0.1), 0 10px 30px 0 rgba(0,0,0,0.2)',
        flexGrow: 1,
        transform: 'translateX(0%)'
    },
    expandPanel: {
        maxWidth: 'calc(100% - 130px)',
        width: '100%'
    },
    title: {
        flexGrow: 1,
        fontWeight: 600,
        marginBottom: 10
    },
    Button:{
        float: 'right',
        marginLeft: 10
    },
    navBarBox:{
        boxShadow: 'none',
        borderBottom: '1px solid #e8ebed'
    },
    BottomNav: {
        borderTop: '1px solid #e8ebed',
        borderBottom: 'none',
        textAlign: 'left'
    },
    lineButtons: {
        position: 'absolute',
        right: 10,
        [theme.breakpoints.down('sm')]: {
            display: 'none'
        }
    },
    textCenter:{
        textAlign: 'center',
        marginTop: 50
    },
    boxSpacing: {
        marginTop: 30
    },
    fieldText:{
        width: '100%',
        marginBottom: 10
    },
    ButtonBng: {
        marginTop: 0,
        height: 57,
    },
    buttonLarge:{
        height: "60px",
        minWidth: "170px",
        marginBottom: 30
    },
    lineBox:{
        textAlign: 'left',
    },
    mSize:{
        transform: 'scale(.7)',
        userSelect: 'none'
    },
    link:{
        float: 'right',
        marginTop: 10
    }, 
    minW: {
        [theme.breakpoints.up('sm')]: {
            width: 550
        }
    }    
});

class RegistrationORG extends Component{

    constructor(props){
        super(props);

        this.state = {
            email: '',
            password: '',
            confermeEmail: '',
            fiscalCode: '',
            check: false,
            expandPanel: false,
            accept: false,
        };
    }

    componentDidUpdate(){
        console.log(this.props.open);
    }

    handleChange = e =>{
        var name = e.target.name;
        var value = e.target.value;

        this.setState({
            [name]: value
        });
    }

    rememberMe = () =>{
        this.setState({
            remember: !this.state.remember
        });
    }

    closePanel = () =>{
        this.props.closed(false);
    }
    
    expandPanel = () => {
        this.setState({
            expandPanel: !this.state.expandPanel
        });
    }

    accept = () => {
        this.setState({
            accept: !this.state.accept
        });
    }

    render(){
        const { classes, className } = this.props;
        const { email, password, confermeEmail, accept, fiscalCode } = this.state;

        return (
            <div>
                <Container className={[className, classes.minW].join(' ')}>
                    <Grid container  direction="row"  justify="center"  alignItems="center" spacing={3} style={{ minHeight: 'calc(100vh - 118px)'}}>
                        <Grid item xs={12}>
                            <Typography variant="body1" gutterBottom className={classes.textCenter}>
                                <Typography variant="h2" component="div" color="textSecondary" className={classes.title}>Promoto</Typography>
                                <Typography variant="h6" component="div" color="textSecondary" style={{fontWeight: 100}}>Scopri i vantaggi con l'account Pro</Typography>

                                <Typography component="div" gutterBottom className={classes.boxSpacing}>

                                    <RedditTextField
                                        label="Email"
                                        className={classes.margin}
                                        onChange={this.handleChange}
                                        className={classes.fieldText}
                                        defaultValue="react-reddit"
                                        variant="filled"
                                        type="text"
                                        value={email}
                                        name="username"
                                        id="reddit-input"
                                    />
                                    <RedditTextField
                                        label="Password"
                                        className={classes.margin}
                                        onChange={this.handleChange}
                                        className={classes.fieldText}
                                        defaultValue="react-reddit"
                                        type="password"
                                        variant="filled"
                                        value={password}
                                        name="password"
                                        id="reddit-input"
                                    />
                                    <RedditTextField
                                        label="Conferma Password"
                                        className={classes.margin}
                                        onChange={this.handleChange}
                                        className={classes.fieldText}
                                        defaultValue="react-reddit"
                                        type="password"
                                        variant="filled"
                                        value={confermeEmail}
                                        name="password"
                                        id="reddit-input"
                                    />
                                    <RedditTextField
                                        label="Codice Fiscale / P.IVA"
                                        className={classes.margin}
                                        onChange={this.handleChange}
                                        className={classes.fieldText}
                                        defaultValue="react-reddit"
                                        type="text"
                                        variant="filled"
                                        value={fiscalCode}
                                        name="fiscalCode"
                                        id="reddit-input"
                                    />

                                    <Typography component="div" gutterBottom className={classes.lineBox}>
                                        <FormControlLabel
                                            control={
                                                <Checkbox checked={accept} onChange={this.accept} value="accept" />
                                            }
                                            label={<span style={{fontSize: '.8rem',position: 'relative',top: -2 }}>Accetto i <a href='#'>termini di servizio</a></span>}
                                        />
                                    </Typography>

                                    <Button variant="contained" size="large" color="secondary" className={classes.ButtonBng} style={{marginBottom: 30}}>Completa la registrazione</Button>
                                </Typography>
                            </Typography>
                        </Grid>
                    </Grid>
                </Container>
                <Container className={className}>
                    <Grid item md={12} style={{textAlign: 'left'}}>
                        
                        <AppBar position="static" color="transparent" className={[classes.navBarBox, classes.BottomNav, 'border-dark-color'].join(' ')}>
                            <Toolbar color="textSecondary">
                                <div className={[classes.leftButton, 'dark-color'].join(" ")}>
                                    @ 2018 Copyright Promoto
                                </div>
                                <div className={classes.lineButtons}>
                                    <Link href="#/" color="textSecondary" className={classes.linkBottom}>Come posso organizzare un evento?</Link>
                                </div>
                            </Toolbar>
                        </AppBar>
                    </Grid>
                </Container>
            </div>
        );
    }

}

export default withStyles(styles)(RegistrationORG);