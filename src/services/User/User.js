import axios from 'axios';
const superagent = require("superagent");


/**
 * @param email
 * @param password
 * @returns { Promise<*> }
 */

function postUser(token){
    return axios.post('/user', {
        token: token
    });
}

function postNewPassword(token, oldPass, newPass){
    return axios.post('/user/changePassword', {
        token: token,
        hold_password: oldPass,
        new_password: newPass
    });
}

function UpdatePaymentInfo(token, name, surname, paypal, update_payment){
    return axios.post('/user/UpdatePaymentInfo', {
        token: token,
        name: name,
        surname: surname,
        paypal: paypal,
        update_payment: update_payment
    });
}

function UserListDevicesConnected(token){
    return axios.post('/user/GetDevicesConnected', {
        token: token
    });
}
function DeconnectDevice(token, id){
    return axios.post('/user/DeconnectDevice', {
        token: token,
        id: id
    });
}

function getIp(ip){
    return axios.post('http://ip-api.com/json/'+ip);
}


const User = {
    postUser,
    postNewPassword,
    UpdatePaymentInfo,
    UserListDevicesConnected,
    getIp,
    DeconnectDevice
}

export default User;
