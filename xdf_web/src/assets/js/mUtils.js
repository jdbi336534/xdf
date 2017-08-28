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
 * 获取cookie
 */
export const getCookie = (name) => {
  if (document.cookie.length > 0) {
    let start = document.cookie.indexOf(name + '=');
    console.log(start);
    if (start !== -1) {
      start = start + name.length + 1
      let end = document.cookie.indexOf(';', start)
      if (end === -1) end = document.cookie.length
      return unescape(document.cookie.substring(start, end))
    }
  }
  return ''
}
/**
 * 设置cookie
 */
export const setCookie = (name, value, expiredays) => {
  var exdate = new Date()
  exdate.setDate(exdate.getDate() + expiredays)
  document.cookie = name + '=' + escape(value) +
    ((expiredays == null) ? '' : ';expires=' + exdate.toGMTString())
}
/**
 * 检查cookie
 */
// export const checkCookie = () => {
//   let username = getCookie('xdf_name')
//   if (username != null && username != "") {
//     alert('Welcome again ' + username + '!')
//   } else {
//     username = prompt('Please enter your name:', "")
//     if (username != null && username != "") {
//       setCookie('username', username, 365)
//     }
//   }
// }
