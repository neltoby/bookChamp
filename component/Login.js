import React, {useState, useEffect} from 'react'
// import NetInfo from '@react-native-community/netinfo'
import * as Network from 'expo-network';
import { LinearGradient } from 'expo-linear-gradient'
import logo from '../processes/image'
import Overlay from './Overlay';
import { useFocusEffect } from '@react-navigation/native';
// import { realDeviceHeight } from '../processes/deviceSize'
import { Container, Content, Form, Button, Toast, Spinner } from 'native-base'
import { Input, Icon } from 'react-native-elements';
import {loginRequest} from '../actions/request'
import Rolling from './Rolling'
import {StatusBar, View, Text, Image, StyleSheet, Platform, TouchableOpacity, useWindowDimensions} from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import isJson from '../processes/isJson';

const Login = ({navigation}) => {
    const windowHeight = useWindowDimensions().height;
    const deviceWidth = useWindowDimensions().width;
    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [notVisible, setNotVisible] = useState(true) 
    const dispatch = useDispatch()
    const store = isJson(useSelector(state => state))
    const signUp = ()=> {
        navigation.navigate('SignUp')
    }
    const submit = async () => {
        // NetInfo.fetch().then(state => {
        //     console.log('Connection type ', state.type)
        //     console.log('Is connected ', state.isConnected)
        //     // const network = await Network.getNetworkStateAsync();
        //     // console.log(network)
        // })
        try{
            if(username.trim().length && password.length){
                const {isConnected, isInternetReachable} = await Network.getNetworkStateAsync();
                const airplane = await Network.isAirplaneModeEnabledAsync();
                if(airplane){
                    Toast.show(
                        { 
                            text: `Offline mode`, 
                            buttonText: 'CLOSE', 
                        }
                    )
                }else{
                    if(isConnected && isInternetReachable){
                        let body = {username, password}
                        dispatch(loginRequest(body))
                    }
                }
            }else{
                Toast.show(
                    { 
                        text: `Username and password required`, 
                        buttonText: 'CLOSE', 
                    }
                )
            }
        }catch(error){
            console.log(error.message);
            Toast.show(
                { 
                    text: `Network request failed`, 
                    buttonText: 'CLOSE', 
                }
            )
        }
    }
    useFocusEffect(
        React.useCallback(() => {
            if(store.login.login === 'LOGGEDIN'){
                navigation.navigate('Home')
            }
        }, [store.login.login])
    )
    let toast = store.request.status === 'failed' ? 
    Toast.show(
        { 
            text: store.request.err, 
            buttonText: 'CLOSE', 
        }
    ) : '' 
    return(
        <Container style={style.content}>
            <LinearGradient
                colors={['transparent', '#e1efef']}
                style={{...style.gradient, height: windowHeight,}}
            />
            <Content>               
                <StatusBar backgroundColor="#054078" />
                <View style={style.container}>
                    <View style={style.viewImg}>
                        <Image style={style.img} source={logo()}/>
                    </View>
                    <View style={style.divider}>
                        <View style={style.divider1}>
                            <Text style={{...style.text, fontSize: 25, fontWeight: 'bold'}}>LOGIN</Text>
                        </View>
                        <View style={style.divider2}>
                        <TouchableOpacity
                            style={style.button}
                            onPress={signUp}
                        >
                            <Text style={style.text}>SIGN UP</Text>
                        </TouchableOpacity>
                        </View>
                    </View>                   
                </View>
                <View style={style.viewInput}>
                    <Form style={style.form}>
                        <Input
                            inputStyle={style.input}
                            inputContainerStyle={style.inputs}
                            label = 'Username'
                            value={username}
                            labelStyle = {style.label}
                            placeholder="Username"
                            style={style.input}
                            leftIcon={
                                <Icon
                                type='font-awesome'
                                name='user-circle'
                                size={24}
                                color='#fff'
                                />
                            }       
                            onChangeText={value => setUserName(value)}
                        /> 
                        <Input
                            secureTextEntry={notVisible}
                            inputStyle={style.input}
                            inputContainerStyle={style.inputs}
                            label = 'Password'
                            value={password}
                            labelStyle = {style.label}
                            placeholder="Password"
                            style={style.input}
                            leftIcon={
                                <Icon
                                type='material'
                                name='https'
                                size={24}
                                color='#fff'
                                />
                            }  
                            rightIcon={
                                <Icon
                                    type='font-awesome'
                                    name={notVisible ? 'eye' : 'eye-slash'}
                                    size={24}
                                    color='#aaa'
                                    onPress={() => setNotVisible(!notVisible)}
                                />
                            }     
                            onChangeText={value => setPassword(value)}
                        /> 
                            <Button disabled={store.login.status === 'loading' ? true : false} block style={style.but} onPress={() => submit()}>
                                {store.login.status === 'loading' ?
                                    <Spinner color='#eee' /> :
                                    <Text style={{...style.label, fontWeight: 'bold'}}>LOGIN</Text>
                                }
                            </Button>
                    </Form>
                </View>
                <Overlay isVisible={store.login.status === 'loading' ? true : false} >
                    <Rolling text='Logging In...' />
                </Overlay>
            </Content>

        </Container>
    )
}

const style = StyleSheet.create({
    gradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
    },
    content: {
        backgroundColor: '#054078',
    },
    container: {
        alignItems: 'center',
    },
    viewImg: {
        marginVertical: 60,
    },
    img: {
        width: 120,
        height: 120,
        backgroundColor: 'transparent',
    },
    divider: {
        flexDirection: 'row',
        marginBottom: 50,
    },
    divider1: {
        flexDirection: 'row',
        width: '50%',
        paddingRight: 30,
        justifyContent: 'flex-end'
    },
    divider2: {
        width: '50%',
        paddingLeft: 30,
    },
    viewInput: {
        alignItems: 'center'
    },
    form: {
        width: '80%'
    },
    input: {
        color: '#fff',
    },
    inputs: {
        borderColor: '#fff',
    },
    text: {
        fontSize: 23,
        fontWeight: '500',
        color: '#fff',
    },
    label: {
        color: '#fff'
    },
    but: {
        backgroundColor: '#1258ba',
        marginTop: 50
    }
})

export default Login