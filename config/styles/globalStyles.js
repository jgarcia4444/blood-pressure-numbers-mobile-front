
import {Dimensions, Platform} from 'react-native';

const {height, width} = Dimensions.get('screen');

const platformShadow = Platform.OS === 'android' ?
{
    elevation: 3,
    shadowColor: '#000',
}
:
{
    shadowColor: '#000',
    shadowOffset: {
        height: 5,
        width: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 7,
}

export default {
    globalContainer: {
        paddingVertical: height * 0.02,
        paddingHorizontal: width * 0.02,
        width: width,
        height: height,
    },
    pageTitle: {
        fontSize: 40,
        color: '#fff',
        fontWeight: '900',
    },
    pageTitleContainer: {
        width: '100%',
        height: '15%',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        flexDirection: 'row',
    },
    platformShadow,
}