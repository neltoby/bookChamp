export const CORRECT = 'CORRECT'
export const WRONG = 'WRONG'
export const INCREASE_SCORE = 'INCREASE_SCORE'
export const DECREASE_SCORE = 'DECREASE_SCORE'
export const DISPLAYED = 'DISPLAYED'
export const NEXT = 'NEXT'
export const ACTIVE = 'ACTIVE'
export const TIME_OUT = 'TIME_OUT'
export const SKIP = 'SKIP'
export const PLAYED = 'PLAYED'
export const SET_OVERLAY = 'SET_OVERLAY'
export const PLAY_AGAIN = 'PLAY_AGAIN'
export const ANSWER = 'ANSWER'
export const CORRECT_ANS = 'CORRECT_ANS'
export const SET_TIME = 'SET_TIME'
export const PLAYED_CURRENT = 'PLAYED_CURRENT'
export const RESET_PLAYED_CURRENT = 'RESET_PLAYED_CURRENT'

export const answered = payload => {
    return {
        type: ANSWER,
        payload: payload
    }
}

export const setOverlay = payload => {
    console.log('setOlays called')
    return {
        type: SET_OVERLAY,
        payload,
    }
}
export const resetplayedCurrent = payload => {
    return {
        type: RESET_PLAYED_CURRENT,
        payload: payload
    }
}
export const playedCurrent = () => {
    return {
        type: PLAYED_CURRENT,
    }
}
export const settime = payload => {
    return {
        type: SET_TIME,
        payload: payload
    }
}
export const correctAns = payload => {
    return {
        type: CORRECT_ANS,
        payload: payload,
    }
}
export const playingAgain = () => {
    return {
        type: PLAY_AGAIN,
    }
}
export const played = payload => {
    return {
        type: PLAYED,
        payload: payload
    }
}
export const increaseScore = () => {
    return {
        type: INCREASE_SCORE,
    }
}
export const decreaseScore = () => {
    return {
        type: DECREASE_SCORE,
    }
}
export const correctAnswers = payload => {
    return {
        type: CORRECT,
        payload: payload
    }
}
export const wrongAnswers = payload => {
    return {
        type: WRONG,
        payload: payload
    }
}
export const displayedQuestion = payload => {
    return {
        type: DISPLAYED,
        payload: payload
    }
}
export const skip = payload => {
    return {
        type: SKIP,
        payload: payload,
    }
}
export const next = () => {
    return {
        type: NEXT
    }
}
export const active = () => {
    return {
        type: ACTIVE
    }
}
export const timeOut = () => {
    return {
        type: TIME_OUT
    }
}
