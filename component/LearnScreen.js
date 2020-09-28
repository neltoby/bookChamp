import React, { useEffect } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { useFocusEffect } from '@react-navigation/native';
import deviceSize from '../processes/deviceSize'
import {db} from '../processes/db'
import { Container, Header, Content, Footer, Left, Body, Title, Subtitle, Right, Button, Icon as NativeIcon } from 'native-base'
import { View, FlatList, Text, StyleSheet, StatusBar, useWindowDimensions, TouchableHighlight } from 'react-native'
import { useDispatch } from 'react-redux';
import { getArticles } from '../actions/request'
import useCheckpoint from './useCheckpoint'
import { loadingArticle, articleErrRem, setArticle, loadingArticleStop } from '../actions/learn'

// const windowHeight = deviceSize().deviceHeight

const subject = [
    {text:'Finance', col: '#e85f29'}, 
    {text: 'Science and Technology', col: '#00e600'}, 
    {text: 'Politics', col: 'orange'}, 
    {text: 'Sport', col: '#ff1a66'}, 
    {text: 'Entertainment', col: '#9999ff'}, 
    {text: 'Social', col: '#e6e600'}, 
    {text: 'History', col: '#033268'}, 
    {text: 'Lifestyle', col: 'green'}, 
    {text: 'Geography', col: '#e85f29'}
]

const LearnScreen = ({ navigation }) => {
    const windowHeight = deviceSize().deviceHeight
    const dispatch = useDispatch()
    useFocusEffect(
        React.useCallback(() => {
            StatusBar.setBarStyle('light-content');
            Platform.OS === 'android' && StatusBar.setBackgroundColor('#054078');
            return () => {
            }
        }, [])       
    )
    const onSuccess = (subject) => {
        console.log('onsuccess was called')
        // get the articles for the selected subject
        dispatch(getArticles(subject))
    }

    const onFailure = async (payload) => {
        const sql = `SELECT * FROM articles WHERE category = ? `
        await db.transaction(tx => {
            tx.executeSql(sql, [payload], (txObj, {rows: { length, _array}}) => {
                if(length > 0){
                    let newArr = [..._array]
                    newArr.forEach(arr => {
                        arr.read = arr.read === 1 ? true : false
                        arr.archived = arr.archived === 1 ? true : false
                        arr.liked = arr.liked === 1 ? true : false
                    })
                    dispatch(loadingArticleStop())
                    dispatch(setArticle(newArr)) 
                }else{
                    dispatch(loadingArticleStop())
                    dispatch(setArticle([])) 
                }
            }, (txObj, err) => {
                console.log(err)
            })
        }, (err) => {
            console.log(err)
        }, () => console.log('completed transactions'))
    }

    const selectSubject = async (subject) => {
        const getResult = useCheckpoint(onFailure, onSuccess, subject)
        // unset/remove the error display page
        await dispatch(articleErrRem())

        // set the activityindicator rolling
        await dispatch(loadingArticle())       
        
        // set article array to empty
        await dispatch(setArticle([]))

        await getResult()

        // navigate to the selected page
        navigation.navigate('Subject', {subject: subject})
    }

    useEffect(() => {
        const sql = 'CREATE TABLE IF NOT EXISTS articles (aid INTEGER PRIMARY KEY AUTOINCREMENT, id INT UNIQUE, title TEXT, body TEXT, category TEXT, image_url TEXT, likes INT, idioms_1 TEXT, idioms_2 TEXT, idioms_3 TEXT, new_word_1 TEXT, new_word_2 TEXT, new_word_3 TEXT, read INT, archived INT, liked INT)'
        const sqli = 'CREATE TABLE IF NOT EXISTS unsent (uid INTEGER PRIMARY KEY AUTOINCREMENT, id INT UNIQUE, title TEXT)'
        const sqlii = 'CREATE TABLE IF NOT EXISTS archive (aid INTEGER PRIMARY KEY AUTOINCREMENT, id INT UNIQUE, category TEXT)'
        const sqliii = 'CREATE TABLE IF NOT EXISTS archiveunsent (aid INTEGER PRIMARY KEY AUTOINCREMENT, id INT UNIQUE, title TEXT)'
        db.transaction(tx => {
            tx.executeSql(sql, null,
            (txObj, { insertId, rowsAffected }) => {
                txObj.executeSql(sqli, null, (txO, { rows }) => {
                    console.log('table unsent created successfully')
                    txO.executeSql(sqlii, null, (txOb, {rows}) => {
                        console.log('archive table created')
                        txOb.executeSql(sqliii, null, (txObI, {row}) => {
                            console.log('created archive unsent')
                        }, err => console.log(err, 'archiveunsent cud not be created'))
                    }, err => console.log(err, 'table archive creation failed'))
                }, (err) => console.log(err, 'cud not drop table'))
            }, (err) => console.log(err, ' table creation failed '))
        }, (err) => console.log(err, 'from learnscreen'),
        () => console.log('table articles created'))
        return () => {}
    }, [])

    const _keyExtractor = (item, index) => `${item.text}${index}`

    return(
        <Container style={{backgroundColor: "#054078"}}>
            <LinearGradient
                colors={['transparent', '#e1efef']}
                style={{...style.gradient, height: windowHeight,}}
            />
            <Header transparent>
                <Left>
                    <Button transparent onPress={() => navigation.goBack()}>
                        <NativeIcon name='arrow-back' />
                    </Button>
                </Left>
                <Body>
                    <Title>
                        Juicy Content 
                    </Title>
                    <Subtitle>Everyday</Subtitle>
                </Body>
                <Right />
            </Header>

                <View style={style.container}>
                    <FlatList 
                        style={style.flatList}
                        // contentContainerStyle={{alignItems: 'center'}}
                        data={subject} 
                        keyExtractor={_keyExtractor}
                        renderItem = {({item}) => 
                            <TouchableHighlight  style={{...style.subject, borderColor: item.col, backgroundColor: item.col}} onPress={() => selectSubject(item.text)}>
                                <View>
                                    <Text style={style.subText}>{item.text}</Text>
                                </View>
                            </TouchableHighlight>
                        } 
                    />
                    
                </View>

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
    container: {
        flex: 1,
        marginTop: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    flatList: {
        width: '90%',
        marginTop: 15,
        paddingTop: 15,
    },
    subject: {
        width: '90%',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 3,
        alignSelf: 'center',
        marginBottom: 25,
        borderRadius: 50,
    },
    subText: {
        color: '#fff',
        fontSize: 18,
    },
})

export default LearnScreen