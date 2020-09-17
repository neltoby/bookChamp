import produce from 'immer'
import {displayItems} from '../processes/displayItems'
import {LIKE, ARCHIVE, UNARCHIVE, SETARTICLE, LOADING_ARTICLE, 
    ARTICLE_REMOVE_ERR, LOADING_ARTICLE_STOP, ARTICLE_LOADING_FAILED} from '../actions/learn'
import isJson from '../processes/isJson'

const initialState = {
    displayItems: [],
    loading_article: false,
    load_error: false,
}

export default function learnReducer (state = initialState, action) {
    switch (action.type) {
        case LIKE: {
            return produce(state, draft => {
                let newItem = state.displayItems.slice()
                let newItemRes = newItem.map((item, i) => {
                    item=isJson(item)
                    if(item.id == action.payload){
                        if(item.liked === true){
                            item.likeCount = item.likeCount - 1
                            item.liked = false 
                        }else{
                            item.likeCount = item.likeCount + 1
                            item.liked = true
                        }          
                    }
                    return item
                }) 
                draft.displayItems = isJson(newItemRes)
            })
        }
        case ARCHIVE: {
            return produce(state, draft => {
                let newItem = state.displayItems.slice()
                let newItemRes = newItem.map((item, i) => {
                    item = isJson(item)
                    if(item.id == action.payload.item.id){
                        if(item.archived === false){
                            item.archived = true
                        }         
                    }
                    return item
                }) 
                draft.displayItems = isJson(newItemRes)
            })
        }
        case UNARCHIVE: {
            return produce( state, draft => {
                let newDisplay = isJson(state.displayItems.slice())
                draft.displayItems = newDisplay.map((element, i) => {
                    element=isJson(element)
                    if(element.id == action.payload){
                        element.archived = false
                    }
                    return element
                })
            })
        }
        case SETARTICLE: {
            return produce(state, draft => {
                draft.displayItems = action.payload
            })
        }
        case LOADING_ARTICLE: {
            return produce(state, draft => {
                draft.loading_article = true
            })
        }
        case LOADING_ARTICLE_STOP: {
            return produce(state, draft => {
                draft.loading_article = false
            })
        }
        case ARTICLE_LOADING_FAILED: {
            return produce(state, draft => {
                draft.load_error = true
            })
        }
         case ARTICLE_REMOVE_ERR: {
             return produce(state, draft => {
                 draft.load_error = false
             })
         }
        default: {
            return state
        }
    }
}