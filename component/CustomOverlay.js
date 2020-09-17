import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import { useFocusEffect } from '@react-navigation/native'
import Animated from 'react-native-reanimated'
import { StyleSheet, ScrollView, BackHandler } from 'react-native'
import deviceSize from '../processes/deviceSize'

const {Value, spring} = Animated

 export const config = () => {
    return{
        damping: 10,
        mass: 1,
        stiffness: 100,
        overshootClamping: false,
        restSpeedThreshold: 0.001,
        restDisplacementThreshold: 0.001,
    }
 }

const AnimatedContents = Animated.createAnimatedComponent(ScrollView)

export default function CustomOverlay(props) {
    const {isVisible} = props
    const windowHeight = deviceSize().deviceHeight;
    const deviceWidth = deviceSize().deviceWidth
    const editSpringVal = new Value(windowHeight)

    useEffect(() => {
            if(isVisible){
                if(props.animation === 'spring'){
                    spring(editSpringVal, {
                        toValue: 0,
                        ...config()
                    }).start()
                }
            } else{
                if(props.animation === 'spring'){
                    spring(editSpringVal, {
                        toValue: windowHeight,
                        ...config()
                    }).start()
                }
            }              
            return () => {
            }
        }, [isVisible]) 
    

    useEffect(() => {
            const backAction = () => {
                props.backHandler()                                 
                return false                                                
            }

            BackHandler.addEventListener('hardwareBackPress', backAction)
            return () => {
                BackHandler.removeEventListener('hardwareBackPress', backAction)
            }
        }, [])

    console.log(isVisible, 'is isVisible value')

    if(!isVisible) return null
    return (
        <AnimatedContents
            contentContainerStyle={{alignItems: 'stretch'}}
            style={[{...style.overlay,  position: 'absolute', left: 0, height: '100%', width: deviceWidth }, {transform: [{translateY: editSpringVal}]}]}
        >
            {props.children}
        </AnimatedContents>
    )
}

CustomOverlay.defaultProps = {
    isVisible: false, 
    animation: 'spring',
    backHandler: () => {}
}

CustomOverlay.propTypes = {
    children: PropTypes.element.isRequired,
    isVisible: PropTypes.bool.isRequired,
    animation: PropTypes.oneOf(['spring','slide']),
    backHandler: PropTypes.func,
    onClose: PropTypes.func,
}

const style = StyleSheet.create({
    overlay: {
        backgroundColor: 'rgba(0,0,0,0.4)',
        zIndex: 2,
    },
})
