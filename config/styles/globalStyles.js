
import {Dimensions} from 'react-native';

const {height, width} = Dimensions.get('screen');

export default {
    globalContainer: {
        paddingVertical: height * 0.02,
        paddingHorizontal: width * 0.02,
        width: width,
        height: height,
    }
}