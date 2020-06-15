import React from 'react'
import { View, Platform, StyleSheet, Image, Text } from 'react-native'
import { Container, Header, Content, Left, Button, Body, Subtitle, Toast, Right, Icon as NativeIcon } from 'native-base'
import isJson from '../processes/isJson'
import { useSelector, useDispatch } from 'react-redux'
import {like, archived} from '../actions/learn'

const ReadPost = ({ navigation, route}) => {
    const {index, subject} = route.params
    const dispatch = useDispatch()
    const store = isJson(useSelector(state => state.learn))
    const item = isJson(store.displayItems).filter(element => {
        if(element.id == index) return element
    })[0]
    const likes = (id) => {
        dispatch(like(id))
    }
    const archive = (id) => {
        if(!item.archive) {
            dispatch(archived(id))
        }
    }
    console.log(isJson(useSelector(state => state.archive)))
    return(
        <Container style={{backgroundColor: "#fff"}}>
            <Header style={style.header}>
                <Left>
                    <Button transparent onPress={() => navigation.navigate('Subject')}>
                        <NativeIcon  name={Platform.OS == 'ios' ? 'chevron-back-outline' : 'arrow-back'} />
                    </Button>
                </Left>
                <Body>
                    <Subtitle>
                        The title goes here
                    </Subtitle>
                </Body>
                <Right>
                    <Button transparent >
                        <NativeIcon type='FontAwesome5' name='ellipsis-v' style={{fontSize: 18, color: '#fff'}} />
                    </Button>
                </Right>
            </Header>
            <Content>
                <View style={style.imgView}>
                    <Image source={item.img} style={style.img} />
                </View>
                <View style={style.textView}>
                    <Text>{item.text}</Text>
                </View>
                <View style={style.actions}>
                    <View style={style.action}>
                        <NativeIcon 
                            type={item.like ? 'Ionicons' : 'FontAwesome5'} 
                            onPress={() => likes(item.id)} 
                            name='heart' 
                            style={{color: item.like ? 'red' : '#777', fontSize: 20}} />
                    </View>
                    <View style={style.action}>
                        <NativeIcon 
                            type={item.seen ? 'Ionicons' : 'FontAwesome5'} 
                            name='eye' 
                            style={{color: '#777', fontSize: 20}} />
                    </View>
                    <View style={style.action}>
                        <NativeIcon 
                            onPress={() => {archive({item: item, subject: subject}); Toast.show({ text: `Saved to your ${subject} archive`, buttonText: 'CLOSE', style: {backgroundColor: 'green'} })}}
                            type='Ionicons'
                            name='md-archive'
                            style={{color: item.archive ? 'green' : '#777', fontSize: 20}} 
                        />
                    </View>
                </View>
            </Content>
        </Container>
    )
}

const style = StyleSheet.create({
    header: {
        marginTop: 20,
        backgroundColor: '#054078',
    },
    imgView: {
        marginBottom: 15,
    },
    img: {
        width: '100%',
        height: 200,
    },
    textView: {
        padding: 15,
    },
    actions: {
        flexDirection: 'row',
        marginTop: 20,
    },
    action: {
        width: '20%',
        alignItems: 'flex-end',
    },
})

export default ReadPost