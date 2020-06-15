import React, { useMemo, useState, useEffect } from  'react'
import { useFocusEffect } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient'
import { View, Text, StyleSheet, ScrollView, StatusBar, Image,
    useWindowDimensions, TouchableHighlight } from "react-native";
import { Avatar, Icon, Overlay, Button as ElementButton } from 'react-native-elements';
import { Container, Header, Content, Footer, FooterTab, Button, 
    Left, Body, Right, Icon as NativeIcon, Title, Text as NativeText, Row  } from 'native-base'
import useTime from './useTime'
import {oops} from '../processes/image'
import { useSelector, useDispatch } from 'react-redux';
import isJson from '../processes/isJson'
import {next, correctAnswers, wrongAnswers, displayedQuestion, answered, active,
    decreaseScore, increaseScore, skip, playingAgain, correctAns, played, settime} from '../actions/quiz'

const PlayQuizScreen = ({ navigation }) => {
    const windowHeight = useWindowDimensions().height;
    const store = isJson(useSelector(state => state))
    const dispatch = useDispatch()
    const overlayRes = store.quiz.status == 'time_out' ? true : false
    let allQuestion = useMemo(() => isJson(store.quiz.question), [])
    const answer = store.quiz.answer
    const correct = store.quiz.correctAns
    const displayed = store.quiz.displayed.length
    const current = store.quiz.current
    const question = isJson(allQuestion[current])
    const [selVal, setSelval] = useState('')
    let time = useTime(store.quiz.setTime)
    let res = useMemo(() => store.quiz.score, [store.quiz.score])
    useFocusEffect(
        React.useCallback(() => {
            StatusBar.setBarStyle('light-content');
            Platform.OS === 'android' && StatusBar.setBackgroundColor('#054078');
            dispatch(playingAgain())
            return () => {
                dispatch(settime(''))
            }
        }, [])    
    )
    useFocusEffect(
        React.useCallback(() => {
            dispatch(displayedQuestion(question.id))
        }, [question.id])
        
    )
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
            if(displayed == allQuestion.length ){
                console.log('end of Question')
            }else{
                dispatch(answered(false))
                dispatch(correctAns(false))
                setSelval('');
                dispatch(next())
            }
        }, 10);
    }
    const skipQuestion = (id) => {
        dispatch(skip())
        dispatch(next())
    }
    const playAgain = () => {
        dispatch(playingAgain())
    }
    const toggleOverlay = () => {
        dispatch(active())
        dispatch(settime(''))
    }
    const reviewQuestion = () => {
        dispatch(active())
        navigation.navigate('ReviewQuestion')
    }
    return (
        <Container style={{backgroundColor: "#054078"}}>
            <LinearGradient
                colors={['transparent', '#e1efef']}
                style={{...style.gradient, height: windowHeight,}}
            />
        <Header transparent>
          <Left>
            <Button transparent onPress={() => navigation.navigate('Quiz')}>
              <NativeIcon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title>Play Quiz</Title>
          </Body>
          <Right />            
        </Header>
        <Content >
        <View style={style.container}>
            <StatusBar barStyle="light-content" backgroundColor="#3480eb" />
            {/* <LinearGradient
                colors={['transparent', '#34cdeb']}
                style={{...style.gradient, height: windowHeight,}}
            /> */}
            <View style={style.update}>
                <View style={style.updateOptions}>
                    <View>
                        <Avatar
                            rounded
                            icon={{ name: 'check-square', type: 'font-awesome' }}
                            size="small"
                        />
                    </View>
                    <View style={style.count}>
                        <Text style={{...style.info,color: '#A8FF33'}}>{store.quiz.correct.length}</Text>
                    </View>
                </View>
                <View style={style.updateOptions}>
                    <View>
                        <Avatar
                            rounded
                            icon={{ name: 'times', type: 'font-awesome' }}
                            size="small"
                        />
                    </View>
                    <View style={style.count}>
                        <Text style={{...style.info,color: '#e85f29'}}>{store.quiz.wrong.length}</Text>
                    </View>
                </View>
                <View style={style.updateOptions}>
                    <View>
                        <Avatar
                            rounded
                            icon={{ name: 'equals', type: 'font-awesome-5' }}
                            size="small"
                        />
                    </View>
                    <View style={style.count}>
                        <Text style={{...style.info,color: '#fff'}}>{res}</Text>
                    </View>
                </View>
                <View style={{width: '70%', flexDirection: 'row', justifyContent: 'flex-end', paddingRight: 10, paddingTop: 10}}>
                    <View>
                    <View>
                        <Text style={{...style.info,fontSize: 14, color: '#fff'}}>SKIPPED</Text>
                    </View>
                    <View style={style.count}>
                        <Text style={{...style.info,color: '#fff'}}>{store.quiz.skipped.length}</Text>
                    </View>
                    </View>
                </View>
            </View>
            <View style={style.quizContainer}>
                <View style={style.time}>
                    <LinearGradient
                        colors={['transparent', '#e1efef']}
                        style={{...style.gradient, height: 70, width: 70, borderRadius: 35}}
                    />
                    <Text style={style.textTime}>{time}</Text>
                </View>
                <ScrollView  style={style.scrollContainer}>                        
                    <View>
                        <Text style={style.questionText}>
                            {question.question}
                        </Text>
                    </View>
                </ScrollView>
            </View>
            <View style={style.optionContainer}>
                {
                    !answer ? question.options.map((option, i) => {
                        return (
                            <TouchableHighlight style={style.optionView} onPress={() => selected(option)} key={`${option}${i}`}>
                                <View>
                                    <Text style={style.optionText}>{option}</Text>
                                </View>
                            </TouchableHighlight>
                        )
                    }) : correct ?
                    question.options.map((option, i) => {
                        if(selVal == option){
                            return (
                                <View style={{...style.optionView, backgroundColor: 'green'}} key={`${option}${i}`}>
                                    <Text style={{...style.optionText, color: '#fff'}}>{option}</Text>
                                </View>
                            )
                        }else{
                            return (
                                <View style={style.optionView} key={`${option}${i}`}>
                                    <Text style={style.optionText}>{option}</Text>
                                </View>
                            )
                        }
                    }) : 
                    question.options.map((option, i) => {
                        if(selVal == option){
                            return (
                                <View style={{...style.optionView, backgroundColor: '#e85f29'}} key={`${option}${i}`}>
                                    <Text style={{...style.optionText, color: '#fff'}}>{option}</Text>
                                </View>
                            )
                        }else if(option == question.answer){
                            return (
                                <View style={{...style.optionView, backgroundColor: 'green'}}  key={`${option}${i}`}>
                                    <Text style={{...style.optionText, color: '#fff'}}>{option}</Text>
                                </View>
                            )
                        }else{
                            return (
                                <View style={style.optionView}  key={`${option}${i}`}>
                                    <Text style={style.optionText}>{option}</Text>
                                </View>
                            )
                        }
                    })
                }
                
            </View>
        </View>
        <Overlay isVisible={overlayRes} onBackdropPress={toggleOverlay} >
            <View style={style.overlay}> 
                <Text style={style.oops}>
                    Ooops... You timed out!
                </Text>
                <View style={style.oopsView}>
                    <Image source={oops()} style={style.oopsImage} />
                </View>
                    <View style={style.optionContent}>
                        <View style={style.sayOption}> 
                            <Text>
                                <Text style={style.ans}>Questions answered :</Text>
                                <Text style={style.val}>{parseInt(store.quiz.correct.length) + parseInt(store.quiz.wrong.length)}</Text>
                            </Text>
                        </View>
                        <View style={style.sayOption}>
                            <Text>
                                <Text style={style.ans}>Correctly answered :</Text>
                                <Text style={style.val}>{store.quiz.correct.length} </Text>
                            </Text>
                        </View>
                        <View style={style.sayOption}>
                            <Text>
                                <Text style={style.ans}>Wrongly answered :</Text>
                                <Text style={style.val}>{store.quiz.wrong.length}</Text>
                            </Text>
                        </View>
                        <View style={style.sayOption}>
                            <Text>
                                <Text style={style.ans}>Skipped questions :</Text>
                                <Text style={style.val}>{store.quiz.skipped.length}</Text>
                            </Text>
                        </View>
                        <View style={style.sayOption}>
                            <Text>
                                <Text style={style.ans}>Final score :</Text>
                                <Text style={style.val}>{store.quiz.score}</Text>
                            </Text>
                        </View>
                    </View>
                <View style={style.selectOptions}>
                    <View style={{...style.optionsPick, marginRight: '2%'}}> 
                        <ElementButton
                            title="Play again" 
                            type="solid"
                            onPress={() => playAgain()}
                        />
                    </View>                   
                    <View style={{...style.optionsPick, marginLeft: '2%'}}>
                        <ElementButton 
                            title="Review question" 
                            type="solid"
                            onPress = {() => reviewQuestion()}
                        />
                    </View>
                </View>
            </View>
        </Overlay>
        </Content>
        <Footer>
            <FooterTab>
                <Button>
                    
                </Button>
                <Button>
                    
                </Button>
                <Button active>
                    
                </Button>

                {displayed == allQuestion.length || store.quiz.skipped.length == 5 ? 
                    <Button>
                        
                    </Button> 
                :
                    <Button onPress={() => skipQuestion(question.id)}>
                        <NativeText style={{color: '#fff', fontWeight: 'bold'}}>Skip</NativeText>
                    </Button>
                }
            </FooterTab>
        </Footer>
      </Container>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent'
    },
    gradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
    },
    info: {
        fontWeight: 'bold',
    },
    update: {
        flexDirection: 'row',
    },
    updateOptions: {
        width: '10%'
    },
    count: {
        alignItems: 'center',
    },
    quizContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 5
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
    scrollContainer: {
        backgroundColor: '#fff',
        paddingHorizontal: 10,
        width: '90%',
        borderRadius: 8,
        marginTop: 35,
        height: 200,
        paddingTop: 30,
    },
    optionContainer: {
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    questionText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    optionView: {
        borderRadius: 4,
        width: '70%', 
        alignItems: 'center',
        justifyContent: 'center', 
        marginTop: 10,
        paddingVertical: 5, 
        backgroundColor: '#054078',
    },
    optionText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
    },
    overlay: {
        width: '80%',
        alignItems: 'center'
    },
    oopsImage: {
        width: 150,
        height: 150,
    },
    oops: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#777',
    },
    oopsView: {
        alignItems: 'center'
    },
    selectOptions: {
        flexDirection: 'row',
        marginVertical: 10,
    },
    optionsPick: {
        width: '48%',
    },
    optionContent: {
        marginVertical: 10,
    },
    sayOption: {
        marginTop: 10,
    },
    ans: {
        color: '#777',
        fontWeight: '600'
    },
    val: {
        paddingLeft: 10,
        marginLeft: 10,
        color: '#777',
        fontWeight: 'bold',
    }
})

export default PlayQuizScreen