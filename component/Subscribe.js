import React from 'react'
import { useFocusEffect } from '@react-navigation/native';
import { Container, Header, Content, Tab, Tabs, Left, Button, Icon, Body, Title, Right } from 'native-base';
import { View, Text, StyleSheet, StatusBar, Platform } from 'react-native'
import Basic from './Basic'
// import Medium from './Medium'
// import Mega from './Mega'

const Subscribe = ({navigation}) => {
    useFocusEffect(
        React.useCallback(() => {
            StatusBar.setBarStyle('light-content');
            Platform.OS === 'android' && StatusBar.setBackgroundColor('#054078');
            return () => {
            }
        }, [])       
    )
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
    return (
        <Container style={style.header}>
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
                <Tabs>
                    {title.map((item, i) => {
                        return(
                            <Tab heading={item.text} key={`${item.text}${i}`}>
                                <Basic dataContent={item.dataContent} navigation={navigation} />
                            </Tab>
                        )
                    })}
                </Tabs>
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