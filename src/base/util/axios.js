/**
 * @author userjustdoit
 * @des  axios封装
 **/


import axios from 'axios'
import { Message } from 'element-ui'
import Constans from '@/base/constans.js'

let service=axios.create({
    baseURL:Constans.SERVER_URL,
    timeout:5000
})

// Add a request interceptor
service.interceptors.request.use(function(config){
    // Do something before request is sent
    return config
},function(error){
    // Do something with request error
    return Promise.reject(error)
})

// Add a response interceptor
service.interceptors.response.use(function(response){
        // Do something with response data
        const res = response.data
        if (res.code !== 0) {//出错处理
            console.log(res.data);
            Message({
                message:res.data,
                type:'error',
                duration:1000
            })
            return null;
        }
        return res.data;
    },function(error){
        // Do something with response error
        Message({
            message:error.message,
            type:'error',
            duration:1000
        })
        return Promise.reject(error)
    }
)
export default{
    //get请求
    get(url,param){
        return new Promise((resolve,reject)=>{
            service({
                method:'get',
                url,
                params:param,
            }).then(res=>{  //axios返回的是一个promise对象
                resolve(res)  //resolve在promise执行器内部
            }).catch(err=>{
                reject(err);
            })

        })
    },
    //post请求
    post(url,param){
        return new Promise((resolve,reject)=>{
            service({
                method:'post',
                url,
                data:param,
            }).then(res=>{
                resolve(res)
            }).catch(err=>{
                reject(err);
            })
        })
    },
    //文件上传
    uploadFile($file){
        return new Promise((resolve,reject)=>{
            let formdata = new FormData();
            let serverUrl=Constans.UPLOAD_URL;
            formdata.append('file', $file);
            axios({
                url: serverUrl,
                method: 'post',
                data: formdata,
                headers: { 'Content-Type': 'multipart/form-data' },
            }).then((response) => {
                let res = response.data
                resolve(res);
                /*
                let code=res.code;
                let data=res.data;
                if(code!=0) {//移除上传失败的
                    this.showMessage(data,'error');
                    this.$refs.md.$refs.toolbar_left.$imgDel(pos+1);
                }else{//替换URL
                    let url=this.getUploadedUrl(data);
                    this.$refs.md.$img2Url(pos, url);
                }
                */
            }).catch(err=>{
                reject(err);
            })
        })
    }
}