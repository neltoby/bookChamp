import React, { useMemo, useState, useEffect } from 'react'
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native'
import {Icon } from 'react-native-elements';
import isJson from '../processes/isJson'
import { useSelector, useDispatch } from 'react-redux'
import {next, correctAnswers, wrongAnswers, displayedQuestion, answered, active, setOverlay,
    decreaseScore, increaseScore, skip, playingAgain, correctAns, played, settime } from '../actions/quiz'

export default function QuizOptions() {
    const store = isJson(useSelector(state => state))
    const dispatch = useDispatch()
    let allQuestion = useMemo(() => isJson(store.quiz.question), [store.quiz.question])
    const [selVal, setSelval] = useState('')
    const current = parseInt(store.quiz.current, 10)
    const question = isJson(allQuestion[current])
    const answer = store.quiz.answer
    const correct = store.quiz.correctAns
    const displayed = (store.quiz.displayed).length

    useEffect(() => {
        const quest = isJson(allQuestion[current || 0])
        dispatch(displayedQuestion(quest.id))
    }, [current])
        


    const selected = (val) => {
        setSelval(val)
        question['selected'] = val
        dispatch(played(question))
        if(val === question.answer){
            dispatch(correctAns(true))
            dispatch(correctAnswers(question.id))
            dispatch(increaseScore())
        }else{
            dispatch(wrongAnswers(question.id)) 
            dispatch(decreaseScore())        
        }
        
        dispatch(answered(true))
        setTimeout(() => {
            if(question.id == allQuestion[allQuestion.length - 1].id ){
                settime('')
                dispatch(setOverlay('end'))
            }else{
                dispatch(answered(false))
                dispatch(correctAns(false))
                setSelval('');
                dispatch(next())
            }
        });
    }

    return (
        <View style={style.optionContainer}>
            {
                !answer ? question.options.map((option, i) => {
                    return (
                        <TouchableHighlight
                            activeOpacity={0.6}
                            underlayColor='transparent'
                            style={style.optionView} onPress={() => selected(option)} key={`${option}${i}`}>
                            <>
                                <View style={style.textContainer}>
                                    <Text style={style.optionText}>{option}</Text>
                                </View>
                                <View style={style.iconContainer}>
                                    <Icon 
                                        type='material'
                                        name='radio-button-unchecked'
                                        size={24}
                                        color='#054078'
                                    />
                                </View>
                            </>
                        </TouchableHighlight>
                    )
                }) : correct ?
                question.options.map((option, i) => {
                    if(selVal == option){
                        return (
                            <View style={{...style.optionView, borderColor: 'green'}} key={`${option}${i}`}>
                                <>
                                    <View style={style.textContainer}>
                                        <Text style={{...style.optionText, color: '#fff'}}>{option}</Text>
                                    </View>
                                    <View style={style.iconContainer}>
                                        <Icon 
                                            type='material'
                                            name='check-circle'
                                            size={24}
                                            color='green'
                                        />
                                    </View>
                                </>
                            </View>
                        )
                    }else{
                        return (
                            <View style={style.optionView} key={`${option}${i}`}>
                                <View style={style.textContainer}>
                                    <Text style={style.optionText}>{option}</Text>
                                </View>
                                <View style={style.iconContainer}>
                                    <Icon 
                                        type='material'
                                        name='radio-button-unchecked'
                                        size={24}
                                        color='#054078'
                                    />
                                </View>
                            </View>
                        )
                    }
                }) : 
                question.options.map((option, i) => {
                    if(selVal == option){
                        return (
                            <View style={{...style.optionView, borderColor: '#e85f29'}} key={`${option}${i}`}>
                                <View style={style.textContainer}>
                                    <Text style={{...style.optionText, color: '#fff'}}>{option}</Text>
                                </View>
                                <View style={style.iconContainer}>
                                    <Icon 
                                        type='material'
                                        name='cancel'
                                        size={24}
                                        color='#ff4632'
                                    />
                                </View>
                            </View>
                        )
                    }else if(option == question.answer){
                        return (
                            <View style={{...style.optionView, borderColor: 'green'}}  key={`${option}${i}`}>
                                <View style={style.textContainer}>
                                    <Text style={{...style.optionText, color: '#fff'}}>{option}</Text>
                                </View>
                                <View style={style.iconContainer}>
                                    <Icon 
                                        type='material'
                                        name='check-circle'
                                        size={24}
                                        color='green'
                                    />
                                </View>
                            </View>
                        )
                    }else{
                        return (
                            <View style={style.optionView}  key={`${option}${i}`}>
                                <View style={style.textContainer}>
                                    <Text style={style.optionText}>{option}</Text>
                                </View>
                                <View style={style.iconContainer}>
                                    <Icon 
                                        type='material'
                                        name='radio-button-unchecked'
                                        size={24}
                                        color='#054078'
                                    />
                                </View>
                            </View>
                        )
                    }
                })
            }
            
        </View>
    )
}

 const style = StyleSheet.create({
    optionContainer: {
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    optionView: {
        borderRadius: 4,
        width: '70%', 
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center', 
        marginTop: 10,
        paddingVertical: 5, 
        borderColor: '#054078',
        borderWidth: 2,
    },
    optionText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
    },
    textContainer: {
        flex: 0.8,
        paddingHorizontal: 5,
        alignItems: 'center',
    },
    iconContainer: {
        flex: 0.2
    },
 })
