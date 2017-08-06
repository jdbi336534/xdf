// 格式化时间
export const formatTime = (t, b) => {
        let d = new Date();
        d.setTime(t);
        let Y = d.getFullYear();
        let M = d.getMonth() + 1;
        let D = d.getDate();
        let h = d.getHours();
        let m = d.getMinutes();
        let s = d.getSeconds();
        M = M < 10 ? ('0' + M) : M;
        D = D < 10 ? ('0' + D) : D;
        h = h < 10 ? ('0' + h) : h;
        m = m < 10 ? ('0' + m) : m;
        s = s < 10 ? ('0' + s) : s;
        if (b) {
            return Y + '-' + M + '-' + D;
        } else {
            return Y + '-' + M + '-' + D + ' ' + h + ':' + m + ':' + s;
        }
    }
    // 对Date的扩展，将 Date 转化为指定格式的String
    // 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
    // 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
    // 例子： 
    // (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
    // (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18 
export const Format = function(date, fmt) {
        let d = new Date();
        d.setTime(date);
        let o = {
            'M+': d.getMonth() + 1, // 月份
            'd+': d.getDate(), // 日
            'h+': d.getHours(), // 小时
            'm+': d.getMinutes(), // 分
            's+': d.getSeconds(), // 秒
            'q+': Math.floor((d.getMonth() + 3) / 3), // 季度
            'S': d.getMilliseconds() // 毫秒
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (d.getFullYear() + '').substr(4 - RegExp.$1.length));
        for (let k in o) {
            if (new RegExp('(' + k + ')').test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
            }
        }
        return fmt;
    }
    // 过滤对象
export const JSONer = (obj) => {
    return JSON.parse(JSON.stringify(obj))
}

// 获取用户id
export const getUserId = () => {
    let userId;
    try {
        userId = JSON.parse(sessionStorage.userInfo).id;
    } catch (e) {}
    return userId;
}

// 获取用户信息
export const getUserInfo = () => {
    let userId;
    try {
        userId = JSON.parse(sessionStorage.userInfo);
    } catch (e) {}
    return userId;
}

// 随机选择器id
export const rId = () => {
    let data = new Date();
    return 'random_id' + data.getTime();
}

/**
 * 遍历所有对象，去掉首尾空格
 */
export const Objtrim = (obj) => {
    for (var p in obj) {
        if (typeof obj[p] === 'string') {
            obj[p] = obj[p].replace(/(^\s*)|(\s*$)/g, '');
        }
    }
    return obj;
}

/**
 * 将true或者false转换为1和0
 */
export const boolTonum = (a) => {
    if (a === true) {
        return 1;
    } else if (a === false) {
        return 0;
    } else {
        return a;
    }
}

/**
 * 遍历所有数组对象，将所有value数字类型数字转换为字符串类型
 */
export const ObjtoString = (arr) => {
    for (var p in arr) {
        if (typeof arr[p].value === 'number') {
            arr[p].value = arr[p].value.toString();
        }
    }
    return arr;
}

/**
 * 递归遍历省市级联选择，将所有value数字类型数字转换为字符串类型（当然目前没有用到）
 */
export const CasctoString = (arr) => {
    for (var p in arr) {
        if (typeof arr[p].value === 'number') {
            arr[p].value = arr[p].value.toString();
        }
        if (arr[p].children || Object.prototype.toString.call(arr[p].children) === '[object Array]') {
            CasctoString(arr[p].children);
        }
    }
    return arr;
}

/**
 * 遍历所有数组对象，将所有id数字类型数字转换为字符串类型
 */
export const ArrtoString = (arr) => {
    for (var p in arr) {
        if (typeof arr[p].id === 'number') {
            arr[p].id = arr[p].id.toString();
        }
    }
    return arr;
}

/**
 * 将单选框值改变为需要的
 */
export const Checkbox = (a) => {
    if (a) {
        if (a === 1) {
            return '启用'
        } else if (a === 2) {
            return '禁用'
        }
    }
}

/**
 * 对级联选择判断，取数组最后一位
 */
export const Getcity = (a) => {
    if (a) {
        if (a.length > 0) {
            return a[a.length - 1];
        } else {
            return '';
        }
    } else {
        return '';
    }
}

/**
 * 将级联选择的最后一位解析为三维数字
 */
export const getCascad = (a) => {
    var arr = [];
    if (a !== null || a !== '') {
        arr[0] = parseInt(a / 10000) * 10000;
        arr[1] = parseInt(a / 100) * 100;
        arr[2] = a;
    }
    return arr;
}

/**
 * 将string类型的转换为number类型的
 */
export const myToNumber = (a) => {
    if (a !== null || a !== '') {
        return parseInt(a);
    } else {
        return '';
    }
}

/**
 * 存储localStorage
 */
export const setStore = (name, content) => {
    if (!name) return;
    if (typeof content !== 'string') {
        content = JSON.stringify(content);
    }
    window.localStorage.setItem(name, content);
}

/**
 * 获取localStorage
 */
export const getStore = name => {
    if (!name) return;
    return window.localStorage.getItem(name);
}

/**
 * 存储sessionStorage
 */
export const setSessionStore = (name, content) => {
    if (!name) return;
    if (typeof content !== 'string') {
        content = JSON.stringify(content);
    }
    window.sessionStorage.setItem(name, content);
}

/**
 * 获取sessionStorage
 */
export const getSessionStore = name => {
    if (!name) return;
    var obj = window.sessionStorage.getItem(name);
    try {
        return JSON.parse(obj);
    } catch (e) {
        return obj
    }
}

/**
 * 删除sessionStorage
 */
export const removeSessionStore = name => {
    if (!name) return;
    window.sessionStorage.removeItem(name);
}

/**
 * 删除localStorage
 */
export const removeStore = name => {
        if (!name) return;
        window.localStorage.removeItem(name);
    }
    /**
     * 将B自动转换为合适的单位
     */
export const bytesToSize = bytes => {
    if (!bytes) {
        return '';
    } else {
        if (bytes === 0) return '0 B';
        var k = 1024; // or 1024
        var sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        var i = Math.floor(Math.log(bytes) / Math.log(k));
        return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
    }
}
