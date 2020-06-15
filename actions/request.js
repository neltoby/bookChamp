import {loginStatus, login} from './login'
import {storeKey} from '../processes/keyStore'
import {loginValue} from '../processes/lock'

export const AWAITING_REQUEST = 'AWAITING_REQUEST'
export const SUCCESSFUL_REQUEST = 'SUCCESSFUL_REQUEST'
export const FAILED_REQUEST = 'FAILED_REQUEST'
const domain = 'https://bookchamp.herokuapp.com/api/v1/'

export const awaitingRequest = () => {
    return {
        type: AWAITING_REQUEST
    }
}

export const successfulRequest = () => {
    return {
        type: SUCCESSFUL_REQUEST
    }
}

export const failedRequest = payload => {
    return {
        type: FAILED_REQUEST,
        payload
    }
}

const successLogin = (payload) => {
    return function (dispatch, getState) {       
        storeKey(loginValue, payload.token)
        dispatch(successfulRequest())
        setTimeout(() => {
            dispatch(awaitingRequest())
            dispatch(loginStatus('inactive'))
            dispatch(login())
        }, 500);
    }
}
const failedLogin = (payload) => {
    return function (dispatch, getState) {
        dispatch(failedRequest(payload))
        setTimeout(() => {
            dispatch(awaitingRequest())
            dispatch(loginStatus('inactive'))
        }, 500);
    }
}

export const request = (endpoint, param, callback, errCallback, dispatch) => {
    let fet = (param) ? fetch(`${domain}${endpoint}`, param) : fetch(`${domain}${endpoint}`)
    fet.then(response => {
        const status = response.status
        if (status === 200){
            response.json()
            .then(json => {            
                dispatch(callback(json))
            })
        }else{
            response.json()
            .then(json => {
                dispatch(errCallback(json.non_field_errors[0]))
            })
        }
        
    })
    .catch(error  => {
        dispatch(errCallback('Failed request'))
    })
}
export const loginRequest = (body) => {
    return function (dispatch, getState) {
        dispatch(loginStatus('loading'))
        let param = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }
        let callback = successLogin
        let err = failedLogin
        request('login', param, callback, err, dispatch)
    }
}
