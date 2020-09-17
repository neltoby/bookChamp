import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { View, Text, StyleSheet } from 'react-native'
import useTime from './useTime'
import isJson from '../processes/isJson'
import { useSelector } from 'react-redux';

export default function DisplayTime() {
    const store = isJson(useSelector(state => state))
    let time = useTime(store.quiz.setTime)
    return (
        <View style={style.time}>
            <LinearGradient
                colors={['transparent', '#e1efef']}
                style={{...style.gradient, height: 70, width: 70, borderRadius: 35}}
            />
            <Text style={style.textTime}>{time}</Text>
        </View>
    )
}

const style = StyleSheet.create({
    gradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
    },
    time: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
        backgroundColor: '#054078',
        width: 70,
        height: 70,
        borderRadius: 35,
        zIndex: 1,
        paddingBottom: 6,
        position: 'absolute',
        top: -17,
        marginBottom: 0,
    },
    textTime: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#00ff00',
    },
})
