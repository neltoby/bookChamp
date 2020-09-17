import produce from 'immer'
import {SET_PERSONAL_INFO} from '../actions/settings'

const initialState = {
    name: '',
    uname: '',
    email: '',
    phone: '',
    password: '',
    date_of_birth: new Date(),
}

export default function settingReducer (state=initialState, action) {
    switch (action.type) {
        case SET_PERSONAL_INFO:{
            return produce(state, draft => {
                draft[action.payload.name] = action.payload.value
            })
            // break;
        }
        default:
            return state
            // break;
    }
}