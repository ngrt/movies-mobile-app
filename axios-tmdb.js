import axios from 'axios';

const API_KEY = "dfb5eecad0d58436743a0ee0b335d1ca";

const instance = axios.create({
    baseURL: 'https://api.themoviedb.org/3'
});

instance.defaults.params['api_key'] = API_KEY;

export default instance;