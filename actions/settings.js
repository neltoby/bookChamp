export const SET_PERSONAL_INFO = 'SET_PERSONAL_INFO'

export const setInfo = payload => {
    return {
        type: SET_PERSONAL_INFO,
        payload
    }
}