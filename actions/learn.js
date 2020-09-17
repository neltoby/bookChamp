export const LIKE = 'LIKE'
export const ARCHIVE = 'ARCHIVE'
export const UNARCHIVE = 'UNARCHIVE'
export const SETARTICLE = 'SETARTICLE'
export const PREV_SEARCH = 'PREV_SEARCH'
export const SEARCH_ARCHIVE = 'SEARCH_ARCHIVE'
export const LOADING_ARTICLE = 'LOADING_ARTICLE'
export const ARTICLE_REMOVE_ERR = 'ARTICLE_REMOVE_ERR'
export const LOADING_ARTICLE_STOP = 'LOADING_ARTICLE_STOP'
export const ARTICLE_LOADING_FAILED = 'ARTICLE_LOADING_FAILED'

// action function for liking an article
export const like = payload => {
    return {
        type: LIKE,
        payload: payload
    }
}

// sucessfully getting the article
export const onArticleSuccess = (payload) => {
    return function(dispatch, getState) {
        dispatch(setArticle(payload))
        dispatch(loadingArticleStop())
    }
}

// action function for setting the article array
export const setArticle = payload => {
    return {
        type: SETARTICLE,
        payload: payload
    }
}

// action creator for setting article error display page
export const articleLoadingFailed = () => {
    return {
        type: ARTICLE_LOADING_FAILED,
    }
}

// action creator for failed article get
export const articleErrDis = () => {
    return function(dispatch, getState) {
        dispatch(articleLoadingFailed())
        dispatch(loadingArticleStop())
    }
}
export const articleErrRem = () => {
    return {
        type: ARTICLE_REMOVE_ERR,
    }
}

// acton function for archiving an article
export const archived = payload => {
    return {
        type: ARCHIVE,
        payload
    }
}

// action function for unarchiving an article
export const unarchive = payload => {
    return {
        type: UNARCHIVE,
        payload
    }
}

// action creator for serching for archived article
export const searchArchive = payload => {
    return {
        type: SEARCH_ARCHIVE,
        payload
    }
}
export const prevSearchDispatcher = payload => {
    return {
        type: PREV_SEARCH,
        payload
    }
}

// action function for setting upp the loading icon
export const loadingArticle = () => {
    return {
        type: LOADING_ARTICLE
    }
}

// action function for stopping the loading icon
export const loadingArticleStop = () => {
    return {
        type: LOADING_ARTICLE_STOP
    }
}
