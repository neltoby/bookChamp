import {loginStatus, login} from './login'
import {storeKey, getKey} from '../processes/keyStore'
import {loginValue, confirm} from '../processes/lock'
import { onArticleSuccess, setArticle, articleErrDis, onFailedLike,
    setSubject, likeDisperse, archiveDisperse, archived, like } from './learn'
import { registerPoint } from './quiz'
import { db } from '../processes/db'
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
        // console.log(error.message)
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
            console.log('getArticles was called')
        // set article array to empty
        dispatch(setArticle([])) 

        // set the selected subject
        dispatch(setSubject(payload))

        // get token from securestore
        const val = await getKey(loginValue)
        // set headers and other params
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
            request(`articles?category=${payload.toLowerCase()}`, param, callback, err, dispatch)
        }
            
        })()
        
    }
}

export const likeFxn = payload => {
    return function(dispatch, getState){
        (async () => {
            // dispatch the like id to update redux store
            dispatch(like(payload))
            // get token from securestore
            const val = await getKey(loginValue)
            // set headers and other params
            const param = {
                method: 'GET',
                headers:{
                    'Authorization': `Token ${val}`
                }          
            }
            if(val !== undefined && val !== null){
                await fetch(`${domain}articles/${payload}/like`, param)
                .then(res => res.json())
                .then(json => {
                    console.log(json, ' from like at line 148')
                    return dispatch(likeDisperse({id: json.id, state: 1}))
                })
                .catch(err => {
                    console.log(err)
                    return dispatch(onFailedLike({id: payload, state: 1}))
                    // return showTaoster({text:'Poor network', type: 'danger', })
                })
            }
        })()
    }
}

export const unlikeFxn = payload => {
    return function(dispatch, getState){
        (async () => {
            // dispatch the like id to update redux store
            dispatch(like(payload))
            // get token from securestore
            const val = await getKey(loginValue)
            // set headers and other params
            const param = {
                method: 'GET',
                headers:{
                    'Authorization': `Token ${val}`
                }          
            }
            if(val !== undefined && val !== null){
                await fetch(`${domain}articles/${payload}/unlike`, param)
                .then(res => res.json())
                .then(json => {
                    console.log(json, 'from unlike at line 177')
                    dispatch(likeDisperse({id: json.id, state: 0}))
                })
                .catch(err => {
                    console.log(err)
                    return dispatch(onFailedLike({id: payload, state: 0}))
                    // return showTaoster({text:'Poor network', type: 'danger', })
                })
            }
        })()
    }
}

export const archiveFxn = payload => {
    return function(dispatch, getState){
        (async () => {
            dispatch(archived(payload))
            // get token from securestore
            const val = await getKey(loginValue)
            // set headers and other params
            const param = {
                method: 'GET',
                headers:{
                    'Authorization': `Token ${val}`
                }          
            }
            if(val !== undefined && val !== null){
                fetch(`${domain}articles/${payload.item.id}/archive`, param)
                .then(res => res.json())
                .then(json => {
                    console.log(json, ' from archive at line 206')
                    return dispatch(archiveDisperse({...payload, state: 1}))
                })
                .catch(err => dispatch(onFailedArchive({...payload, state: 1})))
                    // return showTaoster({text:'Poor network', type: 'danger', })
                
            }
        })()
    }
}

export const unarchiveFxn = payload => {
    return function(dispatch, getState){
        (async () => {
            // articles/2
            // get token from securestore
            const val = await getKey(loginValue)
            // set headers and other params
            const param = {
                method: 'GET',
                headers:{
                    'Authorization': `Token ${val}`
                }          
            }
            if(val !== undefined && val !== null){
                await fetch(`${domain}articles/${payload.item.id}/unarchive`, param)
                .then(res => res.json())
                .then(json => {
                    console.log(json, 'from unarchive at line 236')
                    dispatch(archiveDisperse({...payload, state: 0}))
                })
                .catch(err => dispatch(onFailedArchive({...payload, state: 0})))
            }
        })()
    }
}

// buy points 
export const buyPoints = payload => {
    return function (dispatch, getState) {
        ( async () => {
            // get token from securestore
            const val = await getKey(loginValue)

            // settin up params
            const param = {
                method: 'POST',
                headers: {
                    'Authorization': `Token ${val}`
                },
                body: JSON.stringify(payload)
            }
            if(val !== undefined && val !== null){
                fetch(`${domain}buy_points`, param)
                .then(res => res.json())
                .then(json => dispatch(registerPoint()))
                .catch(err => console.log(err))
            }
        })()
    }
}

export const SignUp =  ({ payload, navigation })=> {
    return (dispatch, getState) => {
        (async () => {
            // settin up params
            const param = {
                method: 'POST',
                headers: {
                    'Authorization': `Token ${val}`
                },
                body: JSON.stringify(payload)
            }
            fetch(`${domain}signup`, param)
            .then(res => res.json())
            .then(json => {
                const obj = JSON.parse(json)
                if(obj.constructor === Object && obj.token){
                    dispatch(verificationPoint(obj))
                    return obj
                }else throw new Error(obj)               
            })
            .then(obj => storeKey(confirm, obj.token))
            .then(response => navigation.navigate())
            .catch(err => console.log(err))
        })()
    }
}