/**
 * @author Supun Madushanka
 * This is the Splash Component
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { Image, SafeAreaView, StatusBar, Text, View, TouchableOpacity, InteractionManager } from 'react-native';
import { Input } from 'react-native-elements';
import { BarIndicator } from 'react-native-indicators';
import IconF from 'react-native-vector-icons/FontAwesome';
import { login } from '../../Api/User.firebase';
import { changeNavBarColor } from '../../Services/design.service';
import { USER } from '../../Util/asyc-storage-const';
import { colors } from '../../Util/colors';
import SvgTopDesign from '../Common/SvgTopDesign';
import styles from './SignIn.style';

class SignIn extends React.Component {

    _isMounted = false;

    constructor(props) {
        super(props)

        this.state = {
            loading: false,
            username: "",
            password: ""
        }

        this.passRef = React.createRef()
    }

    componentDidMount() {
        this._isMounted = true;
        this.changeSecureTextInput()
        InteractionManager.runAfterInteractions(async () => {
            await changeNavBarColor(colors.primary)
        })
    }

    changeSecureTextInput = () => {
        if (this.passRef) {
            this.passRef.current.setNativeProps({
                style: styles.InputText
            });
        }
    }

    signIn = async () => {
        try {
            this.setState({
                loading: true
            }, async () => {
                if (this.validateFields()) {
                    var response = await login(this.state.username, this.state.password)
                    if (response.exists && response.data().password == this.state.password) {
                        await AsyncStorage.setItem(USER, this.state.username)
                        this.home()
                    } else {
                        alert("Invalid Username or password !")
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

    home = () => {
        this.props.navigation.replace('Users')
    }

    validateFields = () => {
        var valid = true
        if (this.state.password == undefined || this.state.username == undefined
            || this.state.password == "" || this.state.username == ""
            || this.state.password == null || this.state.username == null) {
            alert("Fill required details !")
            valid = false
        }

        return valid;
    }

    createAccount = () => {
        this.props.navigation.replace('SignUp')
    }

    resetScreen = () => {
        this.setState({
            loading: false
        }, () => {
            this.changeSecureTextInput()
        })
    }

    render() {

        return (

            <>
                {(this.state.loading) ? (
                    <SafeAreaView style={styles.mainContainor}>
                        <StatusBar barStyle={'light-content'} backgroundColor={colors.primary} />
                        <BarIndicator color={colors.primary} />
                    </SafeAreaView>
                ) : (
                    <SafeAreaView style={styles.mainContainor}>
                        <StatusBar barStyle={'light-content'} backgroundColor={colors.primary} />
                        <Text style={styles.signInText}>
                            SignIn
                        </Text >
                        <Text style={styles.subText}>Discover more friends</Text>
                        <View style={styles.topSvgContainer}>
                            <SvgTopDesign />
                        </View>
                        <View>
                            <Image source={require('../../Assets/logo.png')} style={styles.logo} />
                        </View>
                        <View style={styles.subContainor}>
                            <View style={styles.imageContainer}>
                                <Image source={require('../../Assets/signin.png')} style={styles.imageBackground} />
                            </View>
                            <View style={styles.inputContainor}>
                                <Input
                                    placeholder={"Enter Username"}
                                    placeholderTextColor={colors.inputPlaceHolder}
                                    keyboardType='default'
                                    backgroundColor={colors.inputBackground}
                                    borderRadius={20}
                                    inputContainerStyle={styles.InputContainerStyle}
                                    inputStyle={styles.InputText}
                                    labelStyle={styles.InputLabelText}
                                    onChangeText={(input) => this.setState({
                                        username: input
                                    })}
                                    value={this.state.username}
                                    leftIcon={
                                        <IconF
                                            name='user'
                                            size={15}
                                            color={colors.primary}
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
                                    onChangeText={(input) => this.setState({
                                        password: input
                                    })}
                                    value={this.state.password}
                                    leftIcon={
                                        <IconF
                                            name='lock'
                                            size={15}
                                            color={colors.primary}
                                            style={{ width: 15 }}
                                        />
                                    }
                                />
                                <View style={{ marginTop: 30 }}>
                                    <TouchableOpacity style={styles.SignInButtonStyle}
                                        onPress={this.signIn}>
                                        <Text style={styles.SignInButtonText}>Signin</Text>
                                    </TouchableOpacity>
                                    {/* <TouchableOpacity style={styles.ForgetPasswordButtonStyle}
                                onPress={this._forgetPassword}>
                                <Text style={styles.ForgetPasswordButtonText}>Forget my password</Text>
                            </TouchableOpacity> */}
                                    <TouchableOpacity style={styles.CreateNewAccountButtonStyle}
                                        onPress={this.createAccount}>
                                        <Text style={styles.CreateNewAccountButtonText}>Create account</Text>
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