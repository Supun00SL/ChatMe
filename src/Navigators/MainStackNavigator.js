/**
 * @author Supun Madushanka
 * This is the Splash Component
 */

import React from 'react';
import { Animated, Easing, SafeAreaView, StatusBar, Text, View } from 'react-native';
import Chat from '../Components/Chat/Chat';
import { colors } from '../Util/colors';
import { NavigationContainer } from '@react-navigation/native';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import SignIn from '../Components/SignIn/SignIn';
import SignUp from '../Components/SignUp/SignUp';
import Users from '../Components/Users/Users';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { USER } from '../Util/asyc-storage-const';
import UserHeaderRight from '../Components/Common/UserHeaderRight';

const Stack = createStackNavigator();

class MainStackNavigator extends React.Component {

    constructor(props) {
        super(props)

        console.log(this.props.isOld)
        this.state = {
            isOld: this.props.isOld
        }
    }

    render() {

        return (
            <NavigationContainer >
                <Stack.Navigator
                    // initialRouteName={this.state.isOld ? 'MainTabNavigator' : 'SignIn'}
                    initialRouteName={(this.state.isOld) ? 'Users' : 'SignIn'}
                    screenOptions={{
                        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
                    }}>
                    <Stack.Screen
                        name="SignIn"
                        component={SignIn}
                        options={({ navigation }) => ({
                            headerTitle: "SignIn",
                            headerTitleStyle: {
                                color: colors.primary,
                                fontFamily: "OpenSans-Bold"
                            },
                            headerTintColor: colors.primary,
                            headerShown: false
                        })}
                    />
                    <Stack.Screen
                        name="SignUp"
                        component={SignUp}
                        options={({ navigation }) => ({
                            headerTitle: "SignUp",
                            headerTitleStyle: {
                                color: colors.primary,
                                fontFamily: "OpenSans-Bold"
                            },
                            headerTintColor: colors.primary,
                            headerShown: false
                        })}
                    />
                    <Stack.Screen
                        name="Users"
                        component={Users}
                        options={({ navigation }) => ({
                            headerTitle: "ChatMe",
                            headerTitleStyle: {
                                color: colors.primary,
                                fontFamily: "OpenSans-Bold"
                            },
                            headerTintColor: colors.primary,
                            headerRight: props => <UserHeaderRight {...props} navigation={navigation} />
                        })}
                    />

                    <Stack.Screen
                        name="Chat"
                        component={Chat}
                        options={({ navigation }) => ({
                            headerTitle: "Chat",
                            headerTitleStyle: {
                                color: colors.primary,
                                fontFamily: "OpenSans-Bold"
                            },
                            headerTintColor: colors.primary
                        })}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        )
    }
}

export default MainStackNavigator;