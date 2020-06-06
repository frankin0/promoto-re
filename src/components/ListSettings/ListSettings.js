import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles'; 
import { createMuiTheme, fade, makeStyles } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import grey from '@material-ui/core/colors/grey';
import red from '@material-ui/core/colors/red';import { ListItemAvatar, Avatar, FormControl, Select, CssBaseline,  Button, List, InputLabel, ListItem, ListItemText, Grid, Hidden, Fade, Input, TextField, Typography } from '@material-ui/core';
import ArrowRightAltRoundedIcon from '@material-ui/icons/ArrowRightAltRounded';
import {Link} from 'react-router-dom';
import User from '../../services/User/User';

import {
    useParams
  } from "react-router-dom";
class ListSettings extends Component{

    constructor(props){
        super(props);

        this.state = {
            userInfo: JSON.parse(localStorage.getItem('user_info'))
        };
    }

    componentDidMount(){
        if(localStorage.getItem('user') !== null){
            User.postUser(localStorage.getItem('user'))
            .then((data) => { 
                
                if(typeof data.data === "object"){            
                    this.setState({
                        userInfo: data.data
                    });
                    localStorage.setItem("user_info", JSON.stringify(data.data));
                }else{
                    localStorage.removeItem("user");
                    localStorage.removeItem("user_info");
                    //window.location.reload();
                }
            })
            .catch((e) => console.log(e));
        }
    }

    render(){

        const {classes, match} = this.props;
        const { userInfo } = this.state;

        return (
            <div style={{padding: '40px 32px'}}>
                <Button href="/" startIcon={<ArrowRightAltRoundedIcon style={{ transform: 'rotate(180deg)'}} />} style={{textTransform: 'none', fontWeight: 400, marginBottom: 30}}>Indietro</Button>

                <Typography variant="caption" display="block" color="textSecondary" className={classes.subtitle} gutterBottom>Impostazioni personali</Typography>
                <List>
                    <Link className={"MuiTypography-colorTextSecondary"} style={{textDecoration: 'none'}} to="/Settings">
                        <ListItem button className={[classes.listM, (match.path.replace('/','') == "Settings" ? 'active' : '')].join(" ")} button color="textSecondary">
                            <ListItemAvatar style={{minWidth: 32}}>
                                <Avatar alt={userInfo.UserRealName != null && userInfo.UserRealSurname != null ? userInfo.UserRealName.charAt(0).toUpperCase() + userInfo.UserRealName.slice(1) + " " + userInfo.UserRealSurname.charAt(0).toUpperCase() + userInfo.UserRealSurname.slice(1) : "NS"} style={{width: "24px", height: 24}} src={this.state.userInfo.UserProfilePic} />
                            </ListItemAvatar>
                            <ListItemText className={classes.listMFont} color="textSecondary" primary={userInfo.UserRealName != null && userInfo.UserRealSurname != null ? userInfo.UserRealName.charAt(0).toUpperCase() + userInfo.UserRealName.slice(1) + " " + userInfo.UserRealSurname.charAt(0).toUpperCase() + userInfo.UserRealSurname.slice(1) : "NS"} />
                        </ListItem>
                    </Link>
                    {
                        [
                            {
                                name: 'Security',
                                tag: 'Security',
                                id: 0
                            },
                            {
                                name: 'Notifiche',
                                tag: 'Notifics',
                                id: 1
                            },
                            {
                                name: 'Privacy',
                                tag: 'Privacy',
                                disabled: true, 
                                id: 2
                            },
                            {
                                name: 'Dispositivi connessi',
                                tag: 'Devices',
                                id: 3
                            },
                            {
                                name: 'I miei conti',
                                tag: 'Paycard',
                                id: 4
                            }
                        ].map((text, index) => (
                        <Link className={"MuiTypography-colorTextSecondary"} disabled={text.disabled} style={{textDecoration: 'none'}} to={text.disabled ? "#" : "/Settings/" + text.tag} >
                            <ListItem button disabled={text.disabled} className={[classes.listM, (match.path.replace('/Settings/','') == text.tag ? 'active' : '')].join(' ')} button key={index}>
                                <ListItemText color="textSecondary" className={classes.listMFont} primary={text.name} />
                            </ListItem>
                        </Link>
                    ))}
                </List>

                {
                    userInfo.UserPIVA ?
                        <React.Fragment>
                            <Typography variant="caption" color="textSecondary" display="block" className={classes.subtitle} style={{marginTop: 20}} gutterBottom>Affiliati & Partners</Typography>
                            <List>
                                {[
                                        {
                                            name: 'Lista Partner',
                                            tag: 'Partners',
                                            id: 4
                                        }
                                ].map((text, index) => (
                                    <Link className={"MuiTypography-colorTextSecondary"} disabled={text.disabled} style={{textDecoration: 'none'}} to={text.disabled ? "#" : "/Settings/" + text.tag} >
                                        <ListItem button disabled={text.disabled} className={[classes.listM, (match.path.replace('/Settings/','') == text.tag ? 'active' : '')].join(' ')} button key={index}>
                                            <ListItemText color="textSecondary" className={classes.listMFont} primary={text.name} />
                                        </ListItem>
                                    </Link>
                                ))}
                            </List>
                        </React.Fragment>
                    : ""
                }

            </div>
        );
    }
}

export default (ListSettings);