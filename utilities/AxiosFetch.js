import { ENTRYPOINT, WithCredentials } from './Axios';
import axios from 'axios';



export default function call(To, Method, Options = {}) {
    Options.url = ENTRYPOINT + To;
    Options.method = Method;
    Options.withCredentials = WithCredentials;
    Options.headers = {"content-type": "application/json"};
    return axios(Options)
        .then(response => {
            return response;
        });
}