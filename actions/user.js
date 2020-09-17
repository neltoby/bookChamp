export const USER_PROFILE = 'USER_PROFILE'
export const UPDATE_USER = 'UPDATE_USER'

export const userProfile = payload => {
    return {
        type: USER_PROFILE,
        payload
    }
}

export const updateUser= payload => {
    return {
        type: UPDATE_USER,
        payload
    }
}