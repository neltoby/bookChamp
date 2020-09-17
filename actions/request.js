import {loginStatus, login} from './login'
import {storeKey, getKey} from '../processes/keyStore'
import {loginValue} from '../processes/lock'
import { loadingArticle, loadingArticleStop, onArticleSuccess, 
    setArticle, articleErrDis, articleErrRem } from './learn'

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
            // stop the login activity indicator
            dispatch(loginStatus('inactive'))

            // reset request to the default
            dispatch(awaitingRequest()) 

            // update the login state to LOGGEDIN
            dispatch(login())
        }, 500);
    }
}
const failedLogin = (payload) => {
    return function (dispatch, getState) {
        // set request to failed
        dispatch(failedRequest(payload))
        setTimeout(() => {
            // reset request to the default
            dispatch(awaitingRequest())
            // stop the login activity indicator
            dispatch(loginStatus('inactive'))
        }, 500);
    }
}

export const request = (endpoint, param, callback, errCallback, dispatch) => {
    let fet = (param) ? fetch(`${domain}${endpoint}`, param) : fetch(`${domain}${endpoint}`)
    fet
    .then(res => {
        if(res.status === 200){
            return res.json()
        }else if(endpoint === 'login'){
            throw new Error('A user with this username and password was not found')
        }else{
            throw new Error('Failed request with code '+ res.status)
        }
    })
    .then(res => dispatch(callback(res)))
    .catch(error  => {      
        console.log(error.message)
        // const err = error.message === 'A user with this username and password was not found' ? 
        // 'A user with this username and password was not found' : 'Failed request' ;
        dispatch(errCallback(error.message))
    })
}
export const loginRequest = (body) => {
    return function (dispatch, getState) {
        // set the login activity Indicator rolling
        dispatch(loginStatus('loading'))
        // set the headers of the request
        const param = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }
        // onsuccess callback
        const callback = successLogin
        // onfail callback
        const err = failedLogin
        request('login', param, callback, err, dispatch)
    }
}
export const getArticles = (payload) => {
    return function (dispatch, getState) {
        (async () => {
        // set article array to empty
        dispatch(setArticle([])) 
        // get token from securestore
        const val = await getKey(loginValue)
        const param = {
            method: 'GET',
            headers:{
                'Authorization': `Token ${val}`
            }          
        }
        // onsuccess callback
        const callback = onArticleSuccess
        // onfail callback
        const err = articleErrDis          
        if(val !== undefined && val !== null){
            request('articles', param, callback, err, dispatch)
        }
            
        })()
        
    }
}
