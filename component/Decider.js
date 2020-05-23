import React, { useEffect } from 'react'
import {AsyncStorage} from 'react-native'

const Decider = ({ navigation }) => {
    useEffect(() => {
        _retrieveData()                 
    }, [])
    _retrieveData = async () => {
        try {
          const value = await AsyncStorage.getItem('b_login');
          if (value !== null) {
            // We have data!!
            navigation.navigate('Home')
          }else{
            navigation.navigate('Login')
          }
        } catch (error) {
          // Error retrieving data
        }
    };
    return null
}
export default Decider