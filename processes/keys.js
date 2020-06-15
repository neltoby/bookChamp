import {AsyncStorage} from 'react-native'


export const _retrieveData = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key);
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

export const _deleteData = async (key) => {
  try {
      const value = await AsyncStorage.removeItem(key);
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

export const _storeData = async (key, val) => {
    try {
      await AsyncStorage.setItem(
        key,
        val
      );
    } catch (error) {
      // Error saving data
    }
  };