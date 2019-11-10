import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles'; 
import { createMuiTheme, makeStyles, fade } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';
import red from '@material-ui/core/colors/red';
import { Container, Grid, Typography, AppBar, Toolbar, Button, FormControlLabel, Checkbox,TextField, Link, List, ListItem, ListItemText, ListItemIcon } from '@material-ui/core';
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
        color: '#404a52',
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
        right: 10
    },
    textCenter:{
        textAlign: 'center',
        marginTop: 50
    },
    boxSpacing: {
        marginTop: 30
    },
    fieldText:{
        marginRight: 10,
        width: 'calc(50% - 3.875em)',
        [theme.breakpoints.down('sm')]: {
            width: '100%',
            marginBottom: 10
        }
    },
    ButtonBng: {
        marginTop: 0,
        height: 57,
        [theme.breakpoints.down('sm')]: {
            width: '100%'
        }
    },
    buttonLarge:{
        height: "60px",
        minWidth: "170px",
        marginBottom: 30,
        [theme.breakpoints.down('sm')]: {
            width: '100%'
        }
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
});

class Login extends Component{

    constructor(props){
        super(props);

        this.state = {
            username: '',
            password: '',
            remember: false,
            expandPanel: false,
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

    handleEvent = () =>{
        this.props.regOrg(true);
    }

    render(){
        const { classes, className } = this.props;
        const { username, password, remember } = this.state;

        return (
            <Container className={className}>
                <Grid container  direction="row"  justify="center"  alignItems="center" spacing={3} style={{ minHeight: 'calc(100vh - 118px)'}}>
                    <Grid item xs={12}>
                        <Typography variant="body1" gutterBottom className={classes.textCenter}>
                            <Typography variant="h2" component="div" className={classes.title}>Promoto</Typography>
                            <Typography variant="h6" component="div">Registrati su Promoto, vivi la vita</Typography>

                            <Typography component="div" gutterBottom className={classes.boxSpacing}>

                                <RedditTextField
                                    label="Nome Utente"
                                    className={classes.margin}
                                    onChange={this.handleChange}
                                    className={classes.fieldText}
                                    defaultValue="react-reddit"
                                    variant="filled"
                                    type="text"
                                    value={username}
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
                                <Button variant="contained" size="large" color="primary" className={classes.ButtonBng}>Accedi</Button>
                            </Typography>
                            <Typography component="div" gutterBottom className={classes.lineBox}>
                                <FormControlLabel
                                    control={
                                    <Checkbox checked={remember} onChange={this.rememberMe} className={classes.mSize} value="remember" />
                                    }
                                    label="Ricordami"
                                />
                                <Link href="#/" className={classes.link}>Recupera Password</Link>
                            </Typography>
                        </Typography>
                    </Grid>
                    <Grid item md={6} xs={12} style={{width: '100%'}}>
                        <List dense={true} style={{marginTop: 30}}>
                            <ListItem>
                                <ListItemIcon style={{minWidth: 'auto', marginRight: 10}}>
                                    <CheckRounded />
                                </ListItemIcon>
                                <ListItemText
                                    primary="Pannello di controllo innovativo"
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon style={{minWidth: 'auto', marginRight: 10}}>
                                    <CheckRounded />
                                </ListItemIcon>
                                <ListItemText
                                    primary="Gestione account affiliati"
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon style={{minWidth: 'auto', marginRight: 10}}>
                                    <CheckRounded />
                                </ListItemIcon>
                                <ListItemText
                                    primary="Pagamenti automatici"
                                />
                            </ListItem>
                        </List>
                    </Grid>
                    <Grid item md={6} xs={12} style={{marginTop: 30, width: '100%'}}>
                        <List dense={true}>
                            <ListItem>
                                <ListItemIcon style={{minWidth: 'auto', marginRight: 10}}>
                                    <CheckRounded />
                                </ListItemIcon>
                                <ListItemText
                                    primary="Eventi adatti alle tue esigenze"
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon style={{minWidth: 'auto', marginRight: 10}}>
                                    <CheckRounded />
                                </ListItemIcon>
                                <ListItemText
                                    primary="Acquisto ticket online"
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon style={{minWidth: 'auto', marginRight: 10}}>
                                    <CheckRounded />
                                </ListItemIcon>
                                <ListItemText
                                    primary="Immortala i tuoi momenti migliori con i tuoi amici."
                                />
                            </ListItem>
                        </List>
                    </Grid>
                    <Grid item md={12} style={{textAlign: 'center'}}>
                        <Button variant="contained" color="secondary" size="large" className={classes.buttonLarge} onClick={this.handleEvent}>Pubblica un evento</Button>
                    </Grid>
                </Grid>
                <Grid item md={12} style={{textAlign: 'left'}}>
                    
                    <AppBar position="static" color="inherit" className={[classes.navBarBox, classes.BottomNav].join(' ')}>
                        <Toolbar>
                            <div className={classes.leftButton}>
                                @ 2018 Copyright Promoto
                            </div>
                            <div className={classes.lineButtons}>
                                <Link href="#/" className={classes.linkBottom}>Come posso organizzare un evento?</Link>
                            </div>
                        </Toolbar>
                    </AppBar>
                </Grid>
            </Container>
        );
    }

}

export default withStyles(styles)(Login);