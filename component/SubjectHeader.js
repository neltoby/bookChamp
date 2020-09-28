import React, { memo, useState } from 'react'
import PropTypes from 'prop-types'
import { Text, StyleSheet, Platform, ActivityIndicator } from 'react-native'
import { Header, Left, Body, Item, Title, Input, Right, Button, Icon as NativeIcon } from 'native-base'

export default function SubjectHeader({navigation, subject}) {
    const [changeHeader, setChangeHeader] = useState(true)
    const [search, setSearch] = useState('')

    const searchHeader = () => {
        setChangeHeader(!changeHeader)
    }

    return (
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
    )
}

const style = StyleSheet.create({
    header: {
        marginTop: 20,
        backgroundColor: '#054078',
    },
})

SubjectHeader.propTypes = {
    navigation: PropTypes.object,
    subject: PropTypes.string
}

export const MemoizedSubjectHeader = memo(SubjectHeader)