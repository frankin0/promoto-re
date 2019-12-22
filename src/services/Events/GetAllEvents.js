import axios from 'axios';
import {Configuration} from '../../constants/Configuration';


/**
 * @returns { Promise<*> }
 */

function GetAllEvents(limit, page){
    return axios.get('/events/lists/'+limit+'/' + page);
}

const event__ = {
    GetAllEvents
}

export default event__;
