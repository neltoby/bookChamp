import React from 'react'
import {useWindowDimensions} from 'react-native'
import Modal from 'react-native-modal';

export default function Overlay(props) {
    const windowHeight = props.deviceHeight || useWindowDimensions().height;
    const deviceWidth = props.deviceWidth || useWindowDimensions().width;
    return (
        <Modal
            isVisible={props.isVisible}
            deviceWidth={deviceWidth}
            deviceHeight={windowHeight}
            style={{ alignItems: 'center', justifyContent: 'center' }}
        >
            {props.children}
        </Modal>
    )
}
