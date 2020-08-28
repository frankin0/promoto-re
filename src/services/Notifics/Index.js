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



const Notifics = {
    getUserNotifics,
    getPartnerNotific
}

export default Notifics;
