import produce from 'immer'
import {LOGGEDIN, NOTLOGGEDIN} from '../actions/login'

const initialState = {
    login: '',
}

export default function homeReducer(state = initialState, action) {
    switch (action.type){
        case LOGGEDIN: {
            return produce(state, draft => {
			    draft.login = action.type ;			    
			})
        }
        case NOTLOGGEDIN: {
            return produce(state, draft => {
			    draft.login = action.type ;			    
			})
        }
        default:{
            return state;
        }
    }
}