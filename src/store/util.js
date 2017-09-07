export default function dateTime(ts) {
    return ts.substr(0, 10)
}

export function delCookie(name) {
    let exp = new Date();
    exp.setTime(exp.getTime() - 1);
    let cval = getCookie(name);
    if (cval != null)
        document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}


//读取cookies
export function getCookie(name) {
    let arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");

    arr = document.cookie.match(reg)
    if (arr.length > 2)
        return (arr[2]);
    else
        return null;
}

export function setCookie(c_name, value, expiredays) {
    let exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays);
    document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
}

export function parseToken(jwtTokenString) {
    let base64Url = jwtTokenString.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    let user = JSON.parse(jsonPayload);
    console.log(user)

    localStorage.setItem("token", jwtTokenString);
    localStorage.setItem("expire_at", user.exp);
    return user;
}

export function isJWTokenExpire() {
    let time = localStorage.getItem("expire_at")
    if (!time) {
        return true
    }
    return Date.parse(time) < Date.now()
}