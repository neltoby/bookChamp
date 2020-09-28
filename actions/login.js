import {db} from '../processes/db'

export const V_NUMBER = 'V_NUMBER'
export const LOGGEDIN = 'LOGGEDIN'
export const NOTLOGGEDIN = 'NOTLOGGEDIN'
export const LOGIN_STATUS = 'LOGIN_STATUS'
export const VERIFICATION = 'VERIFICATION'


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
export const vNumber = payload => {
    return {
        type: V_NUMBER,
        payload
    }
}
export const verification = payload => {
    return {
        type: VERIFICATION,
        payload
    }
}
export const verificationPoint = payload => {
    return (dispatch, getState) => {
        (async () => {
            const sql = 'DROP TABLE IF EXIST user'
            const sqli = 'CREATE TABLE IF NOT EXIST user(id INT PRIMARY KEY, username TEXT, email TEXT, phone_number INT, fullname TEXT, institution TEXT, date_of_birth TEXT, gender TEXT)'
            const sqlii = 'INSERT INTO user( id, username, email, phone_number, fullname, institution, date_of_birth, gender) VALUES(?,?,?,?,?,?,?,?)'
            delete payload.token
            db.transaction(tx => {
                tx.executeSql(sql, null, (txObj, {rowsAffected}) => {
                    txObj.executeSql(sqli, null, (txO, {rowsAffected}) => {
                        txO.executeSql(sqlii, Object.values(payload), (txOI, {rowsAffected}) => {
                            console.log('successful user insert')
                        }, err => console.log(err))
                    }, err => console.log(err))
                }, err => console.log(err))
            }, err => console.log(err),
            () => console.log('user trnsaction success'))
        })()
    }
} 