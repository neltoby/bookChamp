import React, { useState, lazy, Suspense } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import { SearchBar } from 'react-native-elements';
import FocusAwareStatusBar from './FocusAwareStatusBar'
import { Container, Header, Content, Spinner, Item, Toast, Card, CardItem, Left, Body, Title, InputGroup, Input, Right, Button, Icon as NativeIcon } from 'native-base'
import { View, Text, StatusBar, StyleSheet, Image, Platform, ActivityIndicator } from 'react-native'
import {lionel, league, league2} from '../processes/image'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import isJson from '../processes/isJson'; 
import deviceSize from '../processes/deviceSize'
import Rolling from './Rolling'
import { getArticles } from '../actions/request'
import {like, archived} from '../actions/learn'
import { useDispatch, useSelector } from 'react-redux';

const Overlay = lazy(() => import('./Overlay'))
const ErrorPage = lazy(() => import('./ErrorPage'))
// const deviceHeight = deviceSize().deviceHeight
// const deviceWidth = deviceSize().deviceWidth

const Subject = ({ navigation, route }) => {
    const deviceHeight = deviceSize().deviceHeight
    const deviceWidth = deviceSize().deviceWidth
    const {subject} = route.params
    const dispatch = useDispatch()
    const store = isJson(useSelector(state => state.learn))
    const disItems = isJson(store.displayItems)
    const [changeHeader, setChangeHeader] = useState(true)
    const [search, setSearch] = useState('')
    const [loading, setLoading] = useState(false)

    useFocusEffect(
        React.useCallback(() => {
            // console.log('from subject with '+ subject)
            dispatch(getArticles(subject))
            return () => {
            }
        }, [subject])       
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
            <FocusAwareStatusBar barStyle='light-content' backgroundColor='#054078' />
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
                {store.load_error ?
                    (
                        <Suspense fallback={<View><Text>Loading...</Text></View>}>
                            <ErrorPage/>
                        </Suspense>
                    )
                    :
                    store.loading_article ?
                    (
                        <Suspense fallback={<View><Text>Loading...</Text></View>}>
                            <Overlay isVisible={true} deviceWidth={deviceWidth} deviceHeight={deviceHeight}>
                                <Rolling text={`${subject}...`} />
                            </Overlay>
                        </Suspense>
                    )
                    :
                    disItems.length ? 
                    (
                        <>
                            <View>
                                <Image source={lionel()} style={style.lionel} />
                            </View>
                            {disItems.map((item, i) => (
                                <Card style={style.content} key={item.id}>
                                    <CardItem>
                                        <Body>
                                            <View style={style.imgContainer}>
                                                {item.image !== null ? (
                                                <View style={style.viewImg}> 
                                                    <TouchableWithoutFeedback onPress={() => takeTo(item.id)}>
                                                        <Image source={item.img} style={style.league} />
                                                    </TouchableWithoutFeedback>
                                                </View>
                                                ) : null}
                                                <View style={{...style.imgText, width: item.image !== null ? '60%': '100%'}}>
                                                    {item.image === null ? (
                                                        <Text numberOfLines={1} style={style.title}>
                                                            {item.title}
                                                        </Text> 
                                                    ) : null}
                                                    <TouchableWithoutFeedback onPress={() => takeTo(item.id)}>
                                                        <Text numberOfLines={6}>
                                                            {item.body}
                                                        </Text>                        
                                                    </TouchableWithoutFeedback>
                                                    <View style={item.image !== null ? style.action : {...style.action, flexDirection: 'row-reverse'}}>
                                                        <View style={{width: item.image !== null ? '100%' : '60%', flexDirection: 'row'}}>
                                                            <View style={style.actions}>
                                                                <NativeIcon type={item.liked ? 'Ionicons' : 'FontAwesome5'} onPress={() => likes(item.id)} name='heart' style={{color: item.liked ? 'red' : '#777', fontSize: 20}} />
                                                            </View>
                                                            <View style={style.actions}>
                                                                <NativeIcon type={item.read ? 'Ionicons' : 'FontAwesome5'} name='eye' style={{color: '#777', fontSize: 20}} />
                                                            </View>
                                                            <View style={style.actions}>
                                                                <NativeIcon 
                                                                    onPress={() => {archive(item); Toast.show({ text: `Saved to your ${subject} archive`, buttonText: 'CLOSE', style: {backgroundColor: 'green'} })}} 
                                                                    type= 'Ionicons' 
                                                                    name= 'md-archive' 
                                                                    style={{color: item.archived ? 'green' : '#777', fontSize: 20}} 
                                                                />
                                                            </View>
                                                        </View>
                                                    </View>
                                                </View>
                                            </View>
                                        </Body>
                                    </CardItem>
                                </Card>
                            ))}
                        </>
                    )
                    :
                    (
                        <View>
                            <Text>THere was no article for {subject}</Text>
                        </View>
                    )
                }
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
    title: {
        fontSize: 20,
        fontWeight: 'bold',
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