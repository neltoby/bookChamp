import produce from 'immer'
import {questions} from '../processes/questions'
import isJson from '../processes/isJson'
import {CORRECT, WRONG, DISPLAYED, PLAYED, NEXT, INCREASE_SCORE, DECREASE_SCORE, 
    SKIP, ACTIVE, TIME_OUT, PLAY_AGAIN, ANSWER, CORRECT_ANS, SET_TIME, 
    PLAYED_CURRENT, RESET_PLAYED_CURRENT, SET_OVERLAY} from '../actions/quiz'


const initialState = {
    recievedQuestion: isJson(questions),
    question: isJson(questions),
    score: parseFloat('0.00'),
    current: 0,
    played: [],
    displayed: [],
    correct : [],
    wrong: [],
    skipped: [],
    setTime: '',
    status: 'active',
    times: 0,
    setOverlay: 'cancel',
    playedCurrent: 0,
    answer: false,
    correctAns: false,
}

export default function quizReducer (state = initialState, action) {
    switch (action.type) {
        case PLAY_AGAIN: {
            return produce(state, draft => {
                draft.score = parseFloat('0.00')
                draft.current = 0
                draft.displayed = []
                draft.correct = []
                draft.wrong = []
                draft.played = []
                draft.skipped = []
                draft.status = 'active'
                draft.times = state.times + 1
                draft.setOverlay = 'cancel'
                draft.answer = false
                draft.correctAns = false
                draft.setTime = (Date.now() / 1000) + 32,
                draft.playedCurrent = 0
            })
        }
        case RESET_PLAYED_CURRENT: {
            return produce(state, draft => {
                draft.playedCurrent = action.payload
            })
        }
        case SET_OVERLAY: {
            return produce(state, draft => {
                console.log('from quizReducer')
                if(state.setOverlay === 'end' && action.payload === 'timeOut'){
                    draft.setOverlay = 'end'                
                }else if(state.setOverlay === 'timeOut' && action.payload === 'end'){
                    draft.setOverlay = 'timeOut'
                }else{
                    draft.setOverlay = action.payload                
                }
            })
        }
        case PLAYED_CURRENT: {
            return produce(state, draft => {
                draft.playedCurrent = state.playedCurrent + 1
            })
        }
        case SET_TIME: {
            return produce(state, draft => {
                draft.setTime = action.payload
            })
        }
        case CORRECT_ANS: {
            return produce(state, draft => {
                draft.correctAns = action.payload
            })
        }
        case ANSWER: {
            return produce(state, draft => {
                draft.answer = action.payload
            })
        }
        case INCREASE_SCORE: {
            return produce(state, draft => {
                draft.score = parseFloat(parseFloat(state.score) + parseFloat('3.00')).toFixed(2)
            })
        }
        case DECREASE_SCORE: {
            return produce(state, draft => {
                draft.score = parseFloat(parseFloat(state.score) - parseFloat('0.10')).toFixed(2)
            })
        }
        case PLAYED: {
            return produce(state, draft => {
                draft.played.push(action.payload)
            })
        }
        case CORRECT: {
            return produce(state, draft => {
                draft.correct.push(action.payload)
            })
        }
        case WRONG: {
            return produce(state, draft => {
                draft.wrong.push(action.payload)
            })
        }
        case DISPLAYED: {
            return produce(state, draft => {
                draft.displayed.push(action.payload)
            })
        }
        case NEXT: {
            return produce(state, draft => {
                draft.current = state.current + 1
            })
        }
        case SKIP: {
            return produce(state, draft => {
                draft.skipped.push(action.payload)
            })
        }
        case ACTIVE: {
            return produce(state, draft => {
                draft.status = 'active'
            })
        }
        case TIME_OUT: {
            return produce(state, draft => {
                draft.status = 'time_out'
                draft.setTime = ''
            })
        }
        default: {
            return state
        }
    }
}