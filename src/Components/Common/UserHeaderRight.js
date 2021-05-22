import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Avatar } from 'react-native-elements';
import { colors } from '../../Util/colors';

class UserHeaderRight extends React.Component {
    constructor(props) {
        super(props)
    }

    userScreen = () => {
        // this.props.navigation.navigate('User')
    };

    render() {
        return (
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 20
            }}>
                <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => this.userScreen()}>
                    <Avatar
                        size="small"
                        rounded
                        icon={{ name: 'user', type: 'font-awesome', color: 'white' }}
                        activeOpacity={0.7}
                        overlayContainerStyle={{ backgroundColor: colors.primary }} />
                </TouchableOpacity>
            </View>

        );
    }
}

export default UserHeaderRight;