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
    userAvatarTitle: {
        color: colors.primary,
        fontFamily: "OpenSans-Bold"
    },
    userCardTitle: {
        color: 'white',
        fontWeight: 'bold',
        marginBottom: 2
    },
    listItemHeaderText: {
        fontFamily: "OpenSans-Bold",
        fontSize: 15,
        color: 'white'
    },
    lingSubNameText: {
        fontFamily: "OpenSans-Regular",
        fontSize: 12,
        color: colors.goldenYellow
    },
    chatUserCard: {
        overflow: 'hidden',
        borderRadius: 15,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 5,
        marginBottom: 5
    }
});