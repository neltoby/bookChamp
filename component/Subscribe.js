import React, { useState } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import FocusAwareStatusBar from './FocusAwareStatusBar'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Container, Header, Content, Left, Button, Icon, Body, Title, Right } from 'native-base';
import { View, Text, StyleSheet, StatusBar, Platform, BackHandler } from 'react-native'
import Basic from './Basic'
const Tab = createMaterialTopTabNavigator();
const dataContent = [
    {amt: '#50', unit: ' 1 unit'},
    {amt: '#100', unit: ' 3 unit'},
    {amt: '#200', unit: ' 7 unit'},
    {amt: '#300', unit: ' 12 unit'},
    {amt: '#400', unit: ' 17 unit'},
]
const medium = [
    {amt: '#500', unit: ' 20 unit'},
    {amt: '#800', unit: ' 35 unit'},
    {amt: '#1000', unit: ' 45 unit'},
    {amt: '#1500', unit: ' 70 unit'},
    {amt: '#2000', unit: ' 100 unit'},
]
const mega = [
    {amt: '#2500', unit: ' 135 unit'},
    {amt: '#3000', unit: ' 175 unit'},
    {amt: '#3500', unit: ' 220 unit'},
    {amt: '#4000', unit: ' 270 unit'},
    {amt: '#4500', unit: ' 325 unit'},  
    {amt: '#5000', unit: ' 385 unit'},      
]
const title = [
    {text: 'Basic', dataContent: dataContent },
    {text: 'Medium', dataContent: medium },
    {text: 'Mega', dataContent: mega }
]

const Base = ({navigation}) => <Basic dataContent={dataContent} navigation={navigation} />
const Medium = ({navigation}) => <Basic dataContent={medium} navigation={navigation} />
const Mega = ({navigation}) => <Basic dataContent={mega} navigation={navigation} />

const Subscribe = ({navigation}) => {
    
    return (
        <Container style={style.header}>
            <FocusAwareStatusBar barStyle='light-content' backgroundColor='#054078' />
            <Header transparent hasTabs >
                <Left>
                    <Button transparent onPress={() => navigation.goBack()}>
                        <Icon  name={Platform.OS == 'ios' ? 'chevron-back-outline' : 'arrow-back'} />
                    </Button>
                </Left>
                <Body>
                    <Title>Subscription</Title>
                </Body>
                <Right />
            </Header>
                <Tab.Navigator 
                    initialRouteName='Basic'
                    tabBarOptions={{
                        activeTintColor: 'yellow',
                        inactiveTintColor: '#fff',
                        labelStyle: {fontWeight: 'bold'},
                        style: {backgroundColor: 'transparent', elevation: 0}
                    }}
                >
                    <Tab.Screen name="Basic" component={Base} />
                    <Tab.Screen name="Medium" component={Medium} />
                    <Tab.Screen name="Mega" component={Mega} />
                </Tab.Navigator>
        </Container>
    )
}

const style = StyleSheet.create({
    header: {
        // marginTop: 20,
        backgroundColor: '#054078',
    },
    gradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
    },
    tabBar: {
        backgroundColor: 'green'
    }
})

export default Subscribe