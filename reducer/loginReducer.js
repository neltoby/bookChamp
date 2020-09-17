import produce from 'immer'
import {LOGGEDIN, NOTLOGGEDIN, LOGIN_STATUS} from '../actions/login'

const initialState = {
    login: '',
    status: 'inactive',
}

export default function loginReducer(state = initialState, action) {
    switch (action.type){
        case LOGGEDIN: {
            return produce(state, draft => {
			    draft.login = action.payload ;			    
			})
        }
        case NOTLOGGEDIN: {
            return produce(state, draft => {
			    draft.login = action.payload ;			    
			})
        }
        case LOGIN_STATUS: {
            return produce(state, draft => {
			    draft.status =  action.payload  		    
			})
        }
        default:{
            return state;
        }
    }
}