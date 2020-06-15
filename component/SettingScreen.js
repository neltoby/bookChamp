import React, { useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, StyleSheet, StatusBar, Platform, useWindowDimensions } from 'react-native'
import { Container, Header, Left, Body, Title, Right, Content, Button, DatePicker } from 'native-base'
import { Input, Icon, Avatar, Badge, withBadge } from 'react-native-elements';

const BadgedIcon = withBadge(1)(Icon)
const SettingScreen = () => {
    const windowHeight = useWindowDimensions().height;
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [selectedDate, setSelectedDate] = useState(new Date())
    const [notVisible, setNotVisible] = useState(true)
    const [verify, setVerify] = useState(true)
    useFocusEffect(
        React.useCallback(() => {
            StatusBar.setBarStyle('light-content');
            Platform.OS === 'android' && StatusBar.setBackgroundColor('#054078');
            return () => {
            }
        }, []) 
    )
    const callSelectedDate = (date) => {
        setSelectedDate(date)
    }

    return(
        <Container style={{backgroundColor: "#054078"}}>
            <LinearGradient
                colors={['transparent', '#e1efef']}
                style={{...style.gradient, height: windowHeight,}}
            />
            <Header transparent>
                <Left/>
                <Body>
                    <Title>
                        Settings
                    </Title>
                </Body>
                <Right />
            </Header>
            <Content contentContainerStyle={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                {verify ? 
                    <View style={style.verifyContainer}>
                        <View style={style.editTitle}><Text>EDIT PROFILE</Text></View>
                        <View style={style.badge}>
                            <Avatar
                                rounded
                                source={require('../img/user.jpg')}
                                size="xlarge"
                                
                            />
                            {/* <BadgedIcon type="ionicon" name="create" style={{ position: 'absolute', top: -4, right: 12 }} /> */}
                            <Badge
                                value={<Icon type='Ionicons' name='create' color='#fff' size={17}/>}
                                containerStyle={{ backgroundColor: 'transparent', padding: 3, position: 'absolute', top: -4, right: 12 }}
                            />
                        </View>
                        <View style={style.container}>
                            <Input
                                inputStyle={style.input}
                                inputContainerStyle={style.inputs}
                                label = 'Fullname'
                                value={name}
                                labelStyle = {style.label}
                                placeholder="Fullname"
                                style={style.input}
                                leftIcon={
                                    <Icon
                                    type='material'
                                    name='https'
                                    size={24}
                                    color='#fff'
                                    />
                                }      
                                onChangeText={value => setName(value)}
                            />
                        </View>
                        <View style={style.container}>
                            <DatePicker
                                defaultDate={new Date(2018, 4, 4)}
                                minimumDate={new Date(2018, 1, 1)}
                                maximumDate={new Date(2018, 12, 31)}
                                locale={"en"}
                                timeZoneOffsetInMinutes={undefined}
                                modalTransparent={false}
                                animationType={"fade"}
                                androidMode={"default"}
                                placeHolderText="Select date"
                                textStyle={{ color: "#054078" }}
                                placeHolderTextStyle={{ color: "#fff" }}
                                onDateChange={callSelectedDate}
                                disabled={false}
                                />
                            <Text>Date : {selectedDate.toString().substr(4, 12)}</Text>
                        </View>
                        <View style={style.container}>
                            <Input
                                inputStyle={style.input}
                                inputContainerStyle={style.inputs}
                                label = 'Phone'
                                value={phone}
                                labelStyle = {style.label}
                                placeholder="Phone"
                                style={style.input}
                                leftIcon={
                                    <Icon
                                    type='material'
                                    name='https'
                                    size={24}
                                    color='#fff'
                                    />
                                }      
                                onChangeText={value => setPhone(value)}
                            />
                        </View>
                        <View style={style.container}>
                        <Input
                                inputStyle={style.input}
                                inputContainerStyle={style.inputs}
                                label = 'Email'
                                value={email}
                                labelStyle = {style.label}
                                placeholder="Email"
                                style={style.input}
                                leftIcon={
                                    <Icon
                                    type='material'
                                    name='https'
                                    size={24}
                                    color='#fff'
                                    />
                                }      
                                onChangeText={value => setEmail(value)}
                            />
                        </View>
                    </View>
                    :
                    <>
                    <View style={style.container}>
                        <Input
                            secureTextEntry={notVisible}
                            inputStyle={style.input}
                            inputContainerStyle={style.inputs}
                            label = 'Password'
                            value={password}
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
                                <Button transparent style={{color: '#fff'}} onPress={() => setNotVisible(!notVisible)}>
                                    <Text style={{color: '#fff', fontSize: 14, fontWeight: 'bold'}}>{notVisible ? 'SHOW' : 'HIDE'}</Text>
                                </Button>
                            }     
                            onChangeText={value => setPassword(value)}
                        /> 
                    </View>
                    <View style={{...style.container, marginTop: 20, paddingHorizontal: 6}}>
                        <Button block >
                            <Text style={{color: '#fff', fontWeight: 'bold'}}>CONTINUE</Text>
                        </Button>
                    </View>
                    </>
                }
                
            </Content>
        </Container>
    )
}

const style = StyleSheet.create({
    header: {
        backgroundColor: '#054078',
    },
    gradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
    },
    verifyContainer: {
        width: '100%',
        alignItems: 'center'
    },
    container: {
        width: '80%',
    },
    label: {
        color: '#fff'
    },
    inputs: {
        borderColor: '#fff',
    },
    input: {
        color: '#fff',
    },
})

export default SettingScreen