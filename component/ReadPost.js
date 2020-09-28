import React, { useMemo, useEffect, useState } from 'react'
import { Badge } from 'react-native-elements'
import { View, Platform, StyleSheet, Text } from 'react-native'
import { Container, Header, Content, Left, Button, Body, Subtitle, Toast, Right, Icon as NativeIcon } from 'native-base'
import isJson from '../processes/isJson'
import deviceSize from '../processes/deviceSize'
import { useSelector, useDispatch } from 'react-redux'
import {onFailedLike, onFailedArchive, updateSeenArticle} from '../actions/learn'
import { likeFxn, unlikeFxn, archiveFxn, unarchiveFxn } from '../actions/request'
import Hyperlink from 'react-native-hyperlink';
import Image from './Image'
import CustomOverlay from './CustomOverlay'
import useCheckpoint from './useCheckpoint'
import { useFocusEffect } from '@react-navigation/native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'


const ReadPost = ({ navigation, route}) => {
    const {item, subject} = route.params
    const windowHeight = deviceSize().deviceHeight
    const dispatch = useDispatch()
    const [imageOverlay, setImageOverlay] = useState(false)
    const store = isJson(useSelector(state => state.learn))
    const preview = useMemo(() => { uri: store.preview }, [store.preview])
    // const item = isJson(store.displayItems).filter(element => {
    //     if(element.id == index) return element
    // })[0]
    const likes = async (id) => {
        if(!item.liked){
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
    const archive = (obj) => {
        if(!obj.item.archived) {
            const getResult = useCheckpoint(onFailureArchive, onSuccessArchive, obj)
            getResult()
        }
        // else{
        //     console.log('unarchive post ?')
        //     // const getResult = useCheckpoint(onFailureUnarchive, onSuccessUnarchive, obj)
        //     // getResult()
        // }
    }
    // when network is confirmed for a like request
    const onSuccessLike = (id) => {
        dispatch(likeFxn(id))
    }
    // when there is no network for a like request
    const onFailureLike = (id) => {
        dispatch(onFailedLike({id,state: 1}))
    }
    // when network is confirmed for an unlike request
    const onSuccessUnlike = (id) => {
        dispatch(unlikeFxn(id))
    }
    // when there is no network for an unlike request
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
    // when network is confirmed for an unarchive request
    const onSuccessUnarchive = (obj) => {
        dispatch(unarchiveFxn(obj))
    }
    // when there is no network for an unarchive request
    const onFailureUnarchive = (obj) => {
        dispatch(onFailedArchive({...obj,state: 0}))
    }

    const displayImage = () => {
        setImageOverlay(!imageOverlay)
    }
    useFocusEffect(
        React.useCallback(() => {
            if(!item.read){
                dispatch(updateSeenArticle(item.id))
            }
            
        }, [item.id])
    )

    return(
        <>
        <Container style={{backgroundColor: "#fff"}}>
            <Header style={style.header}>
                <Left>
                    <Button transparent onPress={() => navigation.navigate('Subject')}>
                        <NativeIcon  name={Platform.OS == 'ios' ? 'chevron-back-outline' : 'arrow-back'} />
                    </Button>
                </Left>
                <Body>
                    <Subtitle>
                        {item.title}
                    </Subtitle>
                </Body>
                <Right>
                    <Button transparent >
                        <NativeIcon type='FontAwesome5' name='ellipsis-v' style={{fontSize: 18, color: '#fff'}} />
                    </Button>
                </Right>
            </Header>
            <Content>
                <TouchableWithoutFeedback onPress={displayImage} style={style.imgView}>
                    <Image {...{preview, uri:item.image_url}} style={style.img} />
                </TouchableWithoutFeedback>
                <View style={style.titleContainer}>
                    <Text style={style.title}>
                        {item.title}
                    </Text>
                </View>
                <Hyperlink
                    linkDefault={ true }
                    
                    linkStyle={ { color: '#2980b9' } }
                >
                    <View style={style.textView}>        
                        <Text>{item.body}</Text>               
                    </View>
                </Hyperlink>
                <View style={style.actions}>
                    <View style={style.action}>
                        <NativeIcon 
                            type={item.liked ? 'Ionicons' : 'FontAwesome5'} 
                            onPress={() => likes(item.id)} 
                            name='heart' 
                            style={{color: item.liked ? 'red' : '#777', fontSize: 28}} />
                            <Badge 
                                badgeStyle={{ width: 25, height: 25, borderRadius: 25/2, backgroundColor: 'transparent' }}
                                value={<Text style={style.badgeText}>{item.likes}</Text>}
                                containerStyle={{ position: 'absolute', top: -4, right: 20 }}
                            />
                    </View>
                    <View style={style.action}>
                        <NativeIcon 
                            type={item.read ? 'Ionicons' : 'FontAwesome5'} 
                            name='eye' 
                            style={{color: '#777', fontSize: 28}} />
                    </View>
                    <View style={style.action}>
                        <NativeIcon 
                            onPress={() => {archive({item}); Toast.show({ text: `Saved to your ${subject} archive`, buttonText: 'CLOSE', style: {backgroundColor: 'green'} })}}
                            type='Ionicons'
                            name='md-archive'
                            style={{color: item.archived ? 'green' : '#777', fontSize: 28}} 
                        />
                    </View>
                </View>
                <View style={style.wordsContainer}>
                    <View style={style.newWordsContainer}>
                        {
                            (item.new_word_1 !== '' && item.new_word_1 !== null) || (item.new_word_2 !== '' && item.new_word_2 !== null) || (item.new_word_3 !== '' && item.new_word_3 !== null) ?
                            <View style={style.newWordTitle}>
                                <Text style={style.newTitle}> {item.new_word_2 !== '' || item.new_word_3 !== '' ? 'Meaning of these words' : 'Meaning of this word'} </Text>
                            </View> 
                            : null
                        }
                        {item.new_word_1 !== '' && item.new_word_1 !== null ? 
                            <View style={style.newWordContent}>
                                <Text style={style.newWord}>
                                    <Text style={style.heading}>
                                        {item.new_word_1.split(':')[0]} :
                                    </Text>
                                    <Text style={style.explain}>
                                        {item.new_word_1.split(':')[1]}
                                    </Text>
                                </Text>
                            </View>
                        : null}
                        {item.new_word_2 !== '' && item.new_word_2 !== null ? 
                            <View style={style.newWordContent}>
                                <Text style={style.newWord}>
                                    <Text style={style.heading}>
                                        {item.new_word_2.split(':')[0]} :
                                    </Text>
                                    <Text style={style.explain}>
                                        {item.new_word_2.split(':')[1]}
                                    </Text>
                                </Text>
                            </View>
                        : null}
                        {item.new_word_3 !== '' && item.new_word_3 !== null ? 
                            <View style={style.newWordContent}>
                                <Text style={style.newWord}>
                                    <Text style={style.heading}>
                                        {item.new_word_3.split(':')[0]} :
                                    </Text>
                                    <Text style={style.explain}>
                                        {item.new_word_3.split(':')[1]}
                                    </Text>
                                </Text>
                            </View>
                        : null}
                    </View>
                    <View style={style.newWordsContainer}>
                        {
                            (item.idioms_1 !== '' && item.idioms_1 !== null) || (item.idioms_2 !== '' && item.idioms_2 !== null) || (item.idioms_3 !== '' && item.idioms_3 !== null) ?
                            <View style={style.newWordTitle}>
                                <Text style={style.newTitle}> {(item.idioms_2 !== '' && item.idioms_2 !== null) || (item.idioms_3 !== '' && item.idioms_3 !== null) ? 'Idioms meaning ' : 'Idiom meaning'} </Text>
                            </View> 
                            : null
                        }
                        {item.idioms_1 !== '' && item.idioms_1 !== null ? 
                            <View style={style.newWordContent}>
                                <Text style={style.newWord}>
                                    <Text style={style.heading}>
                                        {item.idioms_1.split(':')[0]} :
                                    </Text>
                                    <Text style={style.explain}>
                                        {item.idioms_1.split(':')[1]}
                                    </Text>
                                </Text>
                            </View>
                        : null}
                        {item.idioms_2 !== '' && item.idioms_2 !== null ? 
                            <View style={style.newWordContent}>
                                <Text style={style.newWord}>
                                    <Text style={style.heading}>
                                        {item.idioms_2.split(':')[0]} :
                                    </Text>
                                    <Text style={style.explain}>
                                        {item.idioms_2.split(':')[1]}
                                    </Text>
                                </Text>
                            </View>
                        : null}
                        {item.idioms_3 !== '' && item.idioms_3 !== null ? 
                            <View style={style.newWordContent}>
                                <Text style={style.newWord}>
                                <Text style={style.heading}>
                                        {item.idioms_3.split(':')[0]} :
                                    </Text>
                                    <Text style={style.explain}>
                                        {item.idioms_3.split(':')[1]}
                                    </Text>
                                </Text>
                            </View>
                        : null}
                    </View>

                </View>
            </Content>
        </Container>
        {imageOverlay ? 
            (
                <CustomOverlay
                    isVisible={imageOverlay}
                    backgroundColor = 'rgba(0,0,0,1)'
                    animation='slide'
                >
                    <View style={{...style.imageContainer, height: windowHeight}}>
                        <View style={style.cover}>
                        <NativeIcon 
                            type='FontAwesome'
                            onPress={displayImage} 
                            name='times' 
                            style={{color: '#ddd', fontSize: 28, position: 'absolute', right: 20, top: 50}} />
                        </View>
                            <View style={style.imageWrapper}>
                                <Image {...{preview, uri:item.image_url}} style={style.bigimg} />
                            </View>
                        <View style={style.cover} />
                    </View>
                </CustomOverlay>
            ) :
            null
        }
        </>
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
        paddingHorizontal: 15,
        paddingTop: 5,
        paddingBottom: 15,
    },
    actions: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 20,
    },
    action: {
        flex: 0.33,
        alignItems: 'center',
    },
    heading: {
        fontWeight: 'bold',
        color: '#054078'
    },
    wordsContainer: {
        padding: 10,
    },
    newWordsContainer: {
        marginBottom: 20
    }, 
    newWordTitle: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 5,
    },
    newTitle: {
        fontWeight: 'bold',
        fontSize: 17,
        color: '#444'
    },
    newWordContent: {
        marginBottom: 10,
    }, 
    badgeText: {
        color: '#fff',
        fontSize: 15,
        fontWeight: 'bold'
    },
    titleContainer: {
        paddingHorizontal: 20,
        alignItems: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#054078',
    }, 
    imageContainer: {
        height: '100%',
        // flex: 1
    },
    imageWrapper: {
        flex: 0.6
    }, 
    cover: {
        flex: 0.2
    }, 
    bigimg: {
        width: '100%',
        height: '100%',
    }
})

export default ReadPost