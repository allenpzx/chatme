import axios from 'axios';

let fetcher = axios.create({
    baseURL: 'http://localhost:9093/api/',
    timeout: 1000,
    // auth: {
    //     username: null,
    //     password: null
    // },
    proxy: {
        host: 'http://127.0.0.1:9093',
        port: 9000,
        auth: {
            username: 'mikeymike',
            password: 'rapunz3l'
        }
    }
})

export default fetcher