import axios from "axios";

//data can be null
export default function ajax(url, data={}, type='GET') {
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


