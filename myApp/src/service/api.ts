import axios from 'axios';

export const api = axios.create({
    baseURL:"https://api.themoviedb.org/3",
    params:{
        api_key:"45c0da4e4d5aa9c206ae52fbd8b8c536",
        include_adult:false
    }
})