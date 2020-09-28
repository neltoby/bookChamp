import React, {useState, useEffect } from 'react'
import Constants from 'expo-constants';
import logo from '../processes/image'
import Container from './Container'
import FocusAwareStatusBar from './FocusAwareStatusBar'
import { View, Text, StyleSheet, Image,  Platform } from 'react-native'
import { Input, Button, Icon } from 'react-native-elements'
import { Header, Content, Left, Right, Body, Title, Icon as NativeIcon, Button as NButton } from 'native-base';
import { vNumber } from '../actions/login'
import { useDispatch } from 'react-redux';

const Username = ({ navigation, route }) => {
    const [username, setUserName] = useState('')
    // const [name, setName] = useState('')
    // const [email, setEmail] = useState('')
    // const [phone, setPhone] = useState('')
    // const [password, setPassword] = useState('')
    const details = {}

    const dispatch = useDispatch()
    
    const handleBack = () => {
        navigation.navigate('SignUp', {
            name, email, phone, password
        })
    }
    const nextSlide = () => {        
        navigation.navigate('ConfirmNumber')
        // setVisible(false)
    }
    const handleSignUp = () => {
        dispatch(vNumber(23456))
        setUserName('')
        nextSlide()
        // Animated.timing(iconValue, {
        //     toValue: 35,
        //     duration: 1000,
        // }).start()
    }
    useEffect(() => {
        if(route.params?.name){
            details['name'] = route.params.name
        }
        if(route.params?.email){
            details['email'] = route.params.email
        }
        if(route.params?.phone){
            details['phone'] = route.params.phone
        }
        if(route.params?.password){
            details['password'] = route.params.password
        }
    },[route.params])
    useEffect(() => {
        (async () => {
            if (Constants.platform.ios) {
                const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
                if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
      }, []);
    return(
        <Container>
            <FocusAwareStatusBar barStyle='light-content' backgroundColor='#054078' />
            <Header transparent >
                <Left>
                    <NButton transparent onPress = {handleBack}>
                        <NativeIcon name={Platform.OS == 'ios' ? 'chevron-back' : 'arrow-back'} />
                    </NButton>
                </Left>
                <Body>
                    <Title>Book Champ</Title>
                </Body>
                <Right>
                    <Image source={logo()} 
                    style={style.img} />
                </Right>
            </Header>
            <Content 
                contentContainerStyle={{flex: 1, alignItems: 'center', justifyContent: 'center'}} 
            >       
                <View style={style.usertextContainer}>
                    <Text style={style.usertext}>
                        Create a username
                    </Text> 
                </View>
                <View style={style.inputContainer}>
                <Input
                    value = {username}
                    label = 'Username'
                    labelStyle = {style.label}
                    inputContainerStyle={style.inputs}
                    inputStyle={style.input}
                    placeholder='Username'
                    leftIcon={
                        <Icon
                        type='font-awesome'
                        name='user-circle'
                        size={24}
                        color='#fff'
                        />
                    }
                    onChangeText={value => setUserName(value)}
                />
                </View>
                <View style={{...style.viewImg, marginTop: 20}}>
                    <Button
                        onPress = {handleSignUp}
                        raised
                        buttonStyle = {{width: 150, backgroundColor: '#1258ba'}}
                        type = 'solid'
                        icon={
                            <Icon
                            type='font-awesome'
                            name="angle-right"
                            size={20}
                            color="#fff"
                            />
                        }
                        iconRight 
                        titleStyle={{marginRight: 10}}
                        title="SIGN UP"
                    />
                </View>
                
            </Content>
        </Container>
    )
}
export default Username

const style = StyleSheet.create({
    label: {
        color: '#fff'
    },
    img: {
        height: 40,
        width: 40,
    },
    viewImg: {
        margin: 10,
        alignItems: 'center',
    },
    usertextContainer: {
        alignItems: 'center',
    },
    usertext: {
        fontSize: 22,
        color: '#fff'
    },
    inputContainer: {
        width: '80%'
    },
    input: {
        color: '#fff',
    },
    inputs: {
        borderColor: '#fff',
    },
})