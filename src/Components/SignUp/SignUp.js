/**
 * @author Supun Madushanka
 * This is the Splash Component
 */

import React from 'react';
import { Image, SafeAreaView, StatusBar, Text, View, TouchableOpacity, InteractionManager } from 'react-native';
import { Input } from 'react-native-elements';
import IconF from 'react-native-vector-icons/FontAwesome';
import { createUser, userNameAvailability } from '../../Api/User.firebase';
import { changeNavBarColor } from '../../Services/design.service';
import { colors } from '../../Util/colors';
import SvgTopDesignSignUp from '../Common/SvgTopDesignSignUp';
import styles from './SignUp.style';

import {
    BallIndicator,
    BarIndicator,
    DotIndicator,
    MaterialIndicator,
    PacmanIndicator,
    PulseIndicator,
    SkypeIndicator,
    UIActivityIndicator,
    WaveIndicator,
} from 'react-native-indicators';


class SignIn extends React.Component {

    _isMounted = false;

    constructor(props) {
        super(props)

        this.passRef = React.createRef()
        this.repassRef = React.createRef()
        this.usernameRef = React.createRef()

        this.state = {
            loading: false,
            username: "",
            password: "",
            repassword: "",

            usernameError: "",
            passwordError: "",
            repasswordError: "",

        }

    }

    componentDidMount() {
        this._isMounted = true;
        this.changeSecureTextInput()
        InteractionManager.runAfterInteractions(async () => {
            await changeNavBarColor(colors.secondary)
        })
    }

    changeSecureTextInput = () => {
        if (this.passRef) {
            this.passRef.current.setNativeProps({
                style: styles.InputText
            });
        }

        if (this.repassRef) {
            this.repassRef.current.setNativeProps({
                style: styles.InputText
            });
        }

    }

    signIn = () => {
        this.props.navigation.replace('SignIn')
    }

    home = () => {
        this.props.navigation.replace('Users')
    }

    hasWhiteSpace(s) {
        let regSpace = new RegExp(/\s/);
        // Check for white space
        if (regSpace.test(s)) {
            //your logic
            this.setState({
                usernameError: "Spaces not allow !"
            })
            return false;
        } else {
            this.setState({ username: s, usernameError: "" })
        }
        return true;
    }

    signUp = async () => {
        try {

            this.setState({
                loading: true
            }, async () => {
                if (this.validateFields()) {
                    if (this.validatePasswords()) {
                        var response = await userNameAvailability(this.state.username)
                        if (!response.exists) {
                            await createUser({
                                password: this.state.password,
                                online: new Date(),
                                level: "pawn",
                                rank: 5
                            }, this.state.username)

                            await AsyncStorage.setItem(USER, this.state.username)
                            this.home()
                        } else {
                            this.setState({
                                usernameError: "Username not available, Please use another !"
                            })
                            this.resetScreen()
                        }
                    } else {
                        this.resetScreen()
                    }
                } else {
                    this.resetScreen()
                }
            })
        } catch (error) {
            console.log(error)
            this.resetScreen()
        }
    }

    resetScreen = () => {
        this.setState({
            loading: false
        }, () => {
            this.changeSecureTextInput()
        })
    }

    validateFields = () => {
        var valid = true
        if (this.state.password == undefined || this.state.repassword == undefined || this.state.username == undefined
            || this.state.password == "" || this.state.repassword == "" || this.state.username == ""
            || this.state.password == null || this.state.repassword == null || this.state.username == null) {
            alert("Fill required details !")
            valid = false
        }

        return valid;
    }

    changePassword = (input) => {
        this.setState({
            password: input,
            passwordError: ""
        })
    }

    changeRePassword = (input) => {
        this.setState({
            repassword: input,
            repasswordError: ""
        })
    }

    validatePasswords = () => {
        var valid = true

        if (this.state.password.length < 5) {
            this.setState({
                passwordError: "Password length should be more than 4 !"
            })
            valid = false
        } else {
            if (this.state.password != this.state.repassword) {
                this.setState({
                    repasswordError: "Re Entered password was invalid !"
                })
                valid = false
            }
        }

        return valid;
    }

