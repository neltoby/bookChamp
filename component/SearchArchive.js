import React, { useState } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, Platform, ActivityIndicator, StatusBar, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import { Container, Header, Item, Icon, Input, Button, } from 'native-base'
import {searchArchive, prevSearchDispatcher} from '../actions/learn'
import { useDispatch, useSelector } from 'react-redux'
import { FlatList } from 'react-native-gesture-handler';
import isJson from '../processes/isJson';

const SearchArchive = ({ navigation, route }) => {
    const {subject} = route.params
    const [search, setSearch] = useState('')
    const [typing, setTyping] = useState('none')
    const dispatch = useDispatch()
    const store = isJson(useSelector(state => state))
    const {searchRes, searchTextDisplay} = isJson(store.archive)
    console.log(searchTextDisplay, 'line 16')
    console.log(searchRes, 'line 17')
    useFocusEffect(
        React.useCallback(() => {
            StatusBar.setBarStyle('light-content');
            Platform.OS === 'android' && StatusBar.setBackgroundColor('#054078');           
            return () => {
                setTyping('none')
            }
        }, [subject])       
    )
    const callSearch = () => {
        dispatch(searchArchive(search))
        setSearch('')
        setTyping('search')
    }
    const prevSearch = (text) => {        
        if(text.trim().length){
            dispatch(prevSearchDispatcher(text))
            setTyping('typing')
        }else{
            setTyping('none')
        }       
    }
    const takeText = (text) => {
        setSearch(text)
        callSearch()
    }
    return(
        <Container>
            <Header transparent searchBar rounded>
                {Platform.OS == 'ios' ? 
                    <>
                        <Item>
                            <Icon name="ios-search" />
                            <Input 
                                placeholder="Search archive" 
                                value = {search}
                                onChangeText = {text => {setSearch(text)}}
                            />
                            <Icon name="close" />
                        </Item>
                        <Button transparent>
                            <Text>Cancel</Text>
                        </Button>
                    </>
                    : 
                    <>
                        <Item>
                            <Icon name="ios-search" />
                                <Input 
                                    placeholder={`Search ${subject} archive`}
                                    value = {search}
                                    onChangeText = {text => {setSearch(text); prevSearch(text)}}
                                />
                            {search.length ? <ActivityIndicator size="small" color="#0000ff" /> : <Text></Text>}
                            <Icon onPress={callSearch} name="arrow-forward"  />                      
                        </Item>
                    </>
                }
            </Header>
            <View>
                {typing == 'none' ? 
                    <View style={style.none}></View> 
                    : typing == 'typing' ?
                        <FlatList
                            data={searchTextDisplay}
                            renderItem={({item}) => <TouchableWithoutFeedback onPress={() => takeText(item)}><View style={style.seleted}><Text>{item}</Text></View></TouchableWithoutFeedback>}
                            keyExtractor={(item, index) => `${item}${index}`}
                        />
                    :
                        <FlatList
                            data={searchRes}
                            renderItem={({item}) => <View style={style.seleted}><Text>{item.item.text}</Text></View>}
                            keyExtractor={(item, index) => `${item.item.text}${index}`}
                        />
                }
            </View>
        </Container>
    )
}

const style = StyleSheet.create({
    none: {}
})

export default SearchArchive