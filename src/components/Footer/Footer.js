import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles'; 
import { Container, Grid, Typography, List, ListItem, ListItemText } from '@material-ui/core';


const styles = theme => ({
    root: {
        flexGrow: 1,
        maxWidth: 800,
        margin: '0 auto'
    },
    footer:{
        paddingBottom: 20,
        paddingTop: 50
    },
    subtitle:{
        textAlign: 'center',
        width: '100%',
        display: 'block',
        marginTop: 10,
        
        padding: 10,
        fontSize: '.9rem'
    },
    subtitleFooter:{
        fontSize: '.9rem'
    }
});

class Footer extends Component{

    constructor(props){
        super(props);
        

    }

    render(){

        const {classes} = this.props;

        return(
            <Container className={classes.footer}>
            <Grid container className={classes.root} spacing={2} justify="center">
                    <Grid item md={3} spacing-xs-6>
                        <Typography variant="h6" color="textSecondary" className={classes.subtitleFooter}>Lavora con noi</Typography>
                        <List dense={true}>
                            <ListItem style={{paddingLeft: 0}}>
                                <ListItemText color="textSecondary" primary="Jobs" />
                            </ListItem>
                            <ListItem style={{paddingLeft: 0}}>
                                <ListItemText color="textSecondary" primary="Sponsor" />
                            </ListItem>
                            <ListItem style={{paddingLeft: 0}}>
                                <ListItemText color="textSecondary" primary="Crea Annuncio" />
                            </ListItem>
                        </List>
                    </Grid>
                    <Grid item md={3}>
                        <Typography variant="h6" color="textSecondary" className={classes.subtitleFooter}>Condizioni Generali</Typography>
                        <List dense={true}>
                            <ListItem style={{paddingLeft: 0}}>
                                <ListItemText color="textSecondary" primary="Condizioni Help" />
                            </ListItem>
                            <ListItem style={{paddingLeft: 0}}>
                                <ListItemText color="textSecondary" primary="Privacy & Copyright" />
                            </ListItem>
                        </List>
                    </Grid>
                    <Grid item md={6}>
                        <Typography variant="h6" color="textSecondary" className={classes.subtitleFooter}>Promoto Inc.</Typography>
                        <List dense={true}>
                            <ListItem style={{paddingLeft: 0}}>
                                <ListItemText color="textSecondary" primary="support@promo-to.it" />
                            </ListItem>
                            <ListItem style={{paddingLeft: 0}}>
                                <ListItemText color="textSecondary" primary="Chi siamo" />
                            </ListItem>
                            <ListItem style={{paddingLeft: 0}}>
                                <ListItemText color="textSecondary" primary="Supporto LiveChat dal Lunedì al Venerdì 9:00 / 13:00" />
                            </ListItem>
                        </List>
                    </Grid>
                    
                    <Grid item xs={12}>
                        <Typography variant="body1" color="textSecondary" component="p" className={classes.subtitle}>&copy; 2019 Promo-to.it</Typography>
                    </Grid>
                </Grid>
            </Container>
        );
    }
}

export default withStyles(styles)(Footer);