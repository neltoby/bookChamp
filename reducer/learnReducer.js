import produce from 'immer'
import {displayItems} from '../processes/displayItems'
import {LIKE, ARCHIVE, UNARCHIVE} from '../actions/learn'
import isJson from '../processes/isJson'

const initialState = {
    displayItems: isJson(displayItems)
}

export default function learnReducer (state = initialState, action) {
    switch (action.type) {
        case LIKE: {
            return produce(state, draft => {
                let newItem = state.displayItems.slice()
                let newItemRes = newItem.map((item, i) => {
                    item=isJson(item)
                    if(item.id == action.payload){
                        if(item.like === true){
                            item.likeCount = item.likeCount - 1
                            item.like = false 
                        }else{
                            item.likeCount = item.likeCount + 1
                            item.like = true
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
                        if(item.archive === false){
                            item.archive = true
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
                        element.archive = false
                    }
                    return element
                })
            })
        }
        default: {
            return state
        }
    }
}