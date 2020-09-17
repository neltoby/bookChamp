import React , { memo } from 'react'
import { Header,  Button, Left, Body, Right, Icon as NativeIcon, Title, } from 'native-base'

export default function QuizHeader() {
    console.log('quizHeader memoized')
    return (
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
    )
}
export const MemoizedQuizHeader = memo(QuizHeader)