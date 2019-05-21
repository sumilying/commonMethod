/**
 * Created by sumily on 2019/5/21.
 * Version:
 * Description:深拷贝的几种情况
 */


var obj = {
    test1:null,
    test2:undefined,
    test3:[1,2,3],
    test4:[{t1:1,t2:2},{t1:1,t2:'2'}],
    add:function(a,b){
        return a+b;
    },
    name: 'lyl',
    age: 18
};
var obj1=[1,2,3,3,4,5];
console.log(obj,obj1);

/**
 * 简单深拷贝，空，数组拷贝后类型全变成了对象
 * @param source
 * @returns {*}
 */
var deepCopy1 = function (source) {
    var result = {};
    for (var key in source) {
        result[key] = typeof source[key] === 'object' ? deepCopy1(source[key]) : source[key];
    }
    return result;
};

console.log("deepCopy1:");
console.log(deepCopy1(obj));
console.log(deepCopy1(obj1));


/**
 * 简单深拷贝2，对象中有函数的情况是不会拷贝的
 * @param source
 * @returns {*}
 */
var deepCopy2 = function (source) {
    var _obj = JSON.stringify(source),
        objClone = JSON.parse(_obj);
    return objClone
};

console.log("deepCopy2:");
console.log(deepCopy2(obj));
console.log(deepCopy2(obj1));

/**
 * 考虑了空，数组，对象拷贝的情况
 * @param source
 * @returns {*}
 */
function deepCopy(source) {
    var result=Array.isArray(source) ? [] : {};
    for(var key in source){
        if(source[key]==null||typeof source[key]!='object'){
            result[key]=source[key];
        }else if(typeof source[key]=='object'){
            if(typeof source[key].length=='number'){
                result[key]=source[key];
            }else{
                result[key]=deepCopy(source[key]);
            }
        }
    }
    return result;
}
console.log("deepCopy:");
console.log(deepCopy(obj));
console.log(deepCopy(obj1));
