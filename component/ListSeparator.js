import React, { useRef } from 'react'
import Animated, { Easing } from 'react-native-reanimated';
import { View, Text, StyleSheet } from 'react-native'
import {  Icon } from 'react-native-elements';
import deviceSize from '../processes/deviceSize'
import { useFocusEffect } from '@react-navigation/native'

const { Value, timing } = Animated;

export default function ListSeparator(props) {
    const deviceHeight = deviceSize().deviceHeight
    const animVal = new Value(deviceHeight)
    const {edit} = props
    
    useFocusEffect(
        React.useCallback(() => {
            timing(animVal, {
                delay: (props.time + 1)*100,
                duration: 1000,
                toValue: 0,
                easing: Easing.inOut(Easing.ease),
            }).start()
            return () => {
                animVal.setValue(deviceHeight)
                // Animated.spring(springVal, {
                //     duration: 1000,
                //     toValue: -windowHeight,
                // }).start(({finished}) => console.log(springVal))
            }
        }, [edit]) 
    )
    return (
        <Animated.View style={{...style.container, marginTop: animVal}}>
            <View style={style.icon}>
                <Icon
                    type='material'
                    name={props.data.icon}
                    size={24}
                    color='#f1f1f1'
                />
                
            </View>
            <View style={style.text}>
                <Text style={style.title}>{Object.keys(props.data)[0]}</Text>
                <Text style={style.str}>
                    {Object.values(props.data)[0]}
                </Text>
            </View>
        </Animated.View>
    )
}

 const style = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',      
        padding: 10,
        marginBottom: 15,
    },
    icon: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '15%',
    },
    text: {
        alignItems: 'flex-start',
        justifyContent: 'center',
        width: '85%',
        borderBottomColor: '#f1f1f1',
        borderBottomWidth: 1,
    },
    str: {
        fontSize: 18,
        fontWeight: '700',
        color: '#f1f1f1',
    },
    title: {
        color: '#f1f1f1'
    }
 })