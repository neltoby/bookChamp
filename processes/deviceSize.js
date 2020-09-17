import { Dimensions, useWindowDimensions } from 'react-native';
import ExtraDimensions from 'react-native-extra-dimensions-android';

export const deviceWidth = Dimensions.get('window').width;
export const deviceHeight = Dimensions.get('window').height;
// export const realDeviceHeight = ExtraDimensions.get('REAL_WINDOW_HEIGHT');
// export const realDeviceWidth = ExtraDimensions.get('REAL_WINDOW_WIDTH');

export default function deviceSize(props) {
    const dimensions = useWindowDimensions()
    const deviceWidth = dimensions.width
    const deviceHeight = dimensions.height
    return {deviceHeight, deviceWidth}
}