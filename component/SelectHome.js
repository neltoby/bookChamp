import React from 'react'
import { useFocusEffect } from '@react-navigation/native';
import { Avatar } from 'react-native-elements';
import { Header, Button, Icon, Right } from 'native-base'
import { LinearGradient } from 'expo-linear-gradient'
import { useIsDrawerOpen } from '@react-navigation/drawer'
import FocusAwareStatusBar from './FocusAwareStatusBar'
import { View, Text, Alert, StyleSheet, useWindowDimensions, TouchableHighlight, StatusBar, BackHandler } from 'react-native'

const SelectHome  = ({ navigation }) => {
    const windowHeight = useWindowDimensions().height;
    const isDrawerOpen = useIsDrawerOpen()

    useFocusEffect(
        React.useCallback(() => {
            const backAction = () => {
                Alert.alert("Hey!", "Are you sure you want to exit?", [
                    {
                        text: "Cancel",
                        onPress: () => null,
                        style: "cancel"
                    },
                    { text: "YES", onPress: () => BackHandler.exitApp() }
                ]);
                return true;
            };
          const onBackPress = () => {
            if (isDrawerOpen) {
                navigation.closeDrawer();;
              return true;
            } else {
                backAction()
              return true;
            }
          };
    
          BackHandler.addEventListener('hardwareBackPress', onBackPress);
    
          return () =>
            BackHandler.removeEventListener('hardwareBackPress', onBackPress);
        }, [isDrawerOpen])
    );
    return(
        <View style={style.container}>
            <FocusAwareStatusBar barStyle="light-content" backgroundColor="#054078" />
            <LinearGradient
                colors={['transparent', '#e1efef']}
                style={{...style.gradient, height: windowHeight,}}
            />
            <Header noShadow noLeft style={style.header}>
                <Right>
                    <Button transparent onPress={() => navigation.toggleDrawer()}>
                        <Icon name="menu" />
                    </Button>
                </Right>
            </Header>
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
    header: {
        backgroundColor: 'transparent',
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