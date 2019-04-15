/**
 * 日期处理相关工具方法
 * @param ts
 * @returns {string}
 */
exports.getDate=function(ts){
    let date = new Date(parseInt(ts) * 1000);
    let year = date.getFullYear();
    let month = date.getMonth()+1;
    let day = date.getDate();
    if(month >= 1 && month <= 9){
        month = "0" + month;
    }
    if(day >= 1 && day <= 9){
        day = "0" + day;
    }
    let needdate = year+'-'+month+'-'+day;
    return needdate;
}