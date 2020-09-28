import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import { useFocusEffect } from '@react-navigation/native'
import Animated, { Easing } from 'react-native-reanimated'
import { StyleSheet, ScrollView, BackHandler } from 'react-native'
import deviceSize from '../processes/deviceSize'

const {Value, spring, timing, useCode, call} = Animated

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
    const {isVisible, animation, backgroundColor, alignItems, justifyContent} = props
    const windowHeight = deviceSize().deviceHeight;
    const deviceWidth = deviceSize().deviceWidth
    const editSpringVal = new Value(windowHeight)

    useEffect(() => {
            if(isVisible){
                if(animation === 'spring'){
                    spring(editSpringVal, {
                        toValue: 0,
                        ...config()
                    }).start()
                }else{
                    if(animation === 'slide'){
                        timing(editSpringVal, {
                            duration: 400,
                            toValue: 0,
                            easing: Easing.inOut(Easing.ease),
                        }).start()
                    }
                }
            } else{
                
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
    const styleOption = animation === 'slide' ? [{...style.overlay, backgroundColor, position: 'absolute', height: '100%', width: deviceWidth }, {transform: [{translateY: editSpringVal}]}] : 
    animation === 'spring' ? [{...style.overlay, backgroundColor, position: 'absolute', left: 0, height: '100%', width: deviceWidth }, {transform: [{translateY: editSpringVal}]}] : 
    [{...style.overlay, backgroundColor, position: 'absolute', top: 0, left: 0, height: '100%', width: deviceWidth }]


    if(!isVisible) return null
    return (
        <AnimatedContents
            contentContainerStyle={{alignItems, justifyContent}}
            style={styleOption}
        >
            {props.children}
        </AnimatedContents>
    )
}

CustomOverlay.defaultProps = {
    isVisible: false, 
    animation: 'spring',
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'stretch',
    justifyContent: 'center',
    backHandler: () => {}
}

CustomOverlay.propTypes = {
    children: PropTypes.element.isRequired,
    isVisible: PropTypes.bool.isRequired,
    animation: PropTypes.oneOf(['spring','slide', 'none']),
    backHandler: PropTypes.func,
    onClose: PropTypes.func,
    backgroundColor: PropTypes.string,
    alignItems: PropTypes.oneOf(['stretch', 'flex-start', 'flex-end', 'center']),
    justifyContent: PropTypes.oneOf(['space-around', 'space-evenly', 'space-between', 'flex-start', 'flex-end', 'center']),
}

const style = StyleSheet.create({
    overlay: {
        zIndex: 2,
    },
})
