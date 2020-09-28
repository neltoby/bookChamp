import React from 'react'
import PropTypes from 'prop-types'
import {Image as CachedImage} from "react-native-expo-image-cache";
import { imageBase64 } from '../processes/db'

export default function Image(props) {
    const {uri, preview, style} = props
    // preview can be a local image or a data uri;
    return <CachedImage style={style} {...{preview, uri}} />
}

Image.defaultProps = {
    preview: { uri: imageBase64() }
}

Image.propTypes = {
    uri: PropTypes.string.isRequired,
    style: PropTypes.shape({
        height: PropTypes.number.isRequired,
        width: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]).isRequired,
        borderRadius: PropTypes.number,
        borderBottomLeftRadius: PropTypes.number,
        borderTopLeftRadius: PropTypes.number,
    })
}