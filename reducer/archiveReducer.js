import produce from 'immer'
import {category} from '../processes/category'
import { ARCHIVE , UNARCHIVE, SEARCH_ARCHIVE, PREV_SEARCH } from '../actions/learn'
import isJson from '../processes/isJson'

const initialState = {
    archive : [], 
    category: isJson(category),
    searchRes: [],
    searchText: [],
    searchTextDisplay: []
}

export default function archiveReducer (state=initialState, action) {
    switch(action.type) {
        case ARCHIVE: {
            return produce(state, draft => {
                let val = false
                state.archive.forEach(element => {
                    if(element.id == action.payload.item.id){
                        val = true
                    }
                });
                if(!val){
                    action.payload.item.archived = true
                    draft.archive.push(action.payload)
                }
            })
        }
        case UNARCHIVE: {
            return produce(state, draft => {
                let newArchive = isJson(state.archive.slice())
                draft.archive = newArchive.filter(element => {
                    element = isJson(element) 
                    let item = isJson(element.item )             
                    if(item.id != action.payload) return element
                })
            })
        }
        case SEARCH_ARCHIVE: {
            return produce(state, draft => {
                let textArr = action.payload.trim().split(' ')
                let newArchive = state.archive.filter((element, i) => {
                    element = isJson(element)
                    // console.log(element, 'line 45 archive reducer')
                    if (textArr.some(arr => element.item.text.includes(arr))) return element
                })
                draft.searchRes = newArchive
                if(!state.searchText.includes(action.payload.trim())){
                    draft.searchText.push(action.payload.trim())
                }
            })
        }
        case PREV_SEARCH: {
            return produce(state, draft => {
                let textArr = action.payload.trim().split(' ')
                let newSearchText = state.searchText.filter((element, i) => {
                    if (textArr.some(arr => element.includes(arr))) return element
                })
                draft.searchTextDisplay = newSearchText
            })
        }
        default: {
            return state
        }
    }
}