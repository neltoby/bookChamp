import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import deviceSize from '../processes/deviceSize'
import { LinearGradient } from 'expo-linear-gradient'
import { Button } from 'native-base'
import { Input, Icon, Avatar } from 'react-native-elements';

const inputMargin = -15
export default function SetPassword(props) {
    const [notVisible, setNotVisible] = useState(true)
    const [password, setPass] = useState(null)
    const windowHeight = deviceSize().deviceHeight;
    return (
        <>
        <LinearGradient
            colors={['transparent', '#e1efef']}
            style={{...style.gradient, height: windowHeight,}}
        />
        <View style={{...style.changePass}}>
            <View style={style.container}>
                <Input
                    secureTextEntry={notVisible}
                    inputStyle={style.input}
                    inputContainerStyle={{...style.inputs, marginBottom: inputMargin}}
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
                        <Button transparent style={{color: '#fff'}} onPress={() => setNotVisible(!notVisible)}>
                            <Text style={{color: '#fff', fontSize: 14, fontWeight: 'bold'}}>{notVisible ? 'SHOW' : 'HIDE'}</Text>
                        </Button>
                    }     
                    onChangeText={text => setPass(text)}
                /> 
            </View>
            <View style={{...style.container, marginTop: 20, paddingHorizontal: 6}}>
                <Button block onPress={props.openSetting}>
                    <Text style={{color: '#fff', fontWeight: 'bold'}}>CONTINUE</Text>
                </Button>
            </View>
        </View>
        </>
    )
}

const style = StyleSheet.create({
    changePass: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
    },
    gradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
    },
    container: {
        width: '80%',
    },
    label: {
        color: '#fff'
    },
    inputs: {
        borderColor: '#fff',
    },
    input: {
        color: '#fff',
    },
})
