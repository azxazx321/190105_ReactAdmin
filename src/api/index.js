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

export const reqProducts = (pageNum,pageSize) => ajax(BASE + '/manage/product/list',{pageNum,pageSize}) 

export const reqSearchProducts = ({pageNum,pageSize,searchKeyword,searchType}) => ajax(BASE + '/manage/product/search',{pageNum,pageSize,[searchType]:searchKeyword}) 

export const reqSingleCategory = (categoryId) => ajax(BASE + '/manage/category/info',{categoryId}) //形参默认值为get 可以省略

export const reqUpdateProductStatus = (productId,status) => ajax(BASE + '/manage/product/updateStatus',{productId,status},'POST') //形参默认值为get 可以省略

export const reqDeleteImg = (name) => ajax(BASE + '/manage/img/delete',{name},'POST')

export const reqAddOrUppdateProduct = (product) => ajax(BASE + '/manage/product/' + (product._id ? 'update' : 'add'),product,'POST')

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