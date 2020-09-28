import produce from 'immer'
import {LOGGEDIN, NOTLOGGEDIN, LOGIN_STATUS, VERIFICATION, V_NUMBER} from '../actions/login'

const initialState = {
    login: '',
    status: 'inactive',
    verification: false,
    v_number : null,
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
        case VERIFICATION: {
            return produce(state, draft => {
			    draft.verification =  action.payload  		    
			})
        }
        case V_NUMBER: {
            return produce(state, draft => {
                draft.v_number = action.payload
            })
        }
        default:{
            return state;
        }
    }
}