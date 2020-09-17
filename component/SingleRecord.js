import React from 'react'
import PropTypes from 'prop-types'
import { View, Text, StyleSheet, } from 'react-native'
import { Avatar } from 'react-native-elements';

export default function SingleRecord(props) {
    const { name, value } = props.info

    return (
        <View style={style.updateOptions}>
            <View>
                <Avatar
                    rounded
                    icon={{ name, type: props.info.type || props.type }}
                    size="small"
                />
            </View>
            <View style={style.count}>
                <Text style={{...style.info,color: '#A8FF33'}}>{value}</Text>
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    updateOptions: {
        width: '10%'
    }, 
    count: {
        alignItems: 'center',
    },
    info: {
        fontWeight: 'bold',
    },
})

SingleRecord.defaultProps = {
    type: 'font-awesome'
}

SingleRecord.propTypes = {
    info: PropTypes.shape({
        name: PropTypes.string.isRequired,
        value: PropTypes.number.isRequired,
        type: PropTypes.string
    })
    
}