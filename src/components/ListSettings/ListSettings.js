import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles'; 
import { createMuiTheme, fade, makeStyles } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import grey from '@material-ui/core/colors/grey';
import red from '@material-ui/core/colors/red';import { ListItemAvatar, Avatar, FormControl, Select, CssBaseline,  Button, List, InputLabel, ListItem, ListItemText, Grid, Hidden, Fade, Input, TextField, Typography } from '@material-ui/core';
import ArrowRightAltRoundedIcon from '@material-ui/icons/ArrowRightAltRounded';
import {Link} from 'react-router-dom';

import {
    useParams
  } from "react-router-dom";
class ListSettings extends Component{

    constructor(props){
        super(props);

        this.state = {

        };
    }

    render(){

        const {classes, match} = this.props;

        return (
            <div style={{padding: '40px 32px'}}>
                <Button to="/" startIcon={<ArrowRightAltRoundedIcon style={{ transform: 'rotate(180deg)'}} />} style={{textTransform: 'none', fontWeight: 400, marginBottom: 30}}>Indietro</Button>

                <Typography variant="caption" display="block" color="textSecondary" className={classes.subtitle} gutterBottom>Impostazioni personali</Typography>
                <List>
                    <Link className={"MuiTypography-colorTextSecondary"} style={{textDecoration: 'none'}} to="/Settings">
                        <ListItem button className={[classes.listM, (match.path.replace('/','') == "Settings" ? 'active' : '')].join(" ")} button color="textSecondary">
                            <ListItemAvatar style={{minWidth: 32}}>
                                <Avatar alt="Remy Sharp" style={{width: "24px", height: 24}} src="https://material-ui.com/static/images/avatar/1.jpg" />
                            </ListItemAvatar>
                            <ListItemText className={classes.listMFont} color="textSecondary" primary={"Nome Cognome"} />
                        </ListItem>
                    </Link>
                    {
                        [
                            {
                                name: 'Notifiche',
                                tag: 'Notifics',
                                id: 0
                            },
                            {
                                name: 'Privacy',
                                tag: 'Privacy',
                                id: 1
                            },
                            {
                                name: 'Dispositivi connessi',
                                tag: 'DevicesConnected',
                                id: 2
                            },
                            {
                                name: 'I miei conti',
                                tag: 'paycard',
                                id: 3
                            }
                        ].map((text, index) => (
                        <Link className={"MuiTypography-colorTextSecondary"} style={{textDecoration: 'none'}} to={"/Settings/" + text.tag} >
                            <ListItem button className={[classes.listM, (match.path.replace('/Settings/','') == text.tag ? 'active' : '')].join(' ')} button key={index}>
                                <ListItemText color="textSecondary" className={classes.listMFont} primary={text.name} />
                            </ListItem>
                        </Link>
                    ))}
                </List>

                <Typography variant="caption" color="textSecondary" display="block" className={classes.subtitle} style={{marginTop: 20}} gutterBottom>Affiliati & Partners</Typography>
                <List>
                    {['Lista Partners', 'Aggiungi partner'].map((text, index) => (
                        <ListItem className={classes.listM} button key={text}>
                            <ListItemText color="textSecondary" className={classes.listMFont} primary={text} />
                        </ListItem>
                    ))}
                </List>
            </div>
        );
    }
}

export default (ListSettings);