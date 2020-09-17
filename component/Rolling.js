import React from 'react'
import { View, Text} from 'react-native'
import { Spinner } from 'native-base'
import deviceSize from '../processes/deviceSize'

export default function Rolling(props) {
    const deviceWidth = deviceSize().deviceWidth
    return (
        <View style={{ backgroundColor: '#fff',padding: 20, justifyContent: 'center', alignItems: 'center', width: deviceWidth/2 }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#054078' }}>{props.text}</Text>
            <Spinner color='#054078' />
        </View>
    )
}
