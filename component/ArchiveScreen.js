import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { useFocusEffect } from '@react-navigation/native';
import {Container, Header, Content, Left, Body, Right, Button, Title, Icon as NativeIcon} from 'native-base'
import { StyleSheet, View, Text, StatusBar, Platform, TouchableWithoutFeedback, useWindowDimensions } from 'react-native'
import { FlatList } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import isJson from '../processes/isJson';

const ArchiveScreen = ({ navigation }) => {
    const windowHeight = useWindowDimensions().height;
    const store = isJson(useSelector(state => state.archive))
    useFocusEffect(
        React.useCallback(() => {
            StatusBar.setBarStyle('light-content');
            Platform.OS === 'android' && StatusBar.setBackgroundColor('#054078');
            return () => {
            }
        }, [])       
    )
    const goto = (loc) => {
        navigation.navigate('ViewArchive', {subject: loc})
    }
    const renderView = ({item}) => {
        return (
            <TouchableWithoutFeedback onPress={() => goto(item.text)}>
                <View style={{...style.cover, backgroundColor: item.col, borderColor: item.col}}>
                    <View style={style.item}>
                        <Text style={{...style.text, color: '#fff' }}>{item.text}</Text>
                    </View>
                    <View style={style.num}>
                        <Text style={style.numText}>{item.num}</Text>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        )
    }
    const _keyExtractor = (item, index) => `${item.text}${index}`
    return(
        <View style={{backgroundColor: "#054078", flex: 1,}}>
            <LinearGradient
                colors={['transparent', '#e1efef']}
                style={{...style.gradient, height: windowHeight,}}
            />
            <Header transparent style={style.header}>          
                <Left>
                    <Button transparent onPress={() => navigation.goBack()}>
                        <NativeIcon  name={Platform.OS == 'ios' ? 'chevron-back-outline' : 'arrow-back'} />
                    </Button>
                </Left>
                <Body>
                    <Title>
                        My Archive
                    </Title>
                </Body>
                <Right>
                <NativeIcon type= 'Ionicons' name= 'md-archive' style={{color: '#fff', fontSize: 24}} />
                </Right>
            </Header>
            <View style={style.content}>
                <FlatList 
                    style={style.flatList}
                    contentContainerStyle = {{flex: 1, justifyContent:'center', alignItems: 'center'}}
                    data={store.category}
                    renderItem={renderView}
                    keyExtractor={_keyExtractor}
                />
            </View>
        </View>
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
        backgroundColor: 'transparent',
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    cover: {
        width: '90%', 
        flexDirection: 'row',
        marginBottom: 15,
        borderWidth: 2,
        borderColor: '#054078',
        alignSelf: 'center',
        paddingVertical: 7,
        borderRadius: 50,
    },
    flatList: {        
        marginTop: 20,
        width: '100%',
    },
    item: {
        width: '85%',
        paddingLeft: 15,
    },
    num: {
        width: '15%',
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    text: {
        fontSize: 19,
        fontWeight: 'bold',
    },
    numText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
})

export default ArchiveScreen