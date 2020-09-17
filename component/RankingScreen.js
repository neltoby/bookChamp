import React from 'react'
import deviceSize from '../processes/deviceSize'
import { View, Text, StyleSheet } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import FocusAwareStatusBar from './FocusAwareStatusBar'
import LiveRanks from './LiveRanks'
import DailyWins from './DailyWins'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { Container, Header, Content, Left, Button, Icon, Body, Title, Right, List, ListItem } from 'native-base';

const Tab = createMaterialTopTabNavigator();

const RankingScreen = ({navigation}) => {
    const deviceHeight = deviceSize().deviceHeight
    return (
        <Container style={style.header}>
            <LinearGradient
                colors={['transparent', '#e1efef']}
                style={{...style.gradient, height: deviceHeight,}}
            />
            <FocusAwareStatusBar barStyle='light-content' backgroundColor='#054078' />
            <Header transparent hasTabs >
                <Left>
                    <Button transparent onPress={() => navigation.goBack()}>
                        <Icon  name={Platform.OS == 'ios' ? 'chevron-back-outline' : 'arrow-back'} />
                    </Button>
                </Left>
                <Body>
                    <Title>Ranking</Title>
                </Body>
                <Right />
            </Header>
            <Content>
                <Tab.Navigator 
                    initialRouteName='Basic'
                    tabBarOptions={{
                        activeTintColor: 'yellow',
                        inactiveTintColor: '#fff',
                        labelStyle: {fontWeight: 'bold'},
                        style: {backgroundColor: 'transparent', elevation: 0}
                    }}
                >
                    <Tab.Screen name="Live ranks" component={LiveRanks} />
                    <Tab.Screen name="Daily winners" component={DailyWins} />
                </Tab.Navigator>
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
})

export default RankingScreen