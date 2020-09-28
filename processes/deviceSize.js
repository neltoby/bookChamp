import { Dimensions, useWindowDimensions } from 'react-native';

export const deviceWidth = Dimensions.get('window').width;
export const deviceHeight = Dimensions.get('window').height;

export default function deviceSize(props) {
    const dimensions = useWindowDimensions()
    const deviceWidth = dimensions.width
    const deviceHeight = dimensions.height
    return {deviceHeight, deviceWidth}
}