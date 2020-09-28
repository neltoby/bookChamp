import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { useFocusEffect } from '@react-navigation/native';
import { Button } from 'react-native-elements';
import { View, Text, Image, StyleSheet, StatusBar, useWindowDimensions } from 'react-native'
import { TouchableHighlight } from 'react-native-gesture-handler';

const QuizScreen = ({ navigation }) => {
    const windowHeight = useWindowDimensions().height;
    const data = [
        {no: 1, text: 'Every correct answer attracts 3 marks'},
        {no: 2, text: 'Every wrong answer attracts -0.1'},
        {no: 3, text: 'You have the option to skip question up to 5 times'},
        {no: 4, text: 'Winners are selected every Sunday by 6pm'},
        {no: 5, text: 'Duration of quiz is 10 minutes'},
    ]
    const playQuiz = () => {       
        navigation.navigate('PlayQuiz')
    }
    useFocusEffect(
        React.useCallback(() => {
          StatusBar.setBarStyle('dark-content');
          Platform.OS === 'android' && StatusBar.setBackgroundColor('#fff');
        }, [])
    )
    return (
        <View style={style.container}>
            <View style={style.fore}>
                <Image source={require('../img/quizStar.jpg')} style={style.foreImg} />
            </View>
            <View style={style.secContainer}>
                <LinearGradient
                    colors={['transparent', '#e1efef']}
                    style={{...style.gradient, height: windowHeight,}}
                />
                <View style={style.viewImg}> 
                    <Image source={require('../img/book-champ.png')} style={style.img} />
                </View>
                <View style={style.guide}> 
                    <Text style={style.head}>QUIZ GUIDELINES</Text>
                    {data.map((item, i) => {
                        return(
                            <Text style={style.textContainer} key={`${item}${i}`}>
                                <Text style={style.thick}>{item.no}.</Text>
                                <Text style={style.info}>{item.text}</Text>
                            </Text>
                        )
                    })}
                    
                </View>
                <View>
                    <TouchableHighlight onPress={playQuiz}>
                        <View style={style.but}>
                            <Text style={{color: '#3480eb', fontWeight: 'bold'}}>LET'S DO THIS</Text>
                        </View>
                    </TouchableHighlight>
                </View>
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
    },
    gradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
    },
    secContainer: {
        flex: 0.7,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#054078'
    },
    fore: {
        flex: 0.3,
        justifyContent:'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    foreImg: {
        width: 150,
        height: 150,
    },
    viewImg: {
        marginBottom: 50,
        alignItems: 'center',
    },
    img: {
        position: 'absolute',
        width: 100,
        height: 100,
        top: -50,
    },
    guide: {
        backgroundColor: '#fff',
        borderRadius: 15,
        width: '80%',
        paddingHorizontal: 10,
        paddingVertical: 20,
        marginBottom: 25,
    },
    head: {
        alignSelf: 'center',
        paddingBottom: 6,
        fontWeight: 'bold',
        fontSize: 20,
    },
    textContainer: {
        paddingBottom: 8,
    },
    thick: {
        fontWeight: '700',
        marginRight: 10,
    },
    info: {
        fontSize: 16,
        marginLeft: 10,
    },
    but: {
        backgroundColor: '#fff',
        width: 180,
        paddingVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 3,
        borderRadius: 3
    },
})

export default QuizScreen