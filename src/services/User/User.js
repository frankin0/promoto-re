import axios from 'axios';
const superagent = require("superagent");


/**
 * 
 * @param email
 * @param password
 * @returns { Promise<*> }
 */

function postUser(token){
    return axios.post('/user', {
        token: token
    });
}

const User = {
    postUser
}

export default User;
