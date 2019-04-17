/**
 * @author userjustdoit
 * @des  vue的mixins
 */

import ResConfig from '@/base/resconfig.js';
import Util from '@/base/util/util.js';
import {Message} from 'element-ui';

export default {
    methods: {
        hello() {
            console.log('hello');
        },
        getImageUrl(fileName) {//获取路径资源
            return ResConfig.staticPath + `/image/${fileName}`;
        },
        trim(text){
            return Util.trim(text);
        },
        isEmpty(str){
            return str&&this.trim(str)!=''?false:true;
        },
        clearBlank(text){
            return Util.clearBlank(text);
        },
        getUrlParam(param){
            return Util.getUrlParam(location.href,param);
        },
        setTitle(title){
            document.title = title;
        },
        isNull(value){
            return Util.isNull(value);
        },
        isMobile(){
            return Util.isMobile();
        },
        isNumber(){
            return Util.isNumber();
        },
        ellipsisStr(value,length){
            return Util.ellipsisStr(value,length);
        },
        showMessage(message,type,duration){
            Message({
                showClose: true,
                message: message,
                type: type?type:'info',
                duration: duration?duration:1000
            })
        },
        getScreenHeight(){
            return Util.getScreenHeight();
        }

    }

}
