import axios from 'axios';
const superagent = require("superagent");


/**
 * @param token
 * @returns { Promise<*> }
 */

function getUserNotifics(token){
    return axios.post('/user/Notifics', {
        token: token
    });
}

function getPartnerNotific(token, id){
    return axios.post('/user/PartnerNotifics', {
        token: token,
        id: id //id partner
    });
}

function setNotific(token, key, value){
    return axios.post('/user/SetNotific', {
        token: token,
        key: key,
        value: value
    });
}

function setPartnerNotific(token, key, value, id){
    return axios.post('/user/SetPartnerNotific', {
        token: token,
        key: key,
        value: value,
        id: id
    });
}



const Notifics = {
    getUserNotifics,
    getPartnerNotific,
    setNotific,
    setPartnerNotific
}

export default Notifics;
