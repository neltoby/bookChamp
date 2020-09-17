import React, { memo, useMemo } from 'react'
import { View, Text, StyleSheet, } from 'react-native'
import { useSelector } from 'react-redux'
import SingleRecord from './SingleRecord'
import isJson from '../processes/isJson'

export default function QuizReport() {
    const correct = isJson(useSelector(state => state.quiz.correct))
    const wrong =  isJson(useSelector(state => state.quiz.wrong))
    const score = isJson(useSelector(state => state.quiz)).score
    const skipped = isJson(useSelector(state => state.quiz.skipped))
    const infos = useMemo(() => {
        return  [
        {name: 'check-square', value: correct.length}, 
        {name: 'times', value: wrong.length},
        {name: 'equals', value: score, type: 'font-awesome-5'}
    ]}, [correct.length, wrong.length, score])

    return (
        <View style={style.update}>
            {infos.map((info, i) => <SingleRecord info={info} key={i} />)}
            <View style={{width: '70%', flexDirection: 'row', justifyContent: 'flex-end', paddingRight: 10, paddingTop: 10}}>
                <View>
                <View>
                    <Text style={{...style.info,fontSize: 14, color: '#fff'}}>SKIPPED</Text>
                </View>
                <View style={style.count}>
                    <Text style={{...style.info,color: '#fff'}}>{skipped.length}</Text>
                </View>
                </View>
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    update: {
        flexDirection: 'row',
    },
    count: {
        alignItems: 'center',
    },
    info: {
        fontWeight: 'bold',
    },
})

export const MemoizedQuizReport = memo(QuizReport)
