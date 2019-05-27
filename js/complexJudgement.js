


/**
 * Created by sumily on 2019/5/27.
 * Version:
 * Description:
 * 8种逻辑判断写法，包括：

 if/else
 switch
 一元判断时：存到Object里
 一元判断时：存到Map里
 多元判断时：将condition拼接成字符串存到Object里
 多元判断时：将condition拼接成字符串存到Map里
 多元判断时：将condition存为Object存到Map里
 多元判断时：将condition写作正则存到Map里
 */
/*****************类型1********************/
/** if else */
/** switch case */
const branch = (identity, status, msg) => {
    switch (identity) {
        case "boss":
            if (status == 1) {

            } else if (status == 2) {

            } else {

            }
            break;
        case "employee":
            switch (status) {
                case 1:
                    console.log(status);
                    ;
                case 2:
                    break;
                default:
                    console.log(msg);
            }

            break;
        default:
            console.log("illegal identity ,illegal invasion!!!");
    }

}


const actionTest = new Map([["hello", ['hello', 'wave your hand']], ["run", 'run fast']]);
actionTest.set('stop', "not move");


/*****************类型2********************/

/**
 * 一维参数
 * 将判断条件作为对象的属性名，将处理逻辑作为对象的属性值，在按钮点击的时候
 * 通过对象属性查找的方式来进行逻辑判断,适合一元条件判断
 * 可以用Object对象和Map两种方式实现
 * 区别：
 * 一个对象通常都有自己的原型，所以一个对象总有一个"prototype"键。
 * 一个对象的键只能是字符串或者Symbols，但一个Map的键可以是任意值。
 * 你可以通过size属性很容易地得到一个Map的键值对个数，而对象的键值对个数只能手动确认。
 * */

const actionsObj = {
    '1': [],
    '2': [],
    '3': [],
    'default': []
};
const actionObjBranch = (status) => {
    let action = actionsObj[status] || actionsObj['default'];
    console.log(action);
//    todo something
};


const actionsMap = new Map([[1, ['hello', 'wave your hand']], [2, 'run fast']]);
const actionMapBranch = (status) => {
    let action = actionsMap.get(status) || actionsMap.gte('default');
    console.log(action);
//    todo something
};


/**
 * 二元逻辑
 * Object  ;Map  二种形式
 * */


//方式一：将参数拼接后作伙Map的Key
const multiActionsMap = new Map([['guest_1', () => {
}], ['guest_1', () => {
}], ['master_1', () => {
}], ['master_1', () => {
}], ['default', () => {
    console.log('default')
}]]);

const multiActionsMapBranch = (identity, status) => {
    console.log('${identity}_${status}');
    let action = multiActionsMap.get(identity + '_' + status) || multiActionsMap.get('default');
    console.log(action, this);
    action.call(this);
//    todo something
};


// 方式二:将参数构建为Object对象，作为Map的Key
const multiActionsMap1 = new Map([
    [{identity: 'guest', status: 1}, () => {
        console.log(this.identity, this.status);
    }], [{identity: 'guest', status: 2}, () => {
        console.log(this.identity, this.status);
    }], [{identity: 'master', status: 1}, () => {
        console.log("999");
    }], [{identity: 'master', status: 2}, () => {
        console.log(this.identity, this.status);
    }], [{identity: 'default', status: 1}, () => {
        console.log(this.identity, this.status);
        console.log('default')
    }]]);

const multiActionsMapBranch1 = (identity, status) => {
    let action = [...multiActionsMap1].filter(([key, value]) => {
        return key.identity == identity && key.status == status;
    });
    console.log(action);
    action.forEach(([key, value]) => {
        value.call(this);
    })
//    todo something
};


//将方法定义到外部
const functionA=()=>{console.log('I am functionA')};
const functionB=()=>{console.log('I am functionB')};
const functionC=()=>{console.log('I am functionC')};
const functionD=()=>{console.log('I am functionD')};
const multiActionsMap2 = new Map([
    [{identity: 'guest', status: 1}, functionA  ], [{identity: 'guest', status: 2}, functionA], [{identity: 'master', status: 1}, functionB], [{identity: 'master', status: 2}, functionC], [{identity: 'default', status: 1},functionD]]);


//将方法定义到内部
const multiActionsMap3 = () => {
    const functionA=()=>{console.log('I am functionA')};
    const functionB=()=>{console.log('I am functionB')};
    const functionC=()=>{console.log('I am functionC')};
    const functionD=()=>{console.log('I am functionD')};
    return new Map([
        [{identity: 'guest', status: 1}, functionA], [{identity: 'guest', status: 2}, functionA], [{
            identity: 'master',
            status: 1
        }, functionB], [{identity: 'master', status: 2}, functionC], [{identity: 'default', status: 1}, functionD]]);
}


//多个分支重复引用同一个方法 1
const multiActionsMap4 = () => {
    const functionA=()=>{console.log('I am functionA')};
    const functionB=()=>{console.log('I am functionB')};

    return new Map([
        [/^guest_[1-4]$/, functionA], [/^master_[5-8]$/, functionB]]);
}

const multiActionsMapBranch4 = (identity, status) => {
    console.log(identity, status);
    let action = [...multiActionsMap4()].filter(([key, value]) => {
        return key.test(identity+'_'+status);
    });

    console.log(action);

    action.forEach(([key, value]) => {
        value.call(this);
    })
//    todo something
};


//多个分支重复引用同一个方法 2
//    大于15小于200     /^1[6-9]$|^[2-9]\d$|^1\d{2}$/
const multiActionsMap5 = () => {
    const functionA=()=>{console.log('I am functionA  00')};
    const functionB=()=>{console.log('I am functionB 11')};

    return new Map([
        [{identity: 'guest', status: /^[1-4]$/}, functionA], [{identity: 'master', status: /^[1-4]$/}, functionB]]);
}


const multiActionsMapBranch5 = (identity, status) => {
    let action = [...multiActionsMap5()].filter(([key, value]) => {
        return key.identity==identity&&key.status.test(status);
    });

    console.log(action);
    action.forEach(([key, value]) => {
        value.call(this);
    })
//    todo something
};
