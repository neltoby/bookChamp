import {Platform} from 'react-native'
import {_retrieveData, _storeData, _deleteData} from './keys'
import * as SecureStore from 'expo-secure-store'

export const storeKey = async (key, value) => {
    try{
        let res 
        if(Platform.OS === 'android'){
            if(Platform.Version < 23){
                res = await _storeData(key, val)
            }else{
                res = await SecureStore.setItemAsync(key, value)
            }
        }else{
            res = await SecureStore.setItemAsync(key, value)
        }  
    } catch(e) {
        console.log(e)
    }
}

export const getKey = async (key) => {
    try{
        let read
        if(Platform.OS === 'android'){
            if(Platform.Version < 23){
                read = await _retrieveData(key)
            }else{
                read = await SecureStore.getItemAsync(key)
            }
        }else{
            read = await SecureStore.getItemAsync(key)
        }
        return read
    }catch(e){
        console.log(e)
    }
}

export const deleteKey = async (key) => {
    try{
        let res
        if(Platform.OS === 'android'){
            if(Platform.Version < 23){
                res = await _deleteData(key)
            }else{
                await SecureStore.deleteItemAsync(key)
            }
        }else{
            await SecureStore.deleteItemAsync(key)
        }
        return res
    }catch(e){
        console.log(e)
    }
}
