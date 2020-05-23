import {AsyncStorage} from 'react-native'


export const _retrieveData = async () => {
    try {
        const value = await AsyncStorage.getItem('b_login');
        if (value !== null) {
        // We have data!!
            return true
        }else{
            return false
        }
    } catch (error) {
        // Error retrieving data
    }
} 