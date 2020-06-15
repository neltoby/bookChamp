export const LOGGEDIN = 'LOGGEDIN'
export const NOTLOGGEDIN = 'NOTLOGGEDIN'
export const LOGIN_STATUS = 'LOGIN_STATUS'


export const login = () => {
    return {
        type: LOGGEDIN,
        payload: LOGGEDIN
    }
}
export const notLogin = () => {
    return {
        type: NOTLOGGEDIN,
        payload: NOTLOGGEDIN
    }
}
export const loginStatus = payload => {
    return {
        type: LOGIN_STATUS,
        payload: payload
    }
}