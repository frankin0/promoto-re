import {Configuration} from '../constants/Configuration';
const superagent = require("superagent");


/**
 * 
 * @param email
 * @param password
 * @returns { Promise<*> }
 */

function Login({email, password}){
    return superagent.post(Configuration.ENDPOINT + "api/login")
    .set('Content-Type', 'application/json')
    .set('accept', 'json')
    //.query({ action: 'edit', city: 'London' }) // query string
    .send(
        {
            email : email,
            password: password
        }
    );
}

const getAuth = {
    Login
}

export default getAuth;
