import React from 'react'
import { Avatar } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient'
import { View, Text, Image, StyleSheet, useWindowDimensions, TouchableHighlight, StatusBar } from 'react-native'

const SelectHome  = ({ navigation }) => {
    const windowHeight = useWindowDimensions().height;
    return(
        <View style={style.container}>
            <StatusBar barStyle="light-content" backgroundColor="#054078" />
            <LinearGradient
                colors={['transparent', '#e1efef']}
                style={{...style.gradient, height: windowHeight,}}
            />
            <View style={style.quiz}>
                <Avatar
                    size={150}
                    rounded
                    onPress={() => navigation.navigate('Quiz')}
                    source={require('../img/quizPurple.png')}
                />
            </View>
            <TouchableHighlight onPress={() => navigation.navigate('Learn')}>
                <View style={style.learn}>
                    <Text style={style.learnText}>
                        Learn
                    </Text>
                </View>
            </TouchableHighlight>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#054078',
    },
    quiz: {
        height: '50%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    gradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
    },
    learn: {
        backgroundColor: '#fff',
        height: '30%',
        width: '70%',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        paddingVertical: 50,
        borderRadius: 10,
    },
    learnText: {
        fontSize: 55,
        fontWeight: 'bold',
        color: '#1258ba',
        letterSpacing: 20,
    }
})

export default SelectHome