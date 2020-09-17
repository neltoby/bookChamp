import React, {useState} from 'react'
import { useFocusEffect } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient'
import { View, FlatList, StyleSheet, Text, useWindowDimensions } from 'react-native'
import {Button, Icon} from 'native-base'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'

const Basic = (props) => {
    const windowWidth = useWindowDimensions().width;
    const windowHeight = useWindowDimensions().height;
    const {dataContent, navigation} = props
    const [selected, setSelected] = useState(false)
    const [itemSelect, setItem] = useState({})
    useFocusEffect(
        React.useCallback(() => {               
          return () =>
            undoSelect()
        }, [])
    );
    const undoSelect = () => {
        setItem({})
        setSelected(false)
    }
    const makePayment = () => {
        navigation.navigate('TransSummary', {amt: itemSelect.amt, unit: itemSelect.unit})
    }
    const selectedItem = (item) => {
        setItem(item)
        setSelected(true)
    }
    const displayContent = ({item}) => {
        return(
            <Button 
            style={{...style.content, width: windowWidth - 100, backgroundColor: '#054078'}}
            onPress={() => selectedItem({amt: item.amt, unit: item.unit})}>
                    <Text style={style.butText}>{item.amt} - {item.unit}</Text>
            </Button>
        )
    }
    const _keyExtractor = (item, index) => `${index}${item.unit}`
    return(
        <>
            
            {selected ? 
                <View style={style.selectedContainer}>
                    <LinearGradient
                        colors={['transparent', '#e1efef']}
                        style={{...style.gradient, height: windowHeight,}}
                    />
                    <Text style={style.resTitle}>You selected</Text>
                    <Text style={style.margin}>
                        <Text style={style.unitDisplay}>Unit</Text> 
                        <Text>  - </Text>
                        <Text style={style.costDisplay}>{itemSelect.unit}</Text>
                    </Text>
                    <Text>
                        <Text style={style.unitDisplay}>Cost</Text> 
                        <Text>  - </Text>
                        <Text style={style.costDisplay}>{itemSelect.amt}</Text>
                    </Text>
                    <View style={style.viewbutton}>
                        <View style={{...style.viewBack}}>
                            <Button full onPress={undoSelect} style={{backgroundColor: '#054078'}}>
                                <Icon name='arrow-back' />
                                <Text style={style.mycolor}>Back</Text>
                            </Button>
                        </View>
                        <View style={{...style.viewBack}}>
                            <Button full onPress={makePayment} style={{backgroundColor: '#054078'}}>
                                <Text style={style.mycolor}>Make Payment</Text>
                            </Button>
                        </View>
                    </View>
                </View>
            :
                <View style={style.button}>
                    <LinearGradient
                        colors={['transparent', '#e1efef']}
                        style={{...style.gradient, height: windowHeight,}}
                    />
                    <FlatList
                        style={style.flatlist}
                        contentContainerStyle={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
                        data={dataContent}
                        renderItem={displayContent}
                        keyExtractor={_keyExtractor}
                    />
                </View>
            }
        </>
    )
}

const style = StyleSheet.create({
    gradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
    },
    flatlist: {
        width: '100%',
    },
    button: {
        flex: 1,
        backgroundColor: '#054078'
    },
    butText: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#fff',
    },
    content: {
        marginBottom: 20,
        alignItems: "center",
        justifyContent: 'center',
    },
    selectedContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#054078',
    },
    resTitle: {
        fontSize: 23,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 20,
    },
    unitDisplay: {
        fontWeight: '600',
        fontSize: 19,
        color: '#fff'
    },
    costDisplay: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#fff',
    }, 
    margin: {
        marginBottom: 15,
    },
    viewbutton: {
        flexDirection: 'row',
        marginTop: 25,
    },
    viewBack: {
        width: '50%',
        paddingHorizontal: 5,
    },
    mycolor: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 17,
    }
})

export default Basic