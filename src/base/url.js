/**
 * @author userjustdoit
 * @des url地址
 **/

let SERVER_BASE=`${window.location.protocol}//${window.location.host}`;

let SERVER_BASE_DEBUG='http://localhost:8081';

let SERVER_URL='/usersysserver/';//服务地址

export default {
    SERVER_BASE:SERVER_BASE,
    SERVER_BASE_DEBUG:SERVER_BASE_DEBUG,
    SERVER_URL:`${SERVER_BASE}${SERVER_URL}`,
    SERVER_URL_DEBUG:`${SERVER_BASE_DEBUG}${SERVER_URL}`,
}