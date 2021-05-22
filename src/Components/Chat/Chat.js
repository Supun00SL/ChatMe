/**
 * @author Supun Madushanka
 * This is the Splash Component
 */

import React from 'react';
import { InteractionManager, SafeAreaView, StatusBar, Text } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import styles from './Chat.style';
import { changeNavBarColor } from '../../Services/design.service';
import { colors } from '../../Util/colors';

class Chat extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            messages: [{
                _id: 1,
                text: 'Hello developer',
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'React Native',
                    avatar: 'https://placeimg.com/140/140/any',
                },
            }]
        }
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(async () => {
            await changeNavBarColor('white')
        })
    }

    onSend(messages = []) {
        this.setState((previousState) => ({
            messages: GiftedChat.append(previousState.messages, messages),
        }));
    }

    render() {

        return (
            <SafeAreaView style={styles.mainContainor}>
                <StatusBar barStyle={'light-content'} backgroundColor={colors.primary} />
                <GiftedChat
                    messages={this.state.messages}
                    onSend={(messages) => this.onSend(messages)}
                    user={{
                        _id: 1
                    }}
                />
            </SafeAreaView>
        )
    }
}

export default Chat;