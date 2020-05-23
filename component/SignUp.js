import React, {useState, useEffect} from 'react'
import logo from '../processes/image'
import SimpleReactValidator from 'simple-react-validator';
import { Container, Header, Content, Left, Right, Body, Title } from 'native-base';
import {View, Text, StyleSheet, StatusBar, Image} from 'react-native'
import { Input, Avatar, Divider, Button, Icon } from 'react-native-elements';

const SignUp = ({ navigation, route }) => {
    const [errs, setErrs] = useState({})
    const [nameCheck, setNameCheck] = useState('')
    const [notVisible, setNotVisible] = useState(true) 
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    let clear
    const validator = new SimpleReactValidator();
    handleSignUp = () => {
        // validation first
        if (validator.allValid()) {
            setErrs({})
            if(name.trim().split(' ').length > 1){
                navigation.navigate('Username', {
                    name, email, phone, password
                })
            }else{
                setNameCheck('Other name is missing')
                clear = setTimeout(() => {
                    setNameCheck('')
                }, 3000);
            }
        }else{
            setErrs({...validator.getErrorMessages()})
            clear = setTimeout(() => {
                setErrs({})
            }, 4000);
        }
    }
    const login = () => {
        navigation.navigate('Login')
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
        return () => {
            setErrs({})
            clearTimeout(clear)
        }
    },[route.params])
    return(
        
            <Container>
                <Header style={{backgroundColor: '#3480eb'}}>
                    <Left>
                        <Button
                            buttonStyle = {{borderColor: '#fff'}}
                            title="LOGIN"
                            type="outline"
                            onPress = {login}
                            titleStyle={{color: '#fff', fontSize: 12}}
                        />
                    </Left>
                    <Body style={{alignItems: 'center'}}>
                        <Title>Book Champ</Title>
                    </Body>
                    <Right>
                        <Image source={logo()} style={style.img} />
                    </Right>
                </Header>
                <Content padder style={style.container}>
                <StatusBar backgroundColor="#1258ba" />
                <View style={{...style.viewImg, marginTop: 70, marginBottom: 30}}>
                    <Text style={style.signUp}>SIGN UP</Text>  
                    {validator.message('Fullname', name, 'required|alpha_num_dash_space|min:4|max:30')}
                    {validator.message('Email', email, 'required|email')}
                    {validator.message('Phone', phone, 'required|phone')}
                    {validator.message('Password', password, 'required|alpha_num_dash_space')}
                </View>
                <Input
                    label = 'FullName'
                    labelStyle = {style.label}
                    placeholder='FullName'
                    leftIcon={
                        <Icon
                        type='material'
                        name='person'
                        size={24}
                        color='#3480eb'
                        />
                    }
                    errorStyle={{ color: 'red' }}
                    errorMessage={errs.Fullname ? errs.Fullname : nameCheck}
                    onChangeText={value => setName(value)}
                />
                <Input
                    label = 'Email'
                    labelStyle = {style.label}
                    placeholder="Email"
                    style={style.input}
                    leftIcon={
                        <Icon
                        type='material'
                        name='email'
                        size={24}
                        color='#3480eb'
                        />
                    }
                    errorStyle={{ color: 'red' }}
                    errorMessage={errs.Email ? errs.Email : ''}
                    onChangeText={value => setEmail(value)}
                />               
                <Input
                    label = 'Phone Number'
                    labelStyle = {style.label}
                    placeholder="Phone Number"
                    style={style.input}
                    leftIcon={
                        <Icon
                            type='material'
                            name='call'
                            size={24}
                            color='#3480eb'
                        />
                    }
                    errorStyle={{ color: 'red' }}
                    errorMessage={errs.Phone ? errs.Phone : ''}
                    onChangeText={value => setPhone(value)}
                />
                <Input
                    secureTextEntry={notVisible}
                    label = 'Password'
                    labelStyle = {style.label}
                    placeholder="Password"
                    style={style.input}
                    leftIcon={
                        <Icon
                            type='material'
                            name='https'
                            size={24}
                            color='#3480eb'
                        />
                    }
                    rightIcon={
                        <Icon
                            type='font-awesome'
                            name={notVisible ? 'eye' : 'eye-slash'}
                            size={24}
                            color='#aaa'
                            onPress={() => setNotVisible(!notVisible)}
                        />
                    }
                    errorStyle={{ color: 'red' }}
                    errorMessage={errs.Password ? errs.Password : ''}
                    onChangeText={value => setPassword(value)}
                />
                
            <View style={{...style.viewImg, marginTop: 20}}>
                <Button
                    onPress = {() => handleSignUp()}
                    raised
                    buttonStyle = {{width: 150}}
                    type = 'outline'
                    icon={
                        <Icon
                        type='font-awesome'
                        name="chevron-circle-right"
                        size={20}
                        color="#3480eb"
                        />
                    }
                    iconRight 
                    titleStyle={{marginRight: 10}}
                    title="CONTINUE"
                />
            </View>
                </Content>
            </Container>
       
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
    },
    img: {
        width: 40,
        height: 40,
        borderRadius: 4,
    },
    viewImg: {
        // height: 100,
        margin: 10,
        alignItems: 'center',
    },
    signUp: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#3480eb',
    },
    label: {
        color: '#3480eb'
    }
})
export default SignUp