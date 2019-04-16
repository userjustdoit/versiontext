/**
 * @author userjustdoit
 * @des  常量定义
 */

import Url from './url.js';

let isProduction=process.env.NODE_ENV === 'production';//是否为产品模式

export default {
    SERVER_BASE:isProduction?Url.SERVER_BASE:Url.SERVER_BASE_DEBUG,//基地址
    SERVER_URL:isProduction?Url.SERVER_URL:Url.SERVER_URL_DEBUG,//服务地址
    MOBILE_WIDTH_MAX:800,//手机端区别pc的最大宽度
    VERSION_ITEMS_STORAGE:'VERSION_ALL',
    VERSION_ITEM_STORAGE_PREFIX:'VERSION_',
}
