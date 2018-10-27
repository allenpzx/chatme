import axios from 'axios';
import { Toast } from 'antd-mobile';

// let fetcher = axios.create({
//     baseURL: 'http://localhost:9093/api/',
//     timeout: 1000,
//     headers: {"Access-Control-Allow-Origin": "*"},
//     // auth: {
//     //     username: null,
//     //     password: null
//     // },
//     crossorigin:true,
//     proxy: {
//         host: 'http://localhost',
//         port: 9093
//         // auth: {
//         //     username: 'mikeymike',
//         //     password: 'rapunz3l'
//         // }
//     }
// })

// export default fetcher

axios.interceptors.request.use(function (config){
    Toast.loading('test content', 2, ()=>{
        console.log('ceshi')
    })
    return config
})

axios.interceptors.response.use(function (config){
    setTimeout(()=>{
        Toast.hide()
    }, 1000)
})