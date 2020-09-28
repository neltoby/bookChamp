import React, { memo, useCallback } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Overlay from './Overlay'
import { Button as NButton } from 'native-base';
import deviceSize from '../processes/deviceSize'

export default function CNOverlay(props) {
    const { close, closeApp, cancel } = props
    const windowHeight = deviceSize().deviceHeight
    const deviceWidth = deviceSize().deviceWidth
    const localClose = useCallback(
        () => {
            closeApp()
        }, 
        [close]
    )

    const localCancel = useCallback(
        () => {
            cancel()
        },
        [close],
    )

    return (
        <Overlay
            isVisible={close}
            deviceWidth={deviceWidth}
            deviceHeight={windowHeight}
        >
            <View style={[style.containerOverlay, {width: '80%'}]}>
                <View style={style.header}>
                    <Text style={style.headerText}>
                        Exit?
                    </Text>
                </View>
                <View style={style.body}>
                    <Text style={style.bodyText}>
                        Are you sure you want 
                    </Text>
                    <Text style={style.bodyText}>
                        to exit this app?
                    </Text>
                </View>
                <View style={style.buttonOptions}>
                    <NButton style={style.buttons} small onPress={localClose}>
                        <Text style={style.buttonsText}>
                            Close app now?
                        </Text>
                    </NButton>
                    <NButton style={style.buttons} small onPress={localCancel}>
                        <Text style={style.buttonsText}>
                            Cancel
                        </Text>
                    </NButton>
                </View>
            </View>
        </Overlay>
    )
}

const style = StyleSheet.create({
    containerOverlay: {
        height: 200,
        backgroundColor: '#fff',
        alignSelf: 'center',
        paddingHorizontal: 20,
        borderRadius: 3
    },
    resend: {
        flex: 0.5
    },
    header: {
        flex: 0.3,
        justifyContent: 'flex-end'
    }, 
    headerText: {
        color: '#777',
        fontSize: 20
    },
    body: {
        flex: 0.4,
        paddingTop: 5,
        justifyContent:'flex-start',
    },
    bodyText: {
        fontSize: 17,
        color: '#777',
    },
    buttonOptions: {
        flex: 0.3,
        flexDirection: 'row',
        justifyContent:'space-between'
    }, 
    buttons: {
        backgroundColor: '#1258ba',
        paddingHorizontal: 10,
    }, 
    buttonsText: {
        color: '#fff'
    }
})

export const MemoCNOverlay = memo(CNOverlay)