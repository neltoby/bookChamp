export const LIKE = 'LIKE'
export const ARCHIVE = 'ARCHIVE'
export const UNARCHIVE = 'UNARCHIVE'
export const PREV_SEARCH = 'PREV_SEARCH'
export const SEARCH_ARCHIVE = 'SEARCH_ARCHIVE'

export const like = payload => {
    return {
        type: LIKE,
        payload: payload
    }
}
export const archived = payload => {
    return {
        type: ARCHIVE,
        payload: payload
    }
}
export const unarchive = payload => {
    return {
        type: UNARCHIVE,
        payload: payload
    }
}
export const searchArchive = payload => {
    return {
        type: SEARCH_ARCHIVE,
        payload: payload
    }
}
export const prevSearchDispatcher = payload => {
    return {
        type: PREV_SEARCH,
        payload: payload
    }
}

