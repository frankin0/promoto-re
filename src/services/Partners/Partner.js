import axios from 'axios';
const superagent = require("superagent");

function getPartnerLists(token){
    return axios.post('/dashboard/ListPartners', {
        token: token
    });
}

function removePartner(token, id){
    return axios.post('/dashboard/RemovePartner', {
        token: token,
        id: id
    });
}

function updatePartner(token, account){
    return axios.post('/dashboard/EditPartner', {
        token: token,
        id: account.id,
        username: account.prtUsername,
        email:  account.prtEmail,
        password: account.prtPassword,
        expire: null,
        status: (account.prtStatus === true ? "1" : "0")
    });
}

function addPartner(token, email, username, password, expire, status){
    return axios.post('/dashboard/AddPartner', {
        token: token,
        username: username,
        email:  email,
        password: password,
        expire: expire,
        status: (status === true ? "1" : "0")
    });
}

const Partner = {
    getPartnerLists,
    removePartner,
    updatePartner,
    addPartner
}

export default Partner;
