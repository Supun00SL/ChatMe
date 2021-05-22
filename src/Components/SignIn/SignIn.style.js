import { Dimensions, StyleSheet } from 'react-native';
import { colors } from '../../Util/colors';

export default StyleSheet.create({
    mainContainor: {
        flex: 1,
        backgroundColor: colors.background,
    },
    subContainor: {
        flex: 0.3,
        justifyContent: 'center',
        alignItems: 'center'
    },
    topContainor: {
        flex: 0.1,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 20
    },
    topSvgContainer: {
        flex: 0.2
    },
    imageContainer: {
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'center',
        width: "75%"
    },
    imageBackground: {
        flex: 1,
        width: undefined,
        height: undefined,
        resizeMode: 'contain'
    },
    signInText: {
        width: "100%",
        fontFamily: "OpenSans-Bold",
        fontSize: 25,
        color: 'white',
        position: 'absolute',
        zIndex: 1,
        left: Dimensions.get('screen').width / 1.4,
        top: 20
    },
    subText: {
        width: "100%",
        fontFamily: "OpenSans-Regular",
        fontSize: 15,
        color: 'white',
        position: 'absolute',
        zIndex: 1,
        left: Dimensions.get('screen').width / 2,
        top: 55
    },
    logo: {
        width: 60,
        height: 60,
        position:'absolute',
        bottom:50,
        left:20
    },
    InputText: {
        fontFamily: 'OpenSans-Bold',
        fontSize: 15
    },
    InputErrorText: {
        fontFamily: 'OpenSans-Bold',
        fontSize: 13,
        color: colors.danger
    },
    InputLabelText: {
        fontFamily: 'OpenSans-Bold',
        fontSize: 12,
        color: colors.primary,
        textAlign: 'center'
    },
    InputContainerStyle: {
        width: '80%',
        borderBottomWidth: 0,
    },
    SignInButtonStyle: {
        width: "75%",
        backgroundColor: colors.primary,
        padding: 10,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        flexDirection: 'row',
    },
    ForgetPasswordButtonStyle: {
        width: "75%",
        backgroundColor: colors.secondary,
        padding: 10,
        marginTop:10,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        flexDirection: 'row',
    },
    CreateNewAccountButtonStyle: {
        width: "75%",
        backgroundColor: colors.background,
        padding: 10,
        marginTop:10,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: colors.secondary,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        flexDirection: 'row',
        borderWidth:2,
        borderColor:colors.secondary
    },
    CreateNewAccountButtonText:{
        fontFamily: 'OpenSans-Bold',
        fontSize: 13,
        color: colors.secondary,
        width: '100%',
        textAlign: 'center'
    },
    SignInButtonText: {
        fontFamily: 'OpenSans-Bold',
        fontSize: 13,
        color: 'white',
        width: '100%',
        textAlign: 'center'
    },
    ForgetPasswordButtonText: {
        fontFamily: 'OpenSans-Bold',
        fontSize: 13,
        color: 'white',
        width: '100%',
        textAlign: 'center'
    },
    inputContainor: {
        flex: 0.2,
        marginTop: 20,
        alignItems:'center'
    }

});