import React from 'react'
import { StyleSheet } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Container as NBContainer } from 'native-base';
import deviceSize from '../processes/deviceSize'

export default function Container(props) {
    const { children } = props
    const windowHeight = deviceSize().deviceHeight

    return (
        <NBContainer style={{backgroundColor: '#054078'}}>
            <LinearGradient
                colors={['transparent', '#e1efef']}
                style={{...style.gradient, height: windowHeight,}}
            />
            {children} 
        </NBContainer>
    )
}

const style = StyleSheet.create({
    gradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
    },
})
