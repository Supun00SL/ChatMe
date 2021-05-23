import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { Alert, TouchableOpacity, View } from 'react-native';
import { Avatar } from 'react-native-elements';
import { colors } from '../../Util/colors';

class UserHeaderRight extends React.Component {
    constructor(props) {
        super(props)
    }

    userScreen = () => {
        // this.props.navigation.navigate('User')
    };

    onLogut = () => {
        Alert.alert(
            "Alert",
            "Are you sure you want to logout !",
            [
                { text: 'No', onPress: () => console.log("cancel") },
                { text: 'Logout', onPress: () => this.logout() },
            ],
            { cancelable: false },
        );
    }

    logout = async () => {
        await AsyncStorage.clear()
        this.props.navigation.replace('SignIn')
    }

    render() {
        return (
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 20,
                flexDirection: 'row'
            }}>
                <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => this.userScreen()}>
                    <Avatar
                        size="small"
                        rounded
                        icon={{ name: 'user', type: 'font-awesome', color: 'white' }}
                        activeOpacity={0.7}
                        overlayContainerStyle={{ backgroundColor: colors.primary }} />
                </TouchableOpacity>
                <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => this.onLogut()}>
                    <Avatar
                        size="small"
                        rounded
                        icon={{ name: 'sign-out', type: 'font-awesome', color: 'white' }}
                        activeOpacity={0.7}
                        overlayContainerStyle={{ backgroundColor: colors.primary }} />
                </TouchableOpacity>
            </View>

        );
    }
}

export default UserHeaderRight;