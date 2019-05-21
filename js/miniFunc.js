/**
 * Created by sumily on 2019/5/21.
 * Version:
 * Description:
 */

/**
 * 判断一个值是否可用做数字
 * @param num
 * @returns {boolean}
 */
function isNumber(num){
    return typeof num === "number" && isFinite(num);
}

/**
 * 判断是不是ios系统
 * @returns {boolean}
 */
function isIOS(){
    let u = navigator.userAgent;
    let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    return isIOS;
}

/**
 * 转成字符串
 * @param val
 * @returns {string}
 */
function toString (val) {
    return val == null
        ? ''
        : typeof val === 'object'
            ? JSON.stringify(val, null, 2)
            : String(val)
}

/**
 * 判断是不是promise对象
 * @param val
 * @returns {boolean}
 */
function isPromise(val){
    return (
        val!==undefined&&
        val!== null &&
        typeof val.then === 'function' &&
        typeof val.catch === 'function'
    )
}
