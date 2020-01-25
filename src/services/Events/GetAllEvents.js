import axios from 'axios';
import {Configuration} from '../../constants/Configuration';


/**
 * @returns { Promise<*> }
 */

function GetAllEvents(limit, page){
    return axios.get('/events/lists/'+limit+'/' + page);
}

function GetMostEvents(limit, page){
    return axios.get('/events/most_lists/'+limit+'/' + page);
}

const event__ = {
    GetAllEvents,
    GetMostEvents
}

export default event__;
