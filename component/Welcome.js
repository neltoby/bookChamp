import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import logo from '../processes/image'
import { Button, Icon } from 'react-native-elements';
import { Container, Content, H1 } from 'native-base';
import { View, Text, StyleSheet, Image } from "react-native";

const Welcome = ({ navigation }) => {
    const nextSlide = () => {
        navigation.navigate('Home')
    }
    return(
        <Container>
            <Content style={style.container}>
                <View style={style.container}>
                    <View style={style.background}>
                    <LinearGradient
                        colors={['#e1efef', 'transparent']}
                        style={{...style.gradient, height: 200,}}
                    />
                    </View>
                    <View style={style.contentImage}>
                        <Image source={logo()} style={style.img} />                       
                    </View>
                    <View style={style.backgrounds}>
                        <Text style={style.text}>WELCOME</Text> 
                        <View style={style.empty}></View>
                    </View>
                    <View style={style.note}>
                        <Text style={style.welcomeNote}>node_modules\react-native\Libraries\BatchedBridge\MessageQueue.js:436:47 in __callFunction
- node_modules\react-native\Libraries\BatchedBridge\MessageQueue.js:111:26 in __guard$argument_0
- node_modules\react-native\Libraries\BatchedBridge\MessageQueue.js:384:10 in __guard
- node_modules\react-native\Libraries\BatchedBridge\MessageQueue.js:110:17 in __guard$argument_0</Text>
                    </View>
                    <Button
                        onPress = {nextSlide}
                        raised
                        buttonStyle = {style.continue}
                        type = 'solid'
                        icon={
                            <Icon
                            type='font-awesome'
                            name="long-arrow-right"
                            size={20}
                            color="#fff"
                            />
                        }
                        iconRight 
                        titleStyle={{marginRight: 10, color: '#fff'}}
                        title="Continue"
                    />
                </View>
            </Content>
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
        backgroundColor: '#fff',
    },
    background: {
        height: 200,
        backgroundColor: '#054078'
    },
    contentImage: {
        alignItems: 'center',
        position: 'relative',
    },
    img: {
        width: 120,
        height: 120,
        position: 'absolute',
        top: -60,
    },
    backgrounds: {
        alignItems: 'center',
        marginTop: 40,
    },
    text: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#aaa',
        
    },
    empty: {
        width: 85,
        height: 0,
        borderBottomWidth: 3,
        borderColor: '#888'
    },
    note: {
        marginTop: 30,
        alignSelf: 'center',
        width: '70%',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#aaa',
        padding: 4,
        justifyContent: "center",
    },
    continue: {
        width: '70%',
        alignSelf: 'center',
        backgroundColor: '#1258ba',
        marginTop: 50,
    }
})

export default Welcome