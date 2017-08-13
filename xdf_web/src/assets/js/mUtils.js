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
