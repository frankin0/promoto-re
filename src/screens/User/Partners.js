import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles'; 
import { createMuiTheme, fade, makeStyles } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import grey from '@material-ui/core/colors/grey';
import red from '@material-ui/core/colors/red';
import yellow from '@material-ui/core/colors/yellow';
import { Drawer, CssBaseline,  Button, Hidden, List, ListItem, ListItemAvatar, ListItemText, ListItemSecondaryAction, AppBar, TextField, Avatar, Toolbar, InputBase ,ListSubheader,  Typography, Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import ListSettings from '../../components/ListSettings/ListSettings';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import SearchIcon from '@material-ui/icons/Search';

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
        paddingBottom: 0
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
   
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
        display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: 0,
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
        marginLeft: 0,
        width: '100%',
        },
    },
    searchIcon: {
        width: theme.spacing(7),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 7),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
        width: '100%',
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
        display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
        display: 'none',
        },
    },
    bodySecondWRK:{
        paddingRight:  theme.spacing(3),
        paddingLeft:  theme.spacing(3),
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

function generate(element) {
    return [0, 1, 2].map(value =>
      React.cloneElement(element, {
        key: value,
      }),
    );
  }

class Partners extends Component{

    constructor(props){
        super(props);

        this.state = {
            mobileOpen: false,
        }
    }

    componentDidMount(){
        document.body.classList.add("__settings");
    }

    componentWillUnmount(){
        document.body.classList.remove("__settings");
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
                    <div style={{marginTop: 0, maxWidth: 'auto'}}>

                        <div className={classes.grow}>
                            <AppBar position="static" color="transparent" style={{backgroundColor: 'transparent', border: 'none', boxShadow: 'none'}}>
                                <Toolbar style={{minHeight: 'auto', paddingLeft: 0, paddingRight: 0}}>  
                                    <div className={classes.search}>
                                        <div className={classes.searchIcon}>
                                            <SearchIcon />
                                        </div>
                                        <InputBase
                                            placeholder="Search…"
                                            style={{width: '100%'}}
                                            classes={{
                                                root: classes.inputRoot,
                                                input: classes.inputInput,
                                            }}
                                            inputProps={{ 'aria-label': 'search' }}
                                        />
                                        
                                    </div>
                                    <Button variant="contained" color="secondary" style={{marginLeft: 20, width: 300}}>Aggiungi partner</Button>
                                    <div className={classes.grow} />
                                </Toolbar>
                            </AppBar>
                        </div>

                        <Grid container direction="row" style={{marginTop: 20,borderTop: '1px solid #4f4f4f'}}>
                            <Grid item md={4} style={{paddingRight: 10, borderRight: '1px solid #4f4f4f', minHeight: 'calc(100vh - 105px)'}}>
                                <List dense={true}
                                    subheader={
                                        <ListSubheader component="div" id="nested-list-subheader">
                                            Membri attivi
                                        </ListSubheader>
                                    }
                                  >
                                    {generate(
                                        <ListItem button style={{borderRadius: 3}}>
                                            <ListItemAvatar>
                                                <Avatar className={classes.yellow}>N</Avatar>
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={"Nome Cognome"}
                                                secondary={'Secondary text'}
                                            />
                                        </ListItem>,
                                    )}
                                </List>
                            </Grid>
                            <Grid item md={8}>
                                <div className={classes.bodySecondWRK}>
                                    <List dense={true} style={{ borderBottom: '1px solid #4f4f4f'}}>
                                        <ListItem>
                                            <ListItemAvatar>
                                                <Avatar className={classes.yellow}>N</Avatar>
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={<Typography component="h3" variant="h6">Nome Cognome</Typography>}
                                                secondary={<Typography component="div" variant="subtitle2">mail@mail.it</Typography>}
                                            />
                                            <ListItemSecondaryAction>
                                                <Button color="primary" disabled>Salva</Button>
                                                <Button color="secondary">Elimina</Button>
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                    </List>
                                </div>

                                <div className={classes.bodySecondWRK} style={{marginTop: 20}}>
                                    <Typography variant="h6" component="div" color="textSecondary">
                                        Nome utente
                                    </Typography>

                                    <div style={{maxWidth: 424, marginBottom: 20}}>
                                        <Typography variant="caption" component="p" style={{marginBottom: 10,maxWidth: 424, marginTop: 16}} >
                                            <div className={classes.boxF} style={{marginBottom: 10}}>
                                                <div>
                                                    <InfoOutlinedIcon style={{fontSize: '.955rem'}} /> 
                                                </div>
                                                <div style={{marginLeft: 10, color: '#6a6f85'}}>
                                                    Verrà utilizzato per l'accesso al portale.
                                                </div>
                                            </div>
                                        </Typography>

                                        <RedditTextField
                                            label="UserName"
                                            onChange={this.handleChange}
                                            className={[classes.fieldText, this.state.usernameError ? "filedError" : ""].join(" ")}
                                            defaultValue="react-reddit"
                                            variant="filled"
                                            type="text"
                                            value={""}
                                            name="username"
                                            id="reddit-input"

                                            color="textSecondary"
                                        />
                                    </div>

                                </div>
                                <div className={classes.bodySecondWRK} style={{marginTop: 20}}>
                                    <Typography variant="h6" component="div" color="textSecondary">
                                        Email (Optional)
                                    </Typography>

                                    <div style={{maxWidth: 424, marginBottom: 20}}>
                                        <Typography variant="caption" component="p" style={{marginBottom: 10,maxWidth: 424, marginTop: 16}} >
                                            <div className={classes.boxF} style={{marginBottom: 10}}>
                                                <div>
                                                    <InfoOutlinedIcon style={{fontSize: '.955rem'}} /> 
                                                </div>
                                                <div style={{marginLeft: 10, color: '#6a6f85'}}>
                                                    Puoi inserire un'email di contatto (scelta opzionale)
                                                </div>
                                            </div>
                                        </Typography>

                                        <RedditTextField
                                            label="Email"
                                            onChange={this.handleChange}
                                            className={[classes.fieldText, this.state.usernameError ? "filedError" : ""].join(" ")}
                                            defaultValue="react-reddit"
                                            variant="filled"
                                            type="email"
                                            value={""}
                                            name="email"
                                            id="reddit-input"

                                            color="textSecondary"
                                        />
                                    </div>

                                </div>
                                <div className={classes.bodySecondWRK} style={{marginTop: 20}}>
                                    <Typography variant="h6" component="div" color="textSecondary">
                                        Password
                                    </Typography>

                                    <div style={{maxWidth: 424, marginBottom: 50}}>
                                        <Typography variant="caption" component="p" style={{marginBottom: 10,maxWidth: 424, marginTop: 16}} >
                                            <div className={classes.boxF} style={{marginBottom: 10}}>
                                                <div>
                                                    <InfoOutlinedIcon style={{fontSize: '.955rem'}} /> 
                                                </div>
                                                <div style={{marginLeft: 10, color: '#6a6f85'}}>
                                                    Inserisci una password minimo 6 caratteri alfanumerici per l'accesso al portale gestionale.
                                                </div>
                                            </div>
                                        </Typography>

                                        <RedditTextField
                                            label="Password"
                                            onChange={this.handleChange}
                                            className={[classes.fieldText, this.state.usernameError ? "filedError" : ""].join(" ")}
                                            defaultValue="react-reddit"
                                            variant="filled"
                                            type="password"
                                            value={""}
                                            name="password"
                                            id="reddit-input"

                                            color="textSecondary"
                                        />
                                    </div>

                                </div>
                            </Grid>
                        </Grid>
                    </div>


                </main>
            </div>
        );
    }

}


Partners.propTypes = {
    container: PropTypes.instanceOf(typeof Element === 'undefined' ? Object : Element),
    inputRef: PropTypes.func.isRequired,

};

export default withStyles(styles)(Partners);