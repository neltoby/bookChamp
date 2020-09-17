import producer, { produce } from 'immer'
import { USER_PROFILE, UPDATE_USER } from '../actions/user'

const initialState = {
    id: 2,
    username: "tunjiman",
    email: "foobaratar@example.com",
    phone_number: "08193455578355",
    fullname: "Tunji Olagunju",
    institution: "University Of Benin",
    date_of_birth: null,
    gender: "male",
}

export default function(state = initialState, action){
    switch(action.type) {
        case USER_PROFILE: {
            return produce( state, draft => {
                draft = action.payload
            })
        }
        case UPDATE_USER: {
            return produce( state, draft => {
                draft[payload.name] = payload.value
            }) 
        }
        default:
            return state
        
    }
}