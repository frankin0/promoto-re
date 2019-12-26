import axios from 'axios';
import {Configuration} from '../../constants/Configuration';


/**
 * @returns { Promise<*> }
 */

function GetEvent(id){
    return axios.get('/event/' + id);
}

const event__ = {
    GetEvent
}

export default event__;
