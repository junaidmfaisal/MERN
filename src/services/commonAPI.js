// import axios from "axios"

// const commonAPI = async (httpMthod, url , reqBody ,reqHeader)=>{
//     const reqConfig ={
//         method : httpMthod,
//         url,
//         data : reqBody,
//         headers:reqHeader ? reqHeader : {"Content-Type" : "application/json"}
//     }
//     return await axios(reqConfig).then(res =>{
//         return res
//     }).catch(err=>{
//         return err
//     })
// }
// export default commonAPI


import axios from "axios"

const commonAPI = async (httpMethod,url,reqBody,reqHeader)=>{
   
    const reqConfig = {
        method:httpMethod,
        url,
        data:reqBody,
        headers: reqHeader ? reqHeader : {'Content-Type':'application/json'}
    }
    return await axios(reqConfig).then(res=>{return res})
    .catch(err=>{return err})
}
export default commonAPI