    render() {

        return (
            <>
                {(this.state.loading) ? (
                    <SafeAreaView style={styles.mainContainor}>
                        <StatusBar barStyle={'light-content'} backgroundColor={colors.secondary} />
                        <BarIndicator color={colors.secondary} />
                    </SafeAreaView>
                ) : (
                    <SafeAreaView style={styles.mainContainor}>
                        <StatusBar barStyle={'light-content'} backgroundColor={colors.secondary} />
                        <Text style={styles.signInText}>
                            Join with Us
                        </Text >
                        <Text style={styles.subText}>Discover more friends</Text>
                        <View style={styles.topSvgContainer}>
                            <SvgTopDesignSignUp />
                        </View>
                        <View>
                            <Image source={require('../../Assets/logo.png')} style={styles.logo} />
                        </View>
                        <View style={styles.subContainor}>
                            <View style={styles.imageContainer}>
                                <Image source={require('../../Assets/signup.png')} style={styles.imageBackground} />
                            </View>
                            <View style={styles.inputContainor}>
                                <Input
                                    placeholder={"Enter Username"}
                                    placeholderTextColor={colors.inputPlaceHolder}
                                    keyboardType='default'
                                    backgroundColor={colors.inputBackground}
                                    borderRadius={20}
                                    ref={this.usernameRef}
                                    inputContainerStyle={styles.InputContainerStyle}
                                    inputStyle={styles.InputText}
                                    labelStyle={styles.InputLabelText}
                                    onChangeText={(input) => this.hasWhiteSpace(input)}
                                    maxLength={10}
                                    errorMessage={this.state.usernameError}
                                    errorStyle={styles.ErrorText}
                                    value={this.state.username}
                                    leftIcon={
                                        <IconF
                                            name='user'
                                            size={15}
                                            color={colors.secondary}
                                            style={{ width: 15 }}
                                        />
                                    }
                                />
                                <Input
                                    placeholder={"Enter Password"}
                                    placeholderTextColor={colors.inputPlaceHolder}
                                    keyboardType='default'
                                    secureTextEntry={true}
                                    ref={this.passRef}
                                    backgroundColor={colors.inputBackground}
                                    borderRadius={20}
                                    inputContainerStyle={styles.InputContainerStyle}
                                    inputStyle={styles.InputText}
                                    labelStyle={styles.InputLabelText}
                                    onChangeText={(input) => this.changePassword(input)}
                                    errorMessage={this.state.passwordError}
                                    errorStyle={styles.ErrorText}
                                    value={this.state.password}
                                    leftIcon={
                                        <IconF
                                            name='lock'
                                            size={15}
                                            color={colors.secondary}
                                            style={{ width: 15 }}
                                        />
                                    }
                                />
                                <Input
                                    placeholder={"Re-Enter Password"}
                                    placeholderTextColor={colors.inputPlaceHolder}
                                    keyboardType='default'
                                    secureTextEntry={true}
                                    ref={this.repassRef}
                                    backgroundColor={colors.inputBackground}
                                    borderRadius={20}
                                    inputContainerStyle={styles.InputContainerStyle}
                                    inputStyle={styles.InputText}
                                    labelStyle={styles.InputLabelText}
                                    onChangeText={(input) => this.changeRePassword(input)}
                                    errorMessage={this.state.repasswordError}
                                    errorStyle={styles.ErrorText}
                                    value={this.state.repassword}
                                    leftIcon={
                                        <IconF
                                            name='lock'
                                            size={15}
                                            color={colors.secondary}
                                            style={{ width: 15 }}
                                        />
                                    }
                                />
                                <View>
                                    <TouchableOpacity style={styles.SignUpButtonStyle}
                                        onPress={this.signUp}>
                                        <Text style={styles.SignUpButtonText}>Join</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.AlreadyHaveAccountButtonStyle}
                                        onPress={this.signIn}>
                                        <Text style={styles.AlreadyHaveAccountButtonText}>Already have an account</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </SafeAreaView>
                )}
            </>
        )
    }
}

export default SignIn;