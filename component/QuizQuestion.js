import React, {useMemo} from 'react'
import { View, ScrollView, Text, StyleSheet} from 'react-native'
import { useSelector } from 'react-redux'
import isJson from '../processes/isJson'

export default function QuizQuestion() {
    const store = isJson(useSelector(state => state))
    let allQuestion = useMemo(() => isJson(store.quiz.question), [store.quiz.question])
    const current = store.quiz.current
    const question = isJson(allQuestion[current])
    return (
        <ScrollView  style={style.scrollContainer}>                        
            <View>
                <Text style={style.questionText}>
                    {question.question}
                </Text>
            </View>
        </ScrollView>
    )
}

 const style = StyleSheet.create({
    scrollContainer: {
        backgroundColor: '#fff',
        paddingHorizontal: 10,
        width: '90%',
        borderRadius: 8,
        marginTop: 35,
        height: 200,
        paddingTop: 30,
    },
    questionText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
 })
