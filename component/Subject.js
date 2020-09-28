import React, { useEffect, lazy, Suspense, useMemo } from 'react'
import FocusAwareStatusBar from './FocusAwareStatusBar'
import { Container, Content,Toast, Card, CardItem, Body, Icon as NativeIcon } from 'native-base'
import { View, Text, StyleSheet, Image as RNImage, BackHandler } from 'react-native'
import {lionel} from '../processes/image'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import isJson from '../processes/isJson'; 
import deviceSize from '../processes/deviceSize'
import Rolling from './Rolling'
import { MemoizedSubjectHeader } from './SubjectHeader'
import Image from './Image'
import {onFailedLike, loadingArticleStop, onFailedArchive} from '../actions/learn'
import { likeFxn, unlikeFxn, archiveFxn } from '../actions/request'
import useCheckpoint from './useCheckpoint'
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
    const preview = useMemo(() => { uri: store.preview }, [store.preview])
    const disItems = isJson(store.displayItems)
    const takeTo = ({item}) => {
        navigation.navigate('ReadPost', {subject: subject, item})
    }
    const likes = async (id, liked) => {
        if(!liked){
            const getResult = useCheckpoint(onFailureLike, onSuccessLike, id)
            getResult().then(res => {
                Toast.show(
                    { 
                        text: 'You liked post', 
                        buttonText: 'CLOSE', 
                        type: 'success',
                        textStyle: { fontSize: 14 },
                        style: {marginHorizontal: 50, borderRadius: 20, marginBottom: 20 }
                    }
                )
            })
            
        }else{
            const getResult = useCheckpoint(onFailureUnlike, onSuccessUnlike, id)
            await getResult()
        } 
    }
    const updateSearch = (search) => {
        setSearch(search)
        if(search){
            setLoading(true)
        }
    }
    const archive = (obj) => {
        if(!obj.item.archived) {
            const getResult = useCheckpoint(onFailureArchive, onSuccessArchive, obj)
            getResult()
        }
    }
    const onSuccessLike = (id) => {
        dispatch(likeFxn(id))
    }
    const onFailureLike = (id) => {
        dispatch(onFailedLike({id,state: 1}))
    }
    const onSuccessUnlike = (id) => {
        dispatch(unlikeFxn(id))
    }
    const onFailureUnlike = (id) => {
        dispatch(onFailedLike({id,state: 0}))
    }

    // when network is confirmed for an archive request
    const onSuccessArchive = (obj) => {
        dispatch(archiveFxn(obj))
    }
    // when there is no network for a archive request
    const onFailureArchive = (obj) => {
        dispatch(onFailedArchive({...obj,state: 1}))
    }
    const searchContent = () => {} 

    useEffect(() => {
        const backAction = () => {
            if(store.loading_article){
                dispatch(loadingArticleStop())
                return true
            }else{
                return false
            }
        }

        BackHandler.addEventListener('hardwareBackPress', backAction)
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', backAction)
        }
    }, [])

    return(
        <Container style={{backgroundColor: "#fff"}}>
            <FocusAwareStatusBar barStyle='light-content' backgroundColor='#054078' />
            <MemoizedSubjectHeader navigation={navigation} subject={subject} />
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
                                <RNImage source={lionel()} style={style.lionel} />
                            </View>
                            {disItems.map((item, i) => {
                                let uri = item.image_url           
                            return (
                                <Card style={style.content} key={item.id}>
                                    <CardItem>
                                        <Body>
                                            <View style={style.titleContainer}>
                                                <Text numberOfLines={1} style={style.title}>
                                                    {item.title}
                                                </Text> 
                                            </View>
                                            <View style={style.imgContainer}>
                                                {item.image !== null ? (
                                                <View style={style.viewImg}> 
                                                    <TouchableWithoutFeedback onPress={() => takeTo({item})}>
                                                        <Image style={style.league} {...{preview, uri}} />
                                                    </TouchableWithoutFeedback>
                                                </View>
                                                ) : null}
                                                <View style={{...style.imgText, width: item.image !== null ? '60%': '100%'}}>
                                                    <TouchableWithoutFeedback onPress={() => takeTo({item})}>
                                                        <Text numberOfLines={6}>
                                                            {item.body}
                                                        </Text>                        
                                                    </TouchableWithoutFeedback>
                                                    <View style={item.image_url !== null ? style.action : {...style.action, flexDirection: 'row-reverse'}}>
                                                        <View style={{width: item.image_url !== null ? '100%' : '60%', flexDirection: 'row'}}>
                                                            <View style={style.actions}>
                                                                <NativeIcon type={item.liked ? 'Ionicons' : 'FontAwesome5'} onPress={() => likes(item.id, item.liked)} name='heart' style={{color: item.liked ? 'red' : '#777', fontSize: 25}} />
                                                            </View>
                                                            <View style={style.actions}>
                                                                <NativeIcon type={item.read ? 'Ionicons' : 'FontAwesome5'} name='eye' style={{color: '#777', fontSize: 25}} />
                                                            </View>
                                                            <View style={style.actions}>
                                                                <NativeIcon 
                                                                    onPress={() => {archive({item}); Toast.show({ text: `Saved to your ${subject} archive`, buttonText: 'CLOSE', style: {backgroundColor: 'green'} })}} 
                                                                    type= 'Ionicons' 
                                                                    name= 'md-archive' 
                                                                    style={{color: item.archived ? 'green' : '#777', fontSize: 25}} 
                                                                />
                                                            </View>
                                                        </View>
                                                    </View>
                                                </View>
                                            </View>
                                        </Body>
                                    </CardItem>
                                </Card>
                            )})}
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
    titleContainer: {
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    title: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#054078',
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