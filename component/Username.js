import React, {useState, useEffect, useRef} from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import logo from '../processes/image'
import {View, Text, StyleSheet, StatusBar, Image, Animated, useWindowDimensions, Platform} from 'react-native'
import { Input, Button, Icon, Overlay } from 'react-native-elements';
import { Container, Header, Content, Left, Right, Body, Title, Icon as NativeIcon, Button as NButton } from 'native-base';

const Username = ({ navigation, route }) => {
    const windowHeight = useWindowDimensions().height;
    const iconValue = useRef(new Animated.Value(24)).current
    const [visible, setVisible] = useState(false)
    const [imgUrl, setImg] = useState({})
    const [username, setUserName] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
      
        console.log(result);
      
          if (!result.cancelled) {
            setImg(result);
          }
    }
    const handleBack = () => {
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
        <Container style={{backgroundColor: '#054078'}}>
            <LinearGradient
                colors={['transparent', '#e1efef']}
                style={{...style.gradient, height: windowHeight,}}
            />
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
                style={style.container}
            >
                <StatusBar backgroundColor="#054078" />
                <View style={{...style.viewImg, marginBottom: 30}}>
                    <Image 
                        source={Object.entries(imgUrl).length ? { uri: imgUrl.uri } : require('../img/anonymous.jpg') } 
                        style={style.imgUrl} 
                    />
                    <View style={style.upload}>
                        <NButton small onPress={pickImage} style={{paddingHorizontal: 5, backgroundColor: '#054078'}}>
                            <Text style={{color: '#fff', fontWeight: 'bold'}}>UPLOAD A PICTURE</Text>
                        </NButton>
                    </View>
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
                            buttonStyle = {{width: 150, backgroundColor: '#1258ba'}}
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
    gradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
    },
    container: {
        // flex: 1,
    },
    label: {
        color: '#fff'
    },
    img: {
        width: 40,
        height: 40,
        borderRadius: 4,
    },
    imgUrl: {
        width: 120,
        height: 120,
    },
    upload: {
        marginTop: 20,
    },
    viewImg: {
        margin: 10,
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
    modalView: {
        padding: 20,
        backgroundColor: '#fff',
    },
    overlayText: {
        marginBottom: 20,
    },
})