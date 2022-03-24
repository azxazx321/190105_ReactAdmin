import { message } from "antd";
import axios from "axios";

//data can be null
export default function ajax(url, data={}, type='GET') {
    return new Promise((resolve, reject) => {
        let promise
        
        if(type==="GET") {
            promise = axios.get(url, {
                params: data
            })
        } else {
            promise = axios.post(url, data)
            console.log('url',url)
        }
        promise.then(response =>{
            resolve(response.data)
        }).catch(error => {
            message.error('request unsuccessfully' + error.message)
        })
    })


    if(type === 'GET') {
        //get
        return axios.get(url,{
            params:data
        })
    } else{
        //post
        return axios.post(url,data)
    }

    
}


// ajax('/login', {usename: 'luke', password: 'admin'}, 'POST').then

// ajax('/manage/user/add', {usename: 'luke', password: 'admin', phone:'86798090'}, 'POST').then


