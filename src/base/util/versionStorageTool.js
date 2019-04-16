/**
 * 获取全部的version项
 */

import Constants from '@/base/constans.js'

let localStorage=window.localStorage;

exports.getAllItemKeys=function(){
    let allItems=[];
    let allItemsStr=localStorage.getItem(Constants.VERSION_ITEMS_STORAGE);
    if(allItemsStr){
        allItems=JSON.parse(allItemsStr);
    }
    return allItems;
}

exports.storageItem=function(itemKey,title,json){
    let allItems=this.getAllItemKeys();
    let newItem={"key":itemKey,"title":title};
    let oldIndex=-1;
    allItems.forEach((item,index)=>{
        if(item.key==itemKey){
            oldIndex=index;
        }
    });
    if(oldIndex!=-1){
        allItems.splice(oldIndex,1);
    }
    allItems.splice(0,0,newItem);
    localStorage.setItem(Constants.VERSION_ITEMS_STORAGE,JSON.stringify(allItems));
    localStorage.setItem(`${Constants.VERSION_ITEM_STORAGE_PREFIX}${itemKey}`,JSON.stringify(json));
}

exports.getItemByItemKey=function(itemKey){
    return localStorage.getItem(`${Constants.VERSION_ITEM_STORAGE_PREFIX}${itemKey}`);
}