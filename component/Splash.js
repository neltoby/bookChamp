import React, { useEffect } from 'react'
import logo from '../processes/image'
import {Animated, View, Text, StyleSheet, Dimensions, Image, StatusBar} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import {getKey} from '../processes/keyStore'
import { loginValue, confirm } from '../processes/lock'
import { useDispatch } from 'react-redux'
import { login, verification } from '../actions/login'

const HEIGHT = Dimensions.get('screen').height
const WIDTH = Dimensions.get('screen').width
const Splash = ({ navigation }) => {
    const dispatch = useDispatch()
    const slideDown = React.useRef(new Animated.Value(0)).current
    useEffect(() => {
        Animated.timing(slideDown, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true
        }).start()
    }, [])
    useEffect(() => {
        (async () => {
            const val = await getKey(loginValue)
            const value = await getKey(confirm)
            console.log(val)
            if(val !== undefined && val !== null){
                dispatch(login())
            }else{
                if(value !== undefined && value !== null){
                    dispatch(verification(true))
                }                
            }
        })()
    })
    
    return (
        <View style={style.container}>
            <StatusBar hidden={false} />
            <LinearGradient
                colors={['transparent', '#34cdeb']}
                style={style.gradient}
            />
            <Animated.Image source={logo()} 
            style={{...style.img, opacity: slideDown}} />
            <Text style={style.text}>
                BY JVEC Solutions
            </Text>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3480eb',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    gradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: HEIGHT/2,
    },
    img: {
        height: 200,
        width: 200,
        borderRadius: 200/2,
        marginBottom: 50,
    }, 
    text: {
        marginTop: 100,
        fontSize: 24,
        fontWeight: 'bold',
        color: 'tomato',
    }
})
export default Splash;