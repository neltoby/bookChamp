import React, {useState} from 'react'
import logo from '../processes/image'
import { Container, Content, Form, Button } from 'native-base';
import { Input, Icon } from 'react-native-elements';
import {StatusBar, View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native'
console.log(logo)
const Login = ({navigation}) => {
    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [notVisible, setNotVisible] = useState(true) 
    const signUp = ()=> {
        navigation.navigate('SignUp')
    }
    const submit = () => {
        navigation.navigate('Home', { screen: 'SelectHome' })
    }
    return(
        <Container>

            <Content style={style.content}>
                <StatusBar backgroundColor="#1258ba" />
                <View style={style.container}>
                    <View style={style.viewImg}>
                        <Image style={style.img} source={logo()}/>
                    </View>
                    <View style={style.divider}>
                        <View style={style.divider1}>
                            <Text style={{...style.text, fontWeight: 'bold'}}>LOGIN</Text>
                        </View>
                        <View style={style.divider2}>
                        <TouchableOpacity
                            style={style.button}
                            onPress={signUp}
                        >
                            <Text style={style.text}>SIGN UP</Text>
                        </TouchableOpacity>
                        </View>
                    </View>                   
                </View>
                <View style={style.viewInput}>
                    <Form style={style.form}>
                        <Input
                            inputStyle={style.input}
                            inputContainerStyle={style.inputs}
                            label = 'Username'
                            labelStyle = {style.label}
                            placeholder="Username"
                            style={style.input}
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
                        <Input
                            secureTextEntry={notVisible}
                            inputStyle={style.input}
                            inputContainerStyle={style.inputs}
                            label = 'Password'
                            labelStyle = {style.label}
                            placeholder="Password"
                            style={style.input}
                            leftIcon={
                                <Icon
                                type='material'
                                name='https'
                                size={24}
                                color='#fff'
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
                            onChangeText={value => setPassword(value)}
                        /> 
                            <Button block style={style.but} onPress={submit}>
                                <Text style={{...style.label, fontWeight: 'bold'}}>LOGIN</Text>
                            </Button>
                    </Form>
                </View>
            </Content>
        </Container>
    )
}

const style = StyleSheet.create({
    content: {
        flex: 1,
        backgroundColor: '#3480eb',
    },
    container: {
        alignItems: 'center',
    },
    viewImg: {
        marginVertical: 60,
    },
    img: {
        width: 120,
        height: 120,
        backgroundColor: 'transparent',
    },
    divider: {
        flexDirection: 'row',
        marginBottom: 50,
    },
    divider1: {
        flexDirection: 'row',
        width: '50%',
        paddingRight: 30,
        justifyContent: 'flex-end'
    },
    divider2: {
        width: '50%',
        paddingLeft: 30,
    },
    viewInput: {
        alignItems: 'center'
    },
    form: {
        width: '80%'
    },
    input: {
        color: '#fff',
    },
    inputs: {
        borderColor: '#fff',
    },
    text: {
        fontSize: 18,
        fontWeight: '500',
        color: '#fff',
    },
    label: {
        color: '#fff'
    },
    but: {
        backgroundColor: '#1258ba',
        marginTop: 50
    }
})

export default Login