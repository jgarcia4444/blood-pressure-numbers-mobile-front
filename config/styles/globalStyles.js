
import {Dimensions} from 'react-native';

const {height, width} = Dimensions.get('screen');

export default {
    globalContainer: {
        paddingVertical: height * 0.02,
        paddingHorizontal: width * 0.02,
        width: width,
        height: height,
    },
    pageTitle: {
        fontSize: 36,
        fontColor: '#fff',
        fontWeight: '400',
        
    },
    pageTitleContainer: {
        width: '100%',
        height: '15%',
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
    },
}