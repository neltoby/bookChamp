import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import {
    DrawerContentScrollView, DrawerItem,
  } from '@react-navigation/drawer';
// import { SafeAreaView } from 'react-native-safe-area-context';
import { Icon, Badge } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import {deleteKey} from '../processes/keyStore'
import {notLogin} from '../actions/login'
import {loginValue} from '../processes/lock'
import { SafeAreaView, View, Text, Image, StyleSheet,  } from 'react-native'
import { useDispatch } from 'react-redux';

const CustomSideBar = (props) => {
    const {navigation} = props
    const dispatch = useDispatch()
    const setLogout = async () => {
        await deleteKey(loginValue)
        dispatch(notLogin())
        navigation.navigate('Login')
    }
    
    let firstData = [
        {
            text: 'Quiz', 
            icon: <Icon type='material-community' name='gamepad-variant' size={24} color='#3480eb'/>,
            onPress: () => navigation.navigate('Quiz'),
        },
        {
            text: 'Ranking', 
            icon: <Icon type='material-community' name='star' size={24} color='#3480eb'/>,
            onPress: () => navigation.navigate('Ranking'),
        },
        {
            text: 'Learn', 
            icon: <Icon type='font-awesome' name='book' size={24} color='#3480eb'/>,
            onPress: () => navigation.navigate('Learn'),
        },
        {
            text: 'Subcribe', 
            icon: <Icon type='material-community' name='account-check' size={24} color='#3480eb'/>,
            onPress: () => navigation.navigate('Subscribe'),
        },
        {
            text: 'Archive', 
            icon: <Icon type='material-community' name='archive' size={24} color='#3480eb'/>,
            onPress: () => navigation.navigate('Archive'),
        },
    ]
    let lastData = [
        {
            text: 'Settings', 
            icon: <Icon type='material-community' name='cogs' size={24} color='#3480eb'/>,
            onPress: () => navigation.navigate('Setting'),
        },
        {
            text: 'Notification', 
            icon: <Icon type='material-community' name='bell' size={24} color='#3480eb'/>,
            onPress: () => navigation.navigate('Notifications'),
        },
        {
            text: 'FAQ(s)', 
            icon: <Icon type='material-community' name='help-circle' size={24} color='#3480eb'/>,
            onPress: () => navigation.navigate('Faq'),
        },
        {
            text: 'Logout', 
            icon: <Icon type='material-community' name='logout' size={24} color='#3480eb'/>,
            onPress: () => setLogout(true),
        },

    ] 
    return (
        <DrawerContentScrollView>
            <SafeAreaView style={style.container}>
                <View style={style.imgContainer}>
                <LinearGradient
                    colors={['transparent', '#e1efef']}
                    style={{...style.gradient, height: 150,}}
                />
                    <View style={style.imgView}>
                        <Image source={require('../img/user.jpg')} style={style.img} />
                    </View>
                    <View style={style.detailView}>
                        <Text style={style.name}>John Doew</Text>
                        <View style={style.bond}>
                            <Icon 
                            type='font-awesome' 
                            name='circle' 
                            color='#FFA500'
                            size={16} />
                            <Text style={{...style.mode, fontSize: 18}}> starter</Text>
                        </View>
                        <Text style={{...style.mode, paddingLeft: 10}}>1M units</Text>
                    </View>
                </View>
                {firstData.map((data, i) => {
                    return(
                        <DrawerItem 
                        label={data.text}
                        icon={() => data.icon}
                        onPress={data.onPress}
                        key={`${data}${i}`}
                        />
                    )
                })}
                <View style={style.divider}/>
                {lastData.map((data, i) => {
                    return(
                        <DrawerItem 
                        label={data.text}
                        icon={() => data.icon}
                        onPress={data.onPress}
                        key={`${data}${i}`}
                        />
                    )
                })}
            </SafeAreaView>
        </DrawerContentScrollView>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1
    },
    imgContainer: {
        height: 150,
        backgroundColor: '#054078',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    gradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
    },
    imgView: {
        width: '50%',
        flex: 1,
        flexDirection: 'column',   
        justifyContent: 'center',
        alignItems: 'flex-end',    
    },
    img: {
        width: 120,
        height: 120,
        borderRadius: 60,
    },
    name: {
        color: '#fff',
        fontSize: 20,
        fontWeight: '700',
    },
    mode: {
        color: '#fff',
    },
    bond: {
        paddingVertical: 7,
        paddingHorizontal: 5,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    detailView: {
        width: '50%',
        paddingLeft: 10,
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    divider: {
        width: '90%',
        borderWidth: 1,
        borderColor: '#3480eb',
        marginVertical: 10,
        alignSelf: 'center',

    }

})

export default CustomSideBar 