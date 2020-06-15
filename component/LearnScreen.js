import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { useFocusEffect } from '@react-navigation/native';
import { Container, Header, Content, Footer, Left, Body, Title, Subtitle, Right, Button, Icon as NativeIcon } from 'native-base'
import { View, FlatList, Text, StyleSheet, StatusBar, useWindowDimensions, TouchableHighlight } from 'react-native'

const LearnScreen = ({ navigation }) => {
    const windowHeight = useWindowDimensions().height;
    useFocusEffect(
        React.useCallback(() => {
            StatusBar.setBarStyle('light-content');
            Platform.OS === 'android' && StatusBar.setBackgroundColor('#054078');
            return () => {
            }
        }, [])       
    )
    const subject = [
        {text:'Finance', col: '#e85f29'}, 
        {text: 'Science and Technology', col: '#00e600'}, 
        {text: 'Politics', col: 'orange'}, 
        {text: 'Sports', col: '#ff1a66'}, 
        {text: 'Entertainment', col: '#9999ff'}, 
        {text: 'Socials', col: '#e6e600'}, 
        {text: 'History', col: '#033268'}, 
        {text: 'Lifestyle', col: 'green'}, 
        {text: 'Geography', col: '#e85f29'}
    ]

    const selectSubject = (subject) => {
        navigation.navigate('Subject', {subject: subject})
    }

    const _keyExtractor = (item, index) => `${item.text}${index}`

    return(
        <Container style={{backgroundColor: "#054078"}}>
            <LinearGradient
                colors={['transparent', '#e1efef']}
                style={{...style.gradient, height: windowHeight,}}
            />
            <Header transparent>
                <Left>
                    <Button transparent onPress={() => navigation.goBack()}>
                        <NativeIcon name='arrow-back' />
                    </Button>
                </Left>
                <Body>
                    <Title>
                        Juicy Content 
                    </Title>
                    <Subtitle>Everyday</Subtitle>
                </Body>
                <Right />
            </Header>

                <View style={style.container}>
                    <FlatList 
                        style={style.flatList}
                        // contentContainerStyle={{alignItems: 'center'}}
                        data={subject} 
                        keyExtractor={_keyExtractor}
                        renderItem = {({item}) => 
                            <TouchableHighlight  style={{...style.subject, borderColor: item.col, backgroundColor: item.col}} onPress={() => selectSubject(item.text)}>
                                <View>
                                    <Text style={style.subText}>{item.text}</Text>
                                </View>
                            </TouchableHighlight>
                        } 
                    />
                    
                </View>

        </Container>
    )
}

const style = StyleSheet.create({
    gradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
    },
    container: {
        flex: 1,
        marginTop: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    flatList: {
        width: '90%',
        marginTop: 15,
        paddingTop: 15,
    },
    subject: {
        width: '90%',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 3,
        alignSelf: 'center',
        marginBottom: 25,
        borderRadius: 50,
    },
    subText: {
        color: '#fff',
        fontSize: 18,
    },
})

export default LearnScreen