import { message } from "antd";
import jsonp from "jsonp";
import ajax from "./ajax";

const BASE = ''

// export function reqLogin(usename, password) {
//     return ajax('/login',{usename, password},'GET')
// }


export const reqLogin = (username, password) => ajax(BASE + '/login',{username, password},'POST')

export const reqAddUser = user => ajax(BASE + '/manage/user/add',user, 'POST')

export const reqCategory = (parentId) => ajax(BASE + '/manage/category/list',{parentId}) //形参默认值为get 可以省略

export const reqAddCategory = (parentId,categoryName) => ajax(BASE + '/manage/category/add',{parentId,categoryName},'POST') //形参默认值为get 可以省略

export const reqUpdateCategory = (categoryId, categoryName) => ajax(BASE + '/manage/category/update',{categoryId, categoryName},'POST')


/*
json request interface api function
return Promise object
*/
export const reqWeather = (lat,lon) => {
    //
    return new Promise((resolve, reject) => {
        const url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=0a120fd7fc7f68a5ff20a04384889269`
        jsonp(url,{}, (err, data) => {
            //console.log('err,data', err,data.weather[0])
            if(!err && data.weather ){
                const {main:weather, icon} = data.weather[0]
                //const description = data.weather[0].description
                //console.log('description', description)
                resolve({weather, icon})
            }else{
                message.error('Weather API is invalid')
            }
        })
    })
   
}

reqWeather()