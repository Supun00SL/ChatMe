import { StyleSheet } from 'react-native';
import { colors } from '../../Util/colors';

export default StyleSheet.create({
    mainContainor: {
        flex: 1,
        backgroundColor: colors.background,
    },
    subContainor: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    logo: {
        width: 75,
        height: 75
    }
});