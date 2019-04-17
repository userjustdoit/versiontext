/**
 * @author userjustdoit
 * @des
 */
import Constans from '@/base/constans.js'

//返回随机的 [from, to] 之间的整数(包括from，也包括to)
exports.randomInt = function (from, to) {
  return parseInt(Math.random() * (to - from) + from);
}

exports.trim=function(x) {//自定义的trim String的trim只兼容js1.8
    if(typeof(x) === "string"){
        return x.replace(/^\s+|\s+$/g,'');
    }
    return x;
}

exports.clearBlank=function(x){
    if(typeof(x) === "string"){
        x = x.replace(/\s+/g,"");
    }
    return x;
}

exports.getUrlParam = function (url, ref) {
    // 如果不包括此参数
    if (url.indexOf(ref) == -1)
        return null;
    let str = url.substr(url.indexOf('?') + 1);
    let arr = str.split('&');
    for (let i in arr) {
        let paired = arr[i].split('=');
        if (paired[0] == ref) {
            return paired[1];
        }
    }
    return null;
}

exports.isNull=function(value){
    return value==null||value=='null';
}

exports.isNumber=function(value){
    return typeof(x) === 'number';
}

exports.ellipsisStr=function(value,maxLength){
    let ellipsis='';
    ellipsis=this.isNumber(value)?value.toString():value;
    let strLen=ellipsis.length;
    if(strLen>maxLength){
        ellipsis=`${ellipsis.substr(0,maxLength)}...`
    }
    return ellipsis;
}

exports.isMobile=function(){
    let screenWidth=document.body.scrollWidth;
    return screenWidth<Constans.MOBILE_WIDTH_MAX;
}

exports.getScreenHeight=function(){
    return document.body.scrollHeight;
}