import React, { useState, useEffect } from 'react'
import PropTypes from'prop-types'
import { useFocusEffect } from '@react-navigation/native'
import { View, StyleSheet, Text, ActivityIndicator, Keyboard } from 'react-native'
import { Input, Icon, Badge} from 'react-native-elements';
import DatePicker from 'react-native-datepicker'
import { Button, Card, Toast } from 'native-base'
import Animated, { Easing } from 'react-native-reanimated'
import { capitalize } from '../processes/category'
import {config} from './CustomOverlay'

const {
    timing,
    Value,
    spring,
    interpolate,
    block
} = Animated

const minDate = new Date(new Date().setFullYear(new Date().getFullYear() - 150))
const maxDate = new Date(new Date().setFullYear(new Date().getFullYear() - 12))
const colors = ['#992438', '#AD2425', '#9224AD', '#696969', '#AD2425', '#92AD24', '#6924AE', '#24AEAE', '#935124', '#4D4D4D']

export default function EditBox(props) {
    const {value, label, icon} = props.item
    const [edit, setEdit] = useState(false)
    const [val, setVal] = useState('')
    const [success, setSuccess] = useState(false)
    const [loading, setLoading] = useState(false)
    const animatedMargin = new Value(0)
    const undoEdit = new Value(0)
    const randomColor = Math.floor(Math.random() * 10)
    const keyboardType = label === 'username' || label === 'fullname' ? 'default' :
    label === 'phone_number' ? 'phone-pad' : label === 'email' ? 'email-address' : 'default' ;
    const saveInfo = () => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
            setSuccess(true)
            Toast.show({
                text: `${capitalize(label)} changed`,
                buttonText: "CLOSE",
                duration: 3000, 
                style: {backgroundColor: 'green'}
            })
            setTimeout(() => {
                setEdit(false)
                setSuccess(false)
            },3000)          
        }, 2000)
        
    }

    useEffect(() => {
        Keyboard.addListener('keyboardDidShow', _keyboardDidShow)
        Keyboard.addListener('keyboardDidHide', _keyboardDidHide)
        return () => {
            Keyboard.removeListener('keyboardDidShow', _keyboardDidShow)
            Keyboard.removeListener('keyboardDidHide', _keyboardDidHide)
        }
    }, [])

    useEffect(() => {
        if(edit && !success && !loading){
            block([
                spring(undoEdit, {                        
                    toValue: 1,
                    ...config()
                }).start()
            ])
        }else{
            undoEdit.setValue(1)
        }
        return () => {
        }
    }) 

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
    const icon_opacity = interpolate(undoEdit, {
        inputRange: [0, 1],
        outputRange: [0, 1],
        extrapolate: 'clamp',
    })
    const margin_shift = interpolate(icon_opacity, {
        inputRange: [0, 1],
        outputRange: [-3, 20],
        extrapolate: 'clamp',
    })

    const setBack = () => {
        console.log('setback called')
        setEdit(false)
    }

    return (
        <Card style={style.container}>
            {edit ? label === 'date_of_birth' ? (
                <>
                {!loading ?
                    <Animated.View style={[{flexDirection: 'row', opacity: icon_opacity, justifyContent: 'flex-end', position: 'absolute', top: 10, right: margin_shift }]}>                        
                        <Icon 
                            type='material'
                            name='reply'
                            size={20}
                            color={colors[randomColor]}
                            onPress={() => setEdit(false)}
                        /> 
                    </Animated.View>
                    : 
                    null
                }
                    <View style={style.datePicker}>
                    <DatePicker
                        style={{width: 200}}
                        date={val || value}
                        mode="date"
                        placeholder="select date"
                        format="YYYY-MM-DD"
                        minDate={minDate}
                        maxDate={maxDate}
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={{
                        dateIcon: {
                            position: 'absolute',
                            left: 0,
                            top: 4,
                            marginLeft: 0
                        },
                        dateInput: {
                            marginLeft: 36
                        }
                        }}
                        onDateChange={(date) => setVal(date)}
                    />
                    </View>
                    <View style={style.dateSave}>
                        {loading ? 
                            <ActivityIndicator size="small" color="#0000ff" /> : 
                            success ? 
                                <Icon 
                                    type='material'
                                    name='check-circle'
                                    size={24}
                                    color='green'
                                /> 
                            :
                            <Button transparent onPress={saveInfo}>                          
                                <Text style={[style.editText]}>SAVE</Text>
                            </Button>
                        }
                    </View>
                </>
            ) : (  
                <>
                {!loading ?
                    <Animated.View
                        style={[{ opacity: icon_opacity, position: 'absolute', top: 10, right: margin_shift }]}                    
                    >
                        <Icon 
                            type='material'
                            name='reply'
                            size={20}
                            color={colors[randomColor]}
                            onPress={setBack}
                        /> 
                    </Animated.View> 
                    : null
                } 
                <Animated.View style={[{flex: 1, marginBottom: animatedMargin}]}>                           
                    <Input
                        secureTextEntry={label === 'password' ? true : false}
                        inputContainerStyle={style.inputs}
                        label = {capitalize(label)}
                        defaultValue={value}
                        value={val !== null ? val : 'select a date'}
                        labelStyle = {style.label}
                        keyboardType={keyboardType}
                        placeholder={capitalize(label)}
                        style={style.input}
                        leftIcon={
                            <Icon 
                                type='material'
                                name={icon}
                                size={24}
                                color={colors[randomColor]}
                            /> 
                        }
                        rightIcon={
                            loading ? 
                                <ActivityIndicator size="small" color="#0000ff" />
                                :
                                success ? 
                                <Icon 
                                    type='material'
                                    name='check-circle'
                                    size={24}
                                    color='green'
                                /> 
                                :
                                <Button transparent onPress={saveInfo}>                          
                                    <Text style={[style.editText]}>SAVE</Text>
                                </Button>
                        }      
                        onChangeText={setVal}
                    /> 
                </Animated.View>  
                </>            
            ):(
                <View style={style.textContainer}>
                    <View style={style.badgeContainer}>
                        <Badge
                            value={label.charAt(0).toUpperCase()}
                            textStyle={{fontSize: 17, fontWeight: 'bold'}}
                            badgeStyle={{ backgroundColor: colors[randomColor], width: 40, height: 40, borderRadius: 20 }}
                        />
                    </View>
                    <View style={style.textContent}>
                        <Text style={style.textLabel}>{capitalize(label)}</Text>
                        <Text numberOfLines={1} style={style.textValue}>{label === 'password' ? '***' : value === null ? `Fill your ${label}` :value}</Text>
                    </View>
                    <View style={style.editContainer}>
                        <Button transparent onPress={() => setEdit(true)}>
                            <Text style={style.editText}>EDIT</Text>
                        </Button>
                    </View>
                </View>
            )
            }
        </Card>
    )
}

EditBox.propTypes = {
    item: PropTypes.shape({
        value: PropTypes.string,
        label: PropTypes.string,
        icon: PropTypes.string,
    })
}

const style = StyleSheet.create({
    container: {
        flex: 0.95,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        // marginBottom: 25,
        paddingVertical: 20,
        paddingHorizontal: 10,
        borderRadius: 10,
    },
    input: {
        // flex: 1,       
    },
    textContainer: {
        flex: 1,
        flexDirection: 'row',
    },
    badgeContainer: {
        flex: 0.2,
    },
    textContent: {
        flex: 0.6,
    }, 
    editContainer: {
        flex: 0.2,
        alignItems: 'flex-end',
        paddingRight: 10,
    }, 
    editText: {
        fontWeight: 'bold',
        color: '#054078'
    },
    textLabel: {
        fontSize: 16,
        color: '#aaa',
        marginBottom: 5,
    },
    textValue: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#777'
    }, 
    dateContainer: {
        flex: 1
    }, 
    datePicker: {
        flex: 0.8
    }, 
    dateSave: {
        flex: 0.2,
        alignItems: 'flex-end',
        paddingRight: 10
    }
})
