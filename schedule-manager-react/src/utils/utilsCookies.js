import Cookies from 'js-cookie'
import CryptoJS from 'crypto-js'

const secret = process.env.REACT_APP_SECRET

export const setCookie = (cookieName, value) => {
    Cookies.set(
        cookieName,
        CryptoJS.AES.encrypt(value, secret).toString(),
        {
            expires: 1,
            secure: true,
            sameSite: 'strict',
            path: '/',
        })
}

export const getCookie = (cookieName, decrypt = false) => {
    const cookie = Cookies.get(cookieName)
    if (decrypt) {
        return cookie ? CryptoJS.AES.decrypt(cookie, secret).toString(CryptoJS.enc.Utf8) : null
    }
    return cookie
}

export const removeCookie = (cookieName) => {
    Cookies.remove(cookieName)
}
