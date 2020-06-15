import React from 'react'
import { useFocusEffect } from '@react-navigation/native';
import { useActionSheet } from '@expo/react-native-action-sheet'
import {Header, Left, Button, Icon as NativeIcon, Body, Title, Right, Card, CardItem} from 'native-base'
import { View, Text, StyleSheet, FlatList, StatusBar, Platform, Image } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import isJson from '../processes/isJson'
import {unarchive} from '../actions/learn'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const ViewArchive = ({ navigation , route}) => {
    const {subject} = route.params
    const { showActionSheetWithOptions } = useActionSheet();
    const dispatch = useDispatch()
    const store = isJson(useSelector(state => state.archive))
    let archived = isJson(store.archive).filter((element) => {
        if(element.subject === subject) return element
    })
    useFocusEffect(
        React.useCallback(() => {
            StatusBar.setBarStyle('light-content');
            Platform.OS === 'android' && StatusBar.setBackgroundColor('#054078');           
            return () => {
                archived = []
            }
        }, [subject])       
    )
    const options = [
        'Cancel', 
        'Apple', 
        <Text style={{color: 'yellow'}}>Banana</Text>,
        'Watermelon', 
        <Text style={{color: 'red'}}>Durian</Text>
    ]
    const showActionSheet = (id) => {
        const options = ['Yes', 'No'];
        // const destructiveButtonIndex = 3;
        const cancelButtonIndex = 1;
        const title = 'Unarchive?'
        const message = 'You are about to unarchive a post, are you sure you want to do this?'
        showActionSheetWithOptions(
            {
              options,
              cancelButtonIndex,
              title,
              message,
            },
            buttonIndex => {
                if(buttonIndex == 0){
                    dispatch(unarchive(id))
                }
            },
          );
    }
    const _keyExtractor = (item, index) => `item${index}`
    const renderView = ({item}) => {
        return(
            <Card style={style.content}>
                <CardItem>
                    <View style={style.itemContainer}>
                        <TouchableWithoutFeedback style={style.imgView} onPress={() => navigation.navigate('ReadPost', {subject: subject, index: item.item.id})}>
                            <View>
                                <Image source={item.item.img} style={style.img} />                       
                            </View>
                        </TouchableWithoutFeedback>
                        <View style={style.textView}>
                            <Text onPress={() => navigation.navigate('ReadPost', {subject: subject, index: item.item.id})} numberOfLines={6} style={style.title}>{item.item.text}</Text>
                        </View>
                        <View style={style.deleteView}>
                            <NativeIcon onPress={() => showActionSheet(item.item.id)} name='ios-trash' />
                        </View>
                    </View>
                </CardItem>
            </Card>
        )
    }
    return(
        <>
        <Header style={style.header}>
            <Left>
                <Button transparent onPress={() => navigation.navigate('Archive')}>
                    <NativeIcon  name={Platform.OS == 'ios' ? 'chevron-back-outline' : 'arrow-back'} />
                </Button>               
            </Left>
            <Body>
                <Title>
                    {subject}
                </Title>
            </Body>
            <Right>
                <NativeIcon onPress={() => navigation.navigate('SearchArchive', {subject: subject})} type= 'Ionicons' name= 'md-search' style={{color: '#fff', fontSize: 24}} />
            </Right>
        </Header>
        <View style={style.content}>
            {archived.length ? 
                <FlatList 
                    style={style.flat}
                    data={archived} 
                    renderItem={renderView}
                    keyExtractor={_keyExtractor}
                />
                : 
                <View style={style.noArchive}>
                    <Text style={style.noArchiveText}>Your {subject} archive is empty</Text>
                </View>
            }
            
        </View>
        </>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: '#fff', 
        justifyContent: 'center',
        alignItems: 'center',
    },
    gradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
    },
    header: {
        marginTop: 20,
        backgroundColor: '#054078',
    },
    noArchive: {
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemContainer: {
        flexDirection: 'row',
    },
    imgView: {
        width: '37%',
    },
    textView: {
        width: '55%',
        paddingHorizontal: 15,
    },
    deleteView: {
        paddingLeft: 12,
        flexDirection: 'row',
        width: '8%',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    img: {
        borderBottomLeftRadius: 10,
        borderTopLeftRadius: 10,
        width: '100%',
        height: 120,
    },
})

export default ViewArchive