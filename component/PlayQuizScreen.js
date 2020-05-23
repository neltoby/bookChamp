import React from  'react'
import { useFocusEffect } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient'
import { View, Text, StyleSheet, StatusBar, useWindowDimensions } from "react-native";
import { Avatar, Header, Icon } from 'react-native-elements';

const PlayQuizScreen = ({ navigation }) => {
    const windowHeight = useWindowDimensions().height;
    useFocusEffect(
        React.useCallback(() => {
          StatusBar.setBarStyle('light-content');
          Platform.OS === 'android' && StatusBar.setBackgroundColor('#3480eb');
        }, [])
    );
    return (
        <View style={style.container}>
            <StatusBar barStyle="light-content" backgroundColor="#3480eb" />
            <LinearGradient
                colors={['transparent', '#34cdeb']}
                style={{...style.gradient, height: windowHeight,}}
            />
            <View>
            <Header
                leftComponent={<Icon type='material-community' name='keyboard-backspace' size={24} color='#fff' onPress={() => navigation.navigate('Quiz')} />}
                centerComponent={{ text: 'Play Quiz', style: { color: '#fff', fontSize: 20, fontWeight: '700' } }}
            />
            </View>
            <View><Text>Play Quiz</Text></View>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3480eb'
    },
    gradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
    },
})

export default PlayQuizScreen