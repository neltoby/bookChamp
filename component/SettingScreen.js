import React, { useState, useEffect } from 'react'
import deviceSize from '../processes/deviceSize'
import FocusAwareStatusBar from './FocusAwareStatusBar'
import { LinearGradient } from 'expo-linear-gradient'
import { useFocusEffect } from '@react-navigation/native'
import ListSeparator from './ListSeparator'
import Animated, { Easing } from 'react-native-reanimated';
import { View, Text, Image, StyleSheet, ImageBackground, Keyboard, FlatList, TouchableWithoutFeedback } from 'react-native'
import { Container,  Button,  DatePicker } from 'native-base'
import { Icon} from 'react-native-elements';
import isJson from '../processes/isJson';
import SetPassword from './SetPassword'
import EditBox from './EditBox'
import { useSelector } from 'react-redux';
import CustomOverlay from './CustomOverlay'
import { ScrollView , PanGestureHandler, State } from 'react-native-gesture-handler';
const { 
    Value, 
    timing, 
    spring, 
    block, 
    cond, 
    eq, 
    call, 
    useCode, 
    diffClamp, 
    add, 
    interpolate, 
    set, 
    color 
} = Animated;


const AnimatedImageBg = Animated.createAnimatedComponent(ImageBackground)
const AnimatedContent = Animated.createAnimatedComponent(ScrollView)
const AnimatedContents = Animated.createAnimatedComponent(FlatList)

