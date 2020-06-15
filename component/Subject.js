import React, { useState } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import { SearchBar } from 'react-native-elements';
import { Container, Header, Content, Item, Toast, Card, CardItem, Left, Body, Title, InputGroup, Input, Right, Button, Icon as NativeIcon } from 'native-base'
import { View, Text, StatusBar, StyleSheet, Image, Platform, ActivityIndicator } from 'react-native'
import {lionel, league, league2} from '../processes/image'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import isJson from '../processes/isJson';
import {like, archived} from '../actions/learn'
import { useDispatch, useSelector } from 'react-redux';

const Subject = ({ navigation, route }) => {
    const {subject} = route.params
    const dispatch = useDispatch()
    const store = isJson(useSelector(state => state.learn))
    const disItems = isJson(store.displayItems)
    const [changeHeader, setChangeHeader] = useState(true)
    const [search, setSearch] = useState('')
    const [loading, setLoading] = useState(false)
    useFocusEffect(
        React.useCallback(() => {
            StatusBar.setBarStyle('light-content');
            Platform.OS === 'android' && StatusBar.setBackgroundColor('#054078');
            return () => {
            }
        }, [])       
    )
    const takeTo = (i) => {
        navigation.navigate('ReadPost', {subject: subject, index: i})
    }
    const likes = (id) => {
        dispatch(like(id))
    }
    const searchHeader = () => {
        setChangeHeader(!changeHeader)
    }
    const updateSearch = (search) => {
        setSearch(search)
        if(search){
            setLoading(true)
        }
    }
    const archive = (item) => {
        if(!item.archive) {
            dispatch(archived({item: item, subject: subject}))
        }
    }
    const searchContent = () => {} 
    return(
        <Container style={{backgroundColor: "#fff"}}>
            <Header searchBar={changeHeader? false : true} style={style.header}>
                {changeHeader ? 
                <>
                    <Left>
                        <Button transparent onPress={() => navigation.navigate('Learn')}>
                            <NativeIcon  name={Platform.OS == 'ios' ? 'chevron-back-outline' : 'arrow-back'} />
                        </Button>
                    </Left>
                    <Body>
                        <Title>
                            {subject}
                        </Title>
                    </Body>
                    <Right>
                        <NativeIcon onPress={searchHeader} name={Platform.OS == 'ios' ? 'ios-search' : 'search'} style={{color: '#fff', fontSize: 22}} />
                    </Right>
                </>
                :
                <>
                    {Platform.OS == 'ios' ? 
                    <>
                        <Item>
                            <Icon name="ios-search" onPress={searchContent} />
                            <Input placeholder="Search" />
                            <Icon name="close" />
                        </Item>
                        <Button transparent onPress={searchHeader}>
                            <Text>Cancel</Text>
                        </Button>
                    </>
                    : 
                    <>
                        <Item>
                            <NativeIcon name="ios-search" onPress={searchContent} />
                                <Input 
                                    placeholder="Search" 
                                    value = {search}
                                    onChangeText = {text => {updateSearch(text)}}
                                />
                            {search.length ? <ActivityIndicator size="small" color="#0000ff" /> : <Text></Text>}
                            <NativeIcon name="arrow-forward" onPress={searchHeader} />                      
                        </Item>
                    </>
                    }
                </>
                }
            </Header>
            <Content>
                <View>
                    <Image source={lionel()} style={style.lionel} />
                </View>
                {disItems.map((item, i) => {
                    return (
                        <Card style={style.content} key={item.id}>
                            <CardItem>
                                <Body>
                                    <View style={style.imgContainer}>
                                        <View style={style.viewImg}> 
                                            <TouchableWithoutFeedback onPress={() => takeTo(item.id)}>
                                                <Image source={item.img} style={style.league} />
                                            </TouchableWithoutFeedback>
                                        </View>
                                        <View style={style.imgText}>
                                            <TouchableWithoutFeedback onPress={() => takeTo(item.id)}>
                                                <Text numberOfLines={6}>
                                                    {item.text}
                                                </Text>                        
                                            </TouchableWithoutFeedback>
                                            <View style={style.action}>
                                                <View style={style.actions}>
                                                    <NativeIcon type={item.like ? 'Ionicons' : 'FontAwesome5'} onPress={() => likes(item.id)} name='heart' style={{color: item.like ? 'red' : '#777', fontSize: 20}} />
                                                </View>
                                                <View style={style.actions}>
                                                    <NativeIcon type={item.seen ? 'Ionicons' : 'FontAwesome5'} name='eye' style={{color: '#777', fontSize: 20}} />
                                                </View>
                                                <View style={style.actions}>
                                                    <NativeIcon 
                                                        onPress={() => {archive(item); Toast.show({ text: `Saved to your ${subject} archive`, buttonText: 'CLOSE', style: {backgroundColor: 'green'} })}} 
                                                        type= 'Ionicons' 
                                                        name= 'md-archive' 
                                                        style={{color: item.archive ? 'green' : '#777', fontSize: 20}} />
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </Body>
                            </CardItem>
                        </Card>
                    )
                })}
                
            </Content>
        </Container>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        marginTop: 20,
        backgroundColor: '#054078',
    },
    lionel: {
        width: '100%',
        height: 180,
    },
    content: {
        marginTop: 25,
    },
    imgContainer: {
        flexDirection: 'row',
    }, 
    viewImg: {
        width: '40%'
    },
    league: {
        width: '100%',
        height: 130,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
    },
    imgText: {
        width: '60%',
        paddingLeft: 15,
    },
    blue: {
        color: 'blue',
    },
    action: {
        flexDirection: 'row',
        paddingTop: 10,
    },
    actions: {
        width: '33%',
        alignItems: 'center',
    },
})

export default Subject