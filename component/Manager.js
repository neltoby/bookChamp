import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Decider from './Decider'
import SignUp from './SignUp'
import Login from './Login'
import Home from './Home'
import Username from './Username'
import Welcome from './Welcome'
import {_retrieveData} from '../processes/keys'
import { useSelector } from 'react-redux'
import isJson from '../processes/isJson';
import {LOGGEDIN} from '../actions/login'

const Stack = createStackNavigator();

const Manager = () => {
    const store = isJson(useSelector(state => state))
    return(
        <SafeAreaProvider>
            <NavigationContainer>
                <Stack.Navigator initialRouteName={store.login.login === LOGGEDIN ? 'Home' : 'Login'}>
                    <Stack.Screen name="Username" component={Username} options={{headerShown: false}} />
                    <Stack.Screen name="SignUp" component={SignUp} options={{headerShown: false}} />
                    <Stack.Screen name="Login" component={Login} options={{headerShown: false}} />
                    <Stack.Screen name="Home" component={Home}  options={{headerShown: false}} />
                    <Stack.Screen name="Welcome" component={Welcome} options={{headerShown: false}} />
                </Stack.Navigator>
            </NavigationContainer>
        </SafeAreaProvider>
    )
}
export default Manager