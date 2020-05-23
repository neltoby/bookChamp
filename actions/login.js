export const LOGGEDIN = 'LOGGEDIN'
export const NOTLOGGEDIN = 'NOTLOGGEDIN'


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