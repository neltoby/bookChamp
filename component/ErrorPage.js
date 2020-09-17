import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default function ErrorPage() {
    return (
        <View style={style.container}>
            <Text style={style.errText}>
                Page could not be downloaded
            </Text>
        </View>
    )
}

const style = StyleSheet.create({
    container: {},
    errText: {},
})
