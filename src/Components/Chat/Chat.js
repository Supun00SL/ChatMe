/**
 * @author Supun Madushanka
 * This is the Splash Component
 */

import React from 'react';
import { InteractionManager, KeyboardAvoidingView, Platform, SafeAreaView, StatusBar, Text, View } from 'react-native';
import { GiftedChat, Bubble, Send, Message, InputToolbar } from 'react-native-gifted-chat';
import styles from './Chat.style';
import { changeNavBarColor } from '../../Services/design.service';
import { colors } from '../../Util/colors';
import { getSingleChat, addChat } from '../../Api/Chat.firebase'

import ChatDto from '../../Api/Dto/Chat.dto'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { USER } from '../../Util/asyc-storage-const';
import MessageDto from '../../Api/Dto/Message.dto';

import IconF from 'react-native-vector-icons/FontAwesome';

class Chat extends React.Component {

    _isMounted = false;

    constructor(props) {
        super(props)

        this.state = {
            currentUser: "",
            messages: []
        }
    }

    componentDidMount() {
        this._isMounted = true;
        this.pickChatIdFromParams()
        this.checkForUser()
        InteractionManager.runAfterInteractions(async () => {
            await changeNavBarColor('white')
        })
    }

    updateTitle = (title) => {
        this.props.navigation.setOptions({
            headerTitle: "@" + title
        })
    }

    componentWillUnmount() {
        this._isMounted = false
    }

    checkForUser = async () => {
        var user = await AsyncStorage.getItem(USER)
        if (user) {
            this.setState({
                currentUser: user
            })
        }
    }

    pickChatIdFromParams = () => {
        if (this.props.route.params) {
            var chat = this.props.route.params.chat;
            if (chat) {
                this.setState({
                    chat: chat
                }, () => {
                    if (this.state.chat && this.state.chat.length > 0) {
                        this.getChats(this.state.chat[1])
                        this.liveUpdate(this.state.chat[1])
                    }
                    // console.log(this.state.chat)
                })
            }

            var otheruser = this.props.route.params.otheruser;
            if (otheruser) {
                this.updateTitle(otheruser)
            }
        }
    }

    liveUpdate = async (document) => {
        if (this.state.chat && this.state.chat.length > 0) {
            (await getSingleChat(document)).onSnapshot(this.onResult, this.onError)
        }
    }

    onResult = (QuerySnapshot) => {
        try {
            var arr = []
            if (QuerySnapshot && this._isMounted) {
                QuerySnapshot.docs.forEach((doc) => {
                    if (doc.exists) {
                        var chatDto = new ChatDto(doc.id, doc.data())
                        arr.push(chatDto)
                    }
                })

                arr.sort((a, b) => b.createdAt - a.createdAt)

                this.setState({
                    messages: arr
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    onError = (error) => {
        console.error(error);
    }


    getChats = async (document) => {
        var response = await (await getSingleChat(document)).get()
        var arr = []
        response.docs.forEach((doc) => {
            if (doc.exists) {
                var chatDto = new ChatDto(doc.id, doc.data())
                arr.push(chatDto)
            }
        })

        arr.sort((a, b) => b.createdAt - a.createdAt)

        this.setState({
            messages: arr
        })

    }

    async onSend(messages = []) {

        var messageDto = new MessageDto(messages[0])
        await addChat(this.state.chat[1], messageDto)

        // this.setState((previousState) => ({
        //     messages: GiftedChat.append(previousState.messages, messages),
        // }));
    }

    renderBubble(props) {
        return (
            <Bubble
                {...props}
                textStyle={{
                    right: {
                        color: 'white',
                        fontFamily: "OpenSans-Regular"
                    },
                    left: {
                        color: colors.hardGray,
                        fontFamily: "OpenSans-Regular"
                    }
                }}
                wrapperStyle={{
                    right: {
                        backgroundColor: colors.primary
                    },
                    left: {
                        backgroundColor: 'white'
                    }
                }}

            />
        )
    }

    renderSend(props) {
        return (
            <Send
                {...props}
                containerStyle={{
                    width: 60,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <View>
                    <IconF
                        name='send'
                        size={20}
                        color={colors.goldenYellow}
                    />
                </View>
            </Send>
        );
    }

    renderInputToolbar(props) {
        return (
            <InputToolbar
                {...props}
            >
            </InputToolbar>
        );
    }


    render() {

        return (
            <SafeAreaView style={styles.mainContainor}>
                <StatusBar barStyle={'light-content'} backgroundColor={colors.primary} />

                <GiftedChat
                    messages={this.state.messages}
                    onSend={(messages) => this.onSend(messages)}
                    user={{
                        _id: this.state.currentUser
                    }}
                    renderSend={this.renderSend}
                    renderBubble={this.renderBubble}
                    renderInputToolbar={this.renderInputToolbar}
                    textInputProps={{
                        style: {
                            fontFamily: "OpenSans-Regular",
                            flex: 1
                        }
                    }}
                />
            </SafeAreaView>
        )
    }
}

export default Chat;