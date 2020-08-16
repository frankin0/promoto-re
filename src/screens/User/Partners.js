import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles'; 
import { createMuiTheme, fade, makeStyles } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { lightBlue, grey, red } from '@material-ui/core/colors';
import yellow from '@material-ui/core/colors/yellow';
import deepOrange from '@material-ui/core/colors/orange';
import deepPurple from '@material-ui/core/colors/purple';
import { Badge, Drawer, CssBaseline,  Button, Hidden, List, ListItem, ListItemAvatar, ListItemText, ListItemSecondaryAction, AppBar, TextField, Avatar, Toolbar, InputBase ,ListSubheader,  Typography, Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import ListSettings from '../../components/ListSettings/ListSettings';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';
import AddPartner from '../../components/Dialogs/AddPartner';
import Partner from '../../services/Partners/Partner';
import PartnerUpdateInfo from '../../components/PartnersPage/PartnerUpdateInfo';

const theme = createMuiTheme({
    palette: {
        type: 'dark',
        primary: { 
            main: grey[600]
        },
        secondary: { main: lightBlue[200] },
        textPrimary: '#262a3e'
    },
    typography: {
        fontFamily: [
            '"Montserrat"', 'sans-serif'
        ].join(","),
        color: '#262a3e'
    }
});

const StyledBadge = withStyles((theme) => ({
    badge: {
      backgroundColor: '#44b700',
      color: '#44b700',
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      '&::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        animation: '$ripple 1.2s infinite ease-in-out',
        border: '1px solid currentColor',
        content: '""',
      },
    },
    '@keyframes ripple': {
      '0%': {
        transform: 'scale(.8)',
        opacity: 1,
      },
      '100%': {
        transform: 'scale(2.4)',
        opacity: 0,
      },
    },
}))(Badge);

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
    orange: {
        color: theme.palette.getContrastText(deepOrange[500]),
        backgroundColor: deepOrange[500],
    },
    purple: {
        color: theme.palette.getContrastText(deepPurple[500]),
        backgroundColor: deepPurple[500],
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
    textCenter:{
        textAlign: 'center'
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
    },
    closeFilter: {
        top: 0, 
        right: 0, 
        visibility: 'hidden', 
        opacity: 0 
    },
    openFilter: {
        top: 0, 
        right: 0, 
        visibility: 'visible', 
        opacity: 1,
        transition: ".3s",
        cursor: 'pointer',
        pointerEvents: 'auto'
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

class Partners extends Component{

    constructor(props){
        super(props);

        this.state = {
            mobileOpen: false,
            heandlerAddPartner: false,
            partnerLists: [],
            selectedUser: null,
            filterName: ''
        }
    }

    componentDidMount(){
        document.body.classList.add("__settings");

        Partner.getPartnerLists(localStorage.getItem('user'))
            .then(result => {
                this.setState({
                    partnerLists: result.data.lists
                });
            })
            .catch((e) => console.log(e));

    }

    componentWillUnmount(){
        document.body.classList.remove("__settings");
    }

    addPartner = () =>{
        this.setState({
            heandlerAddPartner: true
        })
    }

    closeModal = () =>{
        this.setState({
            heandlerAddPartner: false
        })
    }

    handleSelect = (acc, userIndex) => {
        this.setState({
            selectedUser: acc,
            userIndex: userIndex
        });
    }

    removeId = (id, index_) => {

        var array = [...this.state.partnerLists]; // make a separate copy of the array
        delete array[index_];
        this.setState({partnerLists: array});
    }
    
    changeAccount = (acc, index) => {

        var array = [...this.state.partnerLists]; // make a separate copy of the array
        array[index] = acc;
        this.setState({partnerLists: array});
    }

    addPartnerC = (acc) => {
        var array = [...this.state.partnerLists]; // make a separate copy of the array
        array[array.length +1] = acc;
        this.setState({partnerLists: array});
    }

    handleChange = e => {
        let val = e.currentTarget.value;

        this.setState({
            filterName: val
        });
    }

    removeFilter = () => {
        this.setState({
            filterName: ""
        });
    }

    render(){
        
        const {classes, container } = this.props;
        const { team, heandlerAddPartner, partnerLists, selectedUser, userIndex, filterName } = this.state; 
        

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
                        
                        <AddPartner open={heandlerAddPartner} closeModal={this.closeModal} addPartner={this.addPartnerC} />

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
                                            onChange={this.handleChange}
                                            inputProps={{ 'aria-label': 'search' }}
                                            value={filterName}
                                        />
                                        <div onClick={this.removeFilter} className={[classes.searchIcon, filterName.length == 0 ? classes.closeFilter : classes.openFilter].join(" ")}>
                                            <CloseIcon />
                                        </div>
                                        
                                    </div>
                                    <Button variant="contained" color="secondary" style={{marginLeft: 20, width: 300}} onClick={this.addPartner} disabled={heandlerAddPartner}>Aggiungi partner</Button>
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

                                    {partnerLists.filter(itm => itm.prtUsername.toLowerCase().includes(this.state.filterName.toLowerCase()) ).map((res, index) => {
                                        const rand = 1; //Math.floor((Math.random() * 3) + 1);

                                        if(res)
                                            return (
                                                <ListItem button style={{borderRadius: 3}} key={index} onClick={() => this.handleSelect(res, index)}>
                                                    <ListItemAvatar>
                                                        <StyledBadge
                                                            overlap="circle"
                                                            anchorOrigin={{
                                                                vertical: 'bottom',
                                                                horizontal: 'right',
                                                            }}
                                                            variant={res.prtStatus == 1 ? "dot": ""}
                                                        >
                                                            <Avatar title={res.prtStatus == 1 ? "Attivo": "Disattivato"} className={rand == 0 ? classes.yellow : rand == 1 ? classes.orange : rand == 2 ? classes.purple : classes.secondary}>{res.prtUsername.charAt(0).toUpperCase()}</Avatar>
                                                        </StyledBadge>
                                                    </ListItemAvatar>
                                                    <ListItemText
                                                        primary={res.prtUsername}
                                                        secondary={res.prtEmail ? res.prtEmail : ""}
                                                    />
                                                </ListItem>
                                            )
                                    })}
                                </List>
                            </Grid>
                            <Grid item md={8}>
                                {/*Pafrtner Info */}
                                {
                                    selectedUser != null ?
                                        <PartnerUpdateInfo account={selectedUser} index={userIndex} removeId={this.removeId} changeAccount={this.changeAccount} />
                                    : 
                                    <Grid
                                        container
                                        direction="row"
                                        justify="center"
                                        alignItems="center"
                                        style={{height: '100%'}}
                                    >
                                        <Typography variant="body2" gutterBottom className={classes.textCenter}>Seleziona un account</Typography>
                                    </Grid>
                                }
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