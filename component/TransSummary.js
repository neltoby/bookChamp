import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { Text, StyleSheet, useWindowDimensions } from 'react-native'
import { Container, Header, Body, Title, Left, Right, Content, View } from 'native-base'

const TransSummary = ({navigation, route}) => {
    const windowHeight = useWindowDimensions().height;
    const {amt, unit} = route.params
    return(
        <Container style={style.header}>
            <LinearGradient
                colors={['transparent', '#e1efef']}
                style={{...style.gradient, height: windowHeight,}}
            />
            <Header transparent>
                <Left />
                <Body>
                    <Title>
                        Transaction Summary
                    </Title>
                </Body>
                <Right />
            </Header>
            <Content contentContainerStyle={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <View style={style.content}>
                    <View style={style.cover}>
                        <View style={style.right}>
                            <Text style={style.text}>Amount paid</Text>
                        </View>
                        <View style={style.left}>
                            <Text style={style.text}>{amt}</Text>
                        </View>
                    </View>
                    <View style={style.cover}>
                        <View style={style.right}>
                            <Text style={style.text}>Unit bought</Text>
                        </View>
                        <View style={style.left}>
                            <Text style={style.text}>{unit}</Text>
                        </View>
                    </View>
                    <View style={style.cover}>
                        <View style={style.right}>
                            <Text style={style.text}>User ID</Text>
                        </View>
                        <View style={style.left}>
                            <Text style={style.text}>XXXXX</Text>
                        </View>
                    </View>
                    <View style={style.cover}>
                        <View style={style.right}>
                            <Text style={style.text}>Transaction ID</Text>
                        </View>
                        <View style={style.left}>
                            <Text style={style.text}>XXXXX</Text>
                        </View>
                    </View>
                    <View style={style.datecover}>
                            <Text style={style.color}>Date : </Text>
                    </View>
                    <View style={style.datecover}>
                        <Text style={style.color}>Thanks for your patronage</Text>
                    </View>
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
    header: {
        backgroundColor: '#054078'
    },
    content: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    cover: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    right: {
        width: '50%',
        flexDirection: 'row-reverse',
        paddingHorizontal: 20,
    },
    left: {
        flexDirection: 'row',
        width: '50%',
        paddingHorizontal: 20,
    },
    text: {
        fontSize: 18,
        color: '#fff',
    },
    color: {
        color: '#fff',
    },
})

export default TransSummary