const SettingScreen = () => {
    const windowHeight = deviceSize().deviceHeight;
    const store = isJson(useSelector(state => state))
    const user = [] 
    Object.entries(isJson(store.user)).forEach(item => {
        let label = item[0]
        let icon = label === 'username' || label === 'fullname' ? 'person' :
            label === 'email' ? 'email' : label === 'phone_number' ? 'call' : 
            label === 'institution' ? 'school' : null 
        if(label === 'username' || label === 'fullname' || 
            label === 'email' || label === 'phone_number' || 
            label === 'institution' || label === 'date_of_birth')
        {
            user.push({
                value: item[1],
                label,
                icon
            })
        }
    })
    const details = [
        {fullname: isJson(store.user).fullname, icon: 'person'},
        {username: isJson(store.user).username, icon: 'person'},
        {email: isJson(store.user).email, icon: 'email'},
        {mobile: isJson(store.user).phone_number, icon: 'call'}
    ]
    user.push({value: 'testuser', label: 'password', icon: 'https'})
    const [verify, setVerify] = useState(false)
    const [edit, setEdit] = useState(false)
    const nameVal = new Value(deviceSize().deviceWidth)
    const springVal = new Value(windowHeight)
    const animatedMargin = new Value(0)
    const HEIGHT = 300
    const dragY = new Value(0) 
    const offsetY = new Value(HEIGHT)   
    const gestureState = new Value(-1);
    const onGestureEvent = event => {
        if(event.nativeEvent.state === State.ACTIVE){
            dragY.setValue(event.nativeEvent.translationY)
            gestureState.setValue(event.nativeEvent.state)
            offsetY.setValue(add(clampedVal, event.nativeEvent.translationY))
        }
  
    }
      
    const transY = cond(
        eq(gestureState, State.ACTIVE),
        add(offsetY, dragY),
        set(offsetY, add(offsetY, dragY)),
    )

    const clampedVal = diffClamp(transY, 0, HEIGHT)
    const translateY = interpolate(clampedVal, {
        inputRange: [0, HEIGHT],
        outputRange: [0, HEIGHT],
        extrapolate: 'clamp'
    })
    const borderRadius = interpolate(translateY, {
        inputRange: [0, HEIGHT], 
        outputRange: [0, 20],
        extrapolate: 'clamp',
    })
    const iconOpacity = interpolate(clampedVal, {
        inputRange: [0, 299, HEIGHT], 
        outputRange: [1, 1, 0],
        extrapolate: 'clamp',
    })
    const endconOpacity = interpolate(clampedVal, {
        inputRange: [0, 299, HEIGHT], 
        outputRange: [0, 0, 1],
        extrapolate: 'clamp',
    })
    const startView = interpolate(clampedVal, {
        inputRange: [0,  HEIGHT], 
        outputRange: [1, 0],
        extrapolate: 'clamp',
    })
    const endView = interpolate(clampedVal, {
        inputRange: [0,  HEIGHT], 
        outputRange: [0, 1],
        extrapolate: 'clamp',
    })
    const animatedHeight = interpolate(clampedVal, {
        inputRange: [0, HEIGHT], 
        outputRange: [200, 0],
        extrapolate: 'clamp',
    })
    const bgColor = color(
        interpolate(clampedVal, {
            inputRange: [0,  HEIGHT], 
            outputRange: [5, 225],
            extrapolate: 'clamp',
        }), 
        interpolate(clampedVal, {
            inputRange: [0,  HEIGHT], 
            outputRange: [64, 225],
            extrapolate: 'clamp',
        }),
        interpolate(clampedVal, {
            inputRange: [0,  HEIGHT], 
            outputRange: [120, 225],
            extrapolate: 'clamp',
        }),
        1
    )
    const editColor = color(
        interpolate(clampedVal, {
            inputRange: [0,  HEIGHT], 
            outputRange: [255, 0],
            extrapolate: 'clamp',
        }), 
        interpolate(clampedVal, {
            inputRange: [0,  HEIGHT], 
            outputRange: [255, 0],
            extrapolate: 'clamp',
        }),
        interpolate(clampedVal, {
            inputRange: [0,  HEIGHT], 
            outputRange: [255, 0],
            extrapolate: 'clamp',
        }),
        1
    )

    useFocusEffect(
        React.useCallback(() => {
            if(verify){
                block([
                    timing(springVal, {                        
                        toValue: 0,
                        duration: 1000,
                        easing: Easing.inOut(Easing.ease),
                    }).start(),
                    timing(nameVal, {
                        duration: 1000,
                        toValue: 25,
                        easing: Easing.inOut(Easing.ease),
                    }).start()
                ])
            }
            return () => {
                if(verify) springVal.setValue(windowHeight)
                if(verify) setVerify(false)
            }
        }, [verify]) 
    )

    useFocusEffect(
        React.useCallback(() => {
            if(verify){
                timing(nameVal, {
                    duration: 1000,
                    toValue: 25,
                    easing: Easing.inOut(Easing.ease),
                }).start()
            }
            return () => {
            }
        }, [edit]) 
    )

    useEffect(() => {
        Keyboard.addListener('keyboardDidShow', _keyboardDidShow)
        Keyboard.addListener('keyboardDidHide', _keyboardDidHide)
        return () => {
            Keyboard.removeListener('keyboardDidShow', _keyboardDidShow)
            Keyboard.removeListener('keyboardDidHide', _keyboardDidHide)
        }
    }, [])
    const _keyboardDidShow = e => {
        timing(animatedMargin, {
            duration: e.duration,
            toValue: e.endCoordinates.height,
            easing: Easing.inOut(Easing.ease),
        }).start()         
    }
    const _keyboardDidHide = e => {
        timing(animatedMargin, {
            toValue: 0,
            duration: e.duration,
            easing: Easing.inOut(Easing.ease),
        }).start()
    }

    const editSpringFalse = () => {
        setEdit(false)
    }
    const editSpring = () => {
        setEdit(true)      
    }
    
    const openSetting = () => {
        setVerify(true)
    }

    // useCode(() => {
    //     return call([borderRadius], (borderRadius) => {
    //         console.log(borderRadius, 'borderRadius')
    //     })
    // }, [borderRadius])

    return(
        <>
        <Container style={{backgroundColor: "#054078"}}>
            <FocusAwareStatusBar barStyle='light-content' backgroundColor='#054078' />
            {verify ? (
            <AnimatedContent style={[style.profileview, {transform: [{translate: springVal}]}]}>
                    
                    <View style={style.profile}>
                        <Image
                            source={require('../img/user.jpg')}
                            style={{width: '100%', height: 300}}                                   
                        />
                        <Animated.View style={{...style.nameText, transform: [{translateX: nameVal}]}}>
                            <Text style={style.name} numberOfLines={1}>
                                {details[0].fullname}
                            </Text>
                        </Animated.View>
                    </View>
                    <View>
                        <LinearGradient
                            colors={['transparent', '#e1efef']}
                            style={{...style.gradient, height: windowHeight ,}}
                        />
                        <View style={style.emptyview}>
                            <Button 
                                transparent
                                style={{paddingHorizontal: 20, paddingVertical: 2, borderColor: '#fff'}}
                            >
                                <Text style={{color: 'yellow', fontWeight: 'bold'}}>Details</Text>
                            </Button>
                            <Button 
                                onPress={editSpring}
                                bordered
                                style={{paddingHorizontal: 20, paddingVertical: 2, borderColor: '#fff'}}
                            >
                                <Text style={{color: '#fff', fontWeight: 'bold'}}>Edit</Text>
                            </Button>
                        </View>
                        <View style={style.list}>
                            {details.map((det, i) => {                       
                                if(Object.keys(det).includes('fullname')){
                                    return null
                                }else{
                                    return <ListSeparator data={det} time={i} key={i} edit={edit} />
                                }
                            })}
                        </View>
                        <View style={style.buttonContainer}>
                            <Button 
                                iconLeft
                                bordered
                                style={style.button}
                            >
                                <Icon
                                    type='material'
                                    name='folder-shared'
                                    size={24}
                                    color='#f1f1f1'
                                    containerStyle={{marginRight: 15}}
                                />
                                <Text style={style.all}>
                                    All Profile
                                </Text>
                            </Button>                    
                        </View> 
                    </View>                               
            </AnimatedContent>
            )
            :
            (   
                <SetPassword openSetting={openSetting} />               
            )
            
            }
        </Container>
        
            {edit && verify ? (
            <CustomOverlay 
                isVisible={edit}
                backHandler={editSpringFalse}
            >
                <PanGestureHandler 
                    maxPointers={1}
                    onGestureEvent={onGestureEvent}
                    onHandlerStateChange={onGestureEvent}
                >
                     
                        <Animated.View                                                                                         
                            style={[{ ...style.titleView, height: windowHeight, borderTopLeftRadius: borderRadius, borderTopRightRadius: borderRadius },{transform: [{translateY: translateY}]}]}
                        >
                            
                            <View>
                                <Animated.View style={[{...style.editHeading}, {backgroundColor: bgColor, borderTopLeftRadius: borderRadius, borderTopRightRadius: borderRadius}]}>
                                    <Animated.View style={[{flex: iconOpacity}, {paddingLeft: 10, justifyContent: 'center'}]}>
                                        <Animated.Text onPress={editSpringFalse} style={[{opacity: iconOpacity, color: editColor, fontWeight: 'bold'}]}>CLOSE</Animated.Text>
                                    </Animated.View> 
                                    <Animated.View style={[{paddingLeft: 15},{flex: 3}]}>
                                        <Animated.Text style={[style.editText, {color: editColor}]}>
                                            Edit Profile
                                        </Animated.Text>
                                    </Animated.View>
                                    <Animated.View style={[{flex: endconOpacity},{paddingRight: 15, alignItems: 'flex-end'}]}>
                                        <Animated.Text onPress={editSpringFalse} style={[{opacity: endconOpacity, fontWeight: 'bold'}]}>CLOSE</Animated.Text>
                                    </Animated.View> 
                                    
                                </Animated.View>
                                <Animated.View style={[{height: animatedHeight}]}>
                                    <AnimatedImageBg source={require('../img/user.jpg')} style={[{flex: 1, justifyContent: 'flex-end', paddingLeft: 15, paddingBottom: 15},{opacity: iconOpacity}]} >
                                        <Text style={style.name}>{details[0].fullname}</Text>
                                    </AnimatedImageBg>
                                </Animated.View>
                            </View>
                            <AnimatedContent
                                style={[{paddingBottom: animatedMargin, backgroundColor: '#054078'}]} 
                            >   
                            <LinearGradient
                                colors={['#e1efef','transparent']}
                                style={[{paddingTop: 15, paddingBottom: 25}]} 
                            >                          
                                    {user.map((item,i) => (
                                        <TouchableWithoutFeedback style={[style.editBox]}>
                                            <EditBox item={item} />
                                        </TouchableWithoutFeedback>
                                    ))}   
                                </LinearGradient>                      
                            </AnimatedContent> 
                                            
                        </Animated.View> 
                    
                </PanGestureHandler>
            </CustomOverlay>
            ): null}
            
        </>
    )
}

const style = StyleSheet.create({
    profileview: {
        padding: 0,
        width: '100%',
    },
    gradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
    },
    profile: {
        position: 'relative',
        width: '100%',
        height: 300,
        padding: 0,
        marginBottom: 15,
    },
    emptyview: {
        paddingHorizontal: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomColor: '#fff',
        paddingBottom: 10,
    },
    list: {
        marginTop: 30,
        width: '100%',
        alignSelf: 'center',
    },
    nameText: {
        position: 'absolute',
        top: 250,
    }, 
    name: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 20,
    },
    buttonContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    button: {
        paddingHorizontal: 15,
        borderColor: '#f1f1f1'
    }, 
    all: {
        color: 'yellow',
        fontSize: 16,
    },
    overlay: {
        backgroundColor: 'rgba(0,0,0,0.4)',
        zIndex: 2,
    },
    titleView: {
        backgroundColor: '#fff',
        paddingVertical: 0
    }, 
    editBox: {
        // flexDirection: 'row',
        // justifyContent: 'center',
        borderBottomColor: '#777',
        borderBottomWidth: 1,
        paddingVertical: 5,
    },
    editHeading: {
        flexDirection: 'row',
        paddingVertical: 10,
    }, 
    editText: {
        fontSize: 18
    },
})


export default SettingScreen