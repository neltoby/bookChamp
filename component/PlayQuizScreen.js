import React, { useMemo, useState, useEffect, memo } from  'react'
import { useFocusEffect } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient'
import { View, Text, StyleSheet, ScrollView, StatusBar, Image,
    TouchableHighlight, BackHandler, Alert } from "react-native";
import { Container, Content } from 'native-base'
import { MemoizedQuizHeader } from './QuizHeader'
import DisplayTime from './DisplayTime'
import QuizOptions from './QuizOptions'
import QuizQuestion from './QuizQuestion'
import Overlay from './Overlay'
import { MemoizedQuizReport } from './QuizReport'
import { useSelector, useDispatch } from 'react-redux'
import deviceSize from '../processes/deviceSize'
import { active, playingAgain, settime, setOverlay } from '../actions/quiz'
import MemoizedQuizResult from './QuizResult';
import QuizFooter from './QuizFooter';

const PlayQuizScreen = ({ navigation }) => {
    const deviceHeight = deviceSize().deviceHeight
    const deviceWidth = deviceSize().deviceWidth
    const store = useSelector(state => state.quiz.setOverlay)
    const dispatch = useDispatch()
    const setlay = store === 'end' || store === 'timeOut' ? true : false
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
    const toggleOverlay = () => {
        dispatch(active())
        dispatch(settime(''))
        dispatch(setOverlay('cancel'))
        navigation.navigate('SelectHome')
    }
    useEffect(() => {
        const backAction = () => {
            if(store !== 'timeOut'){
                Alert.alert('Abort?', 'Are you sure you want to abort your current quiz session',
                    [
                        {
                            text: "Cancel",
                            onPress: () => null,
                            style: "cancel"
                        },
                        { text: "YES", onPress: () => navigation.navigate('Quiz') }
                    ]
                )
                return true
            }                                              
        }

        BackHandler.addEventListener('hardwareBackPress', backAction)
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', backAction)
        }
    }, [])
    console.log(store, 'store.quiz.setOverlay 127 again and again')
    return (
        <>
        <Container style={{backgroundColor: "#054078"}}>
            <LinearGradient
                colors={['transparent', '#e1efef']}
                style={{...style.gradient, height: deviceHeight,}}
            />
        <MemoizedQuizHeader />
        <Content >
        <View style={style.container}>
            <StatusBar barStyle="light-content" backgroundColor="#3480eb" />
            <MemoizedQuizReport />
            <View style={style.quizContainer}>
                <DisplayTime />
                <QuizQuestion />
            </View>
            <QuizOptions />
        </View>        
        </Content>
        <QuizFooter />
      </Container>
    <Overlay 
        isVisible={setlay} 
        deviceWidth={deviceWidth} 
        deviceHeight={deviceHeight}
        onBackButtonPress = {() => playAgain()}
        onBackdropPress={toggleOverlay} >
        
        <MemoizedQuizResult navigation={navigation} />      
    </Overlay>
    </>
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
    quizContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 5
    },
    
})

export default PlayQuizScreen
export const MemoizedPlayQuizScreen = memo(PlayQuizScreen)