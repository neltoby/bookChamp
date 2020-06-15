import { combineReducers } from 'redux'
import loginReducer from './loginReducer'
import quizReducer from './quizReducer'
import learnReducer from './learnReducer'
import archiveReducer from './archiveReducer'
import requestReducer from './requestReducer'

export default combineReducers({
    login: loginReducer,
    quiz: quizReducer,
    learn: learnReducer,
    archive: archiveReducer,
    request: requestReducer,
  })