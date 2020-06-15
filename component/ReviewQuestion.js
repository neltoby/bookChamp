import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { useFocusEffect } from '@react-navigation/native';
import { Container, Header, Content, Footer, Left, Body, Title, Right, Button, FooterTab, Icon as NativeIcon } from 'native-base'
import {View, Text, StyleSheet, SafeAreaView, StatusBar, Image, useWindowDimensions} from 'react-native'
import { useSelector, useDispatch } from 'react-redux';
import isJson from '../processes/isJson';
import {noQuestion} from '../processes/image'
import {playedCurrent, resetplayedCurrent, playingAgain, settime} from '../actions/quiz'

const ReviewQuestion = ({ navigation }) => {
    const windowHeight = useWindowDimensions().height;
    const store = isJson(useSelector(state => state))
    const dispatch = useDispatch()
    const played = store.quiz.played
    const no = store.quiz.playedCurrent
    const current = isJson(played[no])
    const avail = Object.entries(current).length 
    const col = current.answer === current.selected ? '#00ff00' : 'red' ;
    useFocusEffect(
        React.useCallback(() => {
            StatusBar.setBarStyle('light-content');
            Platform.OS === 'android' && StatusBar.setBackgroundColor('#054078');
            return () => {                
                dispatch(resetplayedCurrent(0))
                dispatch(playingAgain()) 
                dispatch(settime(''))           
            }
        }, [])
        
    )
    const nextQuestion = () => {
        dispatch(playedCurrent())
    }
    const goback = () => { 
        navigation.navigate('PlayQuiz')
    }
    return(
        <Container style={{backgroundColor: "#054078"}}>
            <LinearGradient
                colors={['transparent', '#e1efef']}
                style={{...style.gradient, height: windowHeight,}}
            />
            <Header transparent>
                <Left>
                    <Button transparent onPress={goback}>
                        <NativeIcon name='arrow-back' />
                    </Button>
                </Left>
                <Body>
                    <Title>
                        Question Review
                    </Title>
                </Body>
                <Right />
            </Header>
            <Content>
            <View style={style.container}>
                {played.length ?
                    <View style={style.review}>
                        <Text style={style.questag}>Q{parseInt(parseInt(no) + 1)}</Text>
                        <View style={style.textContent}>
                            <Text style={style.question}>
                                {current.question}
                            </Text>
                            <Text style={{...style.question, color: col}}>
                                YOUR ANSWER : {current.selected}
                            </Text>
                            {current.answer !== current.selected ?
                                <Text style={{...style.question, color: '#00ff00'}}>
                                    CORRECT ANSWER : {current.answer}
                                </Text> : 
                                <Text />
                            }
                        </View>
                        <View style={style.textContent}>
                            <Text>
                                <Text style={style.note}>NOTE: </Text>
                                <Text style={style.noteContent}>{current.note}</Text>
                            </Text>
                        </View>
                        <View style={style.next}>
                            {no < played.length - 1 ?
                                <Button transparent onPress={() => nextQuestion()}>
                                    <Text>Next</Text>
                                </Button>
                            :
                                <Text />
                            }
                        </View>
                    </View>
                    : 
                    <View style={style.noreview}>
                        <Text style={style.noQuest}>You have not answered any question!</Text>
                        <Image source={noQuestion()} style={style.img} />
                    </View>
                }
            </View>
            </Content>
            <Footer >
                <FooterTab>
                    <Button>
                        <Text style={style.displayed}>You  answered {played.length} question</Text>
                    </Button>
                </FooterTab>
            </Footer>
        </Container>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
        alignItems: 'center',
        // justifyContent: 'center',
    },
    gradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
    },
    noreview: {
        height: 400,
        alignItems: 'center',
        justifyContent: 'center'
    },
    review: {
        marginTop: 15,
        width: '85%',
        padding: 15,
        backgroundColor: '#fff',
        borderRadius: 4,
    },
    img: {
        width: 100,
        height: 100,
    },
    noQuest: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 45,
        color: '#fff',
    },
    questag: {
        fontWeight: 'bold',
        fontSize: 19,
        color: '#777',
        marginBottom: 10,
    },
    textContent: {
        paddingHorizontal: 10,
    },
    question: {
        lineHeight: 35,
        fontSize: 18,
        fontWeight: 'bold',
    },
    next: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingRight: 15,
    },
    note: {
        fontWeight: 'bold',
        fontSize: 18,
    },
    noteContent: {
        fontSize: 18,
        color: '#777'
    },
    displayed: {
        color: '#fff',
        fontWeight: 'bold',
    },
})

export default ReviewQuestion