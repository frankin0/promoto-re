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

function UploadImage(token, image){
    return axios.post('/user/UploadImage', {
        token: token,
        image: image,
    });
}

function RemoveImage(token){
    return axios.post('/user/RemoveImage', {
        token: token
    });
}

function UpdateUserInfo(token, user){
    return axios.post('/user/UpdateUserInfo', {
        token: token,
        userEmail: user.userEmail,
        UserRealName: user.UserRealName,
        UserRealSurname: user.UserRealSurname,
        UserPIVA: user.UserPIVA,
        UserPhone: user.UserPhone.replace(/[&\/\\#,+()$~%.'":*?<>{}-]/g, '').replace(/\s/g,''),
        UserBirthday: user.UserBirthday,
        UserCity: user.UserCity,
        UserGender: user.UserGender,
        type : "info_update"
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
    UploadImage,
    RemoveImage,
    UpdateUserInfo,
    UserListDevicesConnected,
    getIp,
    DeconnectDevice
}

export default User;
