/**
 * @author userjustdoit
 * @des 为vue页面时调用
 */


import * as filters from './filters'
import mixins from './mixins'

exports.init= function (Vue) {

    Object.keys(filters).forEach(key => {
        Vue.filter(key, filters[key])
    })

  Vue.mixin(mixins)
}
