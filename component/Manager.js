import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignUp from './SignUp'
import Login from './Login'
import Home from './Home'
import Username from './Username'
import Welcome from './Welcome'
import UploadDp from './UploadDp'
import ConfirmNumber from './ConfirmNumber'
import { useSelector } from 'react-redux'
import isJson from '../processes/isJson';
import {LOGGEDIN} from '../actions/login'

const Stack = createStackNavigator();

const Manager = () => {
    const store = isJson(useSelector(state => state))
    return(
        <SafeAreaProvider>
            <NavigationContainer>
                {store.login.login !== LOGGEDIN ? (
                        <Stack.Navigator initialRouteName={ store .login.verification ? 'ConfirmNumber' : 'Login' }>
                            <Stack.Screen name="Username" component={Username} options={{headerShown: false}} />
                            <Stack.Screen name="SignUp" component={SignUp} options={{headerShown: false}} />
                            <Stack.Screen name="ConfirmNumber" component={ConfirmNumber} options={{headerShown: false}} />
                            <Stack.Screen name="Login" component={Login} options={{headerShown: false}} />   
                            <Stack.Screen name="UploadDp" component={UploadDp} options={{headerShown: false}} />                         
                        </Stack.Navigator>                   
                ): (
                    <Stack.Navigator initialRouteName='Home'>
                        <Stack.Screen name="Home" component={Home}  options={{headerShown: false}} />
                        <Stack.Screen name="Welcome" component={Welcome} options={{headerShown: false}} />
                    </Stack.Navigator>
                )}
                
            </NavigationContainer>
        </SafeAreaProvider>
    )
}
export default Manager