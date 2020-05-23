import React, {useState, useEffect, useRef} from 'react'
import logo from '../processes/image'
import {View, Text, StyleSheet, StatusBar, Image, Animated} from 'react-native'
import { Input, Button, Icon, Overlay } from 'react-native-elements';
import { Container, Header, Content, Left, Right, Body, Title } from 'native-base';

const Username = ({ navigation, route }) => {
    const iconValue = useRef(new Animated.Value(24)).current
    const [visible, setVisible] = useState(false)
    const [username, setUserName] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const handleBack = () => {
        // validation first
        navigation.navigate('SignUp', {
            name, email, phone, password
        })
    }
    const nextSlide = () => {        
    navigation.navigate('Welcome')
    setVisible(false)
    }
    const handleSignUp = () => {
        setVisible(true)
        setUserName('')
        Animated.timing(iconValue, {
            toValue: 35,
            duration: 1000,
        }).start()
    }
    useEffect(() => {
        if(route.params?.name){
            setName(route.params.name)
        }
        if(route.params?.email){
            setEmail(route.params.email)
        }
        if(route.params?.phone){
            setPhone(route.params.phone)
        }
        if(route.params?.password){
            setPassword(route.params?.password)
        }
    },[route.params])
    console.log(route.params, 'on line 32 username')
    return(
        <Container>
            <Header style={{backgroundColor: '#3480eb'}}>
                <Left>
                    <Icon
                        type='font-awesome'
                        name='angle-left'
                        size={24}
                        color='#fff'
                        onPress = {handleBack}
                    />                
                </Left>
                <Body style={{alignItems: 'center'}}>
                    <Title>Book Champ</Title>
                </Body>
                <Right>
                    <Image source={logo()} 
                    style={style.img} />
                </Right>
            </Header>
            <Content padder style={style.container}>
                <StatusBar backgroundColor="#1258ba" />
                <View style={{...style.viewImg, marginTop: 70, marginBottom: 30}}>
                    <Text style={style.usertext}>Create a username</Text>    
                </View>
                <Input
                    value = {username}
                    label = 'Username'
                    labelStyle = {style.label}
                    placeholder='Username'
                    leftIcon={
                        <Icon
                        type='font-awesome'
                        name='user-circle'
                        size={24}
                        color='#3480eb'
                        />
                    }
                    errorStyle={{ color: 'red' }}
                    errorMessage=''
                    onChangeText={value => setUserName(value)}
                />
                <View style={{...style.viewImg, marginTop: 20}}>
                    <Button
                        onPress = {handleSignUp}
                        raised
                        buttonStyle = {{width: 150}}
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
                <Overlay isVisible={visible} >
                    <View style={style.modalView}>
                            <Icon
                                type='font-awesome'
                                name="check"
                                size={50}
                                color="#00cc00"
                            />
                        <Text style={style.overlayText}>You are registered</Text>
                        <Text style={style.overlayText}>CONGRATULATIONS!</Text>
                        <Button
                            onPress = {nextSlide}
                            raised
                            buttonStyle = {{width: 150}}
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
                            titleStyle={{marginRight: 10}}
                            title="Continue"
                        />
                    </View>                   
                </Overlay>
            </Content>
        </Container>
    )
}
export default Username

const style = StyleSheet.create({
    container: {
        flex: 1,
    },
    label: {
        color: '#3480eb'
    },
    img: {
        width: 40,
        height: 40,
        borderRadius: 4,
    },
    viewImg: {
        margin: 10,
        alignItems: 'center',
    },
    usertext: {
        fontSize: 22,
        color: '#3480eb'
    },
    modalView: {
        padding: 20,
        backgroundColor: '#fff',
    },
    overlayText: {
        marginBottom: 20,
    },
})