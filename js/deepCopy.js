
var deepCopy1 = function (source) {
    var result = {};
    for (var key in source) {
        result[key] = typeof source[key] === 'object' ? deepCopy1(source[key]) : source[key];
    }
    return result;
};


function deepCopy(source) {
    var result=Array.isArray(source) ? [] : {};
    for(var key in source){
        // result[key]=typeof source[key]=='object'?deepCopy(source[key]):source[key];
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



var obj={
    test:undefined,
    solar:null,
    member:['song','li','momo'],
    grade:1,
    add:function (a,b) {
        return a+b;
    },
    car:{
        color:'red',
        type:'jeep',
        run:function (v) {
            console.log(v);            }
    }
};
console.log(obj);


var arrObj=["lslsl","sss","dddd"];
var _arrObj=deepCopy(arrObj);
console.log(_arrObj);

var _obj=deepCopy(obj);
console.log(_obj);
var _obj1=deepCopy1(obj);
console.log(_obj1);


console.log(typeof [1,2,3],typeof null);
