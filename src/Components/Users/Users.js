/**
 * @author Supun Madushanka
 * This is the Splash Component
 */

import React from 'react';
import { InteractionManager, SafeAreaView, StatusBar, Text, View } from 'react-native';
import styles from './Users.style';
import { changeNavBarColor } from '../../Services/design.service';
import { colors } from '../../Util/colors';
import { ListItem } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import TouchableScale from 'react-native-touchable-scale';
import { Avatar } from 'react-native-elements';
import IconF5 from 'react-native-vector-icons/FontAwesome5';
import { ScrollView } from 'react-native-gesture-handler';
import { getAllUsers } from '../../Api/User.firebase';
import { BarIndicator } from 'react-native-indicators';
import UserDto from '../../Api/Dto/User.dto';
import { Badge } from 'react-native-elements/dist/badge/Badge';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { USER } from '../../Util/asyc-storage-const';
import { getChats } from '../../Api/Chat.firebase';

class Users extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            loading: false,
            users: [],
            currentUser: ""
        }
    }

    componentDidMount() {
        this.getUsers()
        this.checkForUser()
        InteractionManager.runAfterInteractions(async () => {
            await changeNavBarColor('white')
        })
    }

    getChatsFromServer = async (otherEndUser) => {
        try {
            this.setState({
                loading: true
            }, async () => {
                var response = await getChats(this.state.currentUser, otherEndUser)
                var chat = []
                if (!response.empty) {
                    if (response.docs.length > 0) {
                        response.docs.forEach(async (doc) => {
                            var ref = await doc.data().message.get()
                            if (ref.exists) {
                                var refDoc = ref.ref
                                chat.concat(refDoc._documentPath._parts)
                                this.props.navigation.navigate('Chat', {
                                    chat: refDoc._documentPath._parts,
                                    otheruser: otherEndUser
                                })
                                this.resetScreen()
                            } else {
                                this.resetScreen()
                            }
                        })
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

    checkForUser = async () => {
        var user = await AsyncStorage.getItem(USER)
        if (user) {
            this.setState({
                currentUser: user
            })
        }
    }

    getUsers = async () => {
        try {
            this.setState({
                loading: true
            }, async () => {
                var response = await getAllUsers()
                if (!response.empty) {
                    var arr = []
                    response.docs.forEach((doc) => {
                        var userDto = new UserDto(null)
                        userDto.fillObj(doc.id, doc.data())
                        arr.push(userDto)
                    })

                    this.setState({
                        users: arr
                    }, () => {
                        this.resetScreen()
                    })
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
        })
    }

    chatWithUser = async (otherEndUser) => {
        if (otherEndUser != this.state.currentUser) {
            await this.getChatsFromServer(otherEndUser)
        }
    }

    renderLevel(param) {
        switch (param) {
            case 'king':
                return (
                    <View style={{ flexDirection: 'row' }}>

                        <IconF5
                            name='chess-king'
                            size={15}
                            color={colors.goldenYellow}
                        />
                        <View style={{ marginLeft: 5 }}>
                            <Text style={styles.lingSubNameText}>Bot King</Text>
                        </View>
                    </View>
                );
            case 'queen':
                return (
                    <View style={{ flexDirection: 'row' }}>

                        <IconF5
                            name='chess-queen'
                            size={15}
                            color={colors.goldenYellow}
                        />
                        <View style={{ marginLeft: 5 }}>
                            <Text style={styles.lingSubNameText}>Bot Queen</Text>
                        </View>
                    </View>
                );
            default:
                return (
                    <View style={{ flexDirection: 'row' }}>

                        <IconF5
                            name='chess-knight'
                            size={15}
                            color={colors.goldenYellow}
                        />
                        <View style={{ marginLeft: 5 }}>
                            <Text style={styles.lingSubNameText}>Knight</Text>
                        </View>
                    </View>
                );
        }
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
                    <ScrollView style={styles.mainContainor}>
                        <StatusBar barStyle={'light-content'} backgroundColor={colors.primary} />

                        {(this.state.users && this.state.users.map((user, index) =>
                            <ListItem
                                key={index}
                                style={styles.chatUserCard}
                                Component={TouchableScale}
                                friction={90}
                                tension={100}
                                activeScale={0.95}
                                linearGradientProps={{
                                    colors: [colors.secondary, colors.primary],
                                    start: { x: 1, y: 0 },
                                    end: { x: 0.1, y: 0 }
                                }}
                                ViewComponent={LinearGradient}
                                onPress={() => this.chatWithUser(user.username)}>
                                <Avatar
                                    icon={{ name: 'user', type: 'font-awesome', color: colors.primary }}
                                    activeOpacity={0.7}
                                    titleStyle={styles.userAvatarTitle}
                                    rounded
                                    style={{ width: 40, height: 40 }}
                                    overlayContainerStyle={{ backgroundColor: 'white' }} />
                                <ListItem.Content>
                                    <ListItem.Title style={styles.userCardTitle}>
                                        <View style={{ justifyContent: 'center', flexDirection: 'row' }}>
                                            <Text style={styles.listItemHeaderText}>{"@" + user.username}</Text>
                                            {(user.username == this.state.currentUser) ? (
                                                <Badge value="Me" badgeStyle={{ backgroundColor: 'white', padding: 1, marginLeft: 5 }} containerStyle={{ margin: 1 }} textStyle={{ fontFamily: "OpenSans-Regular", color: colors.primary }} />
                                            ) : (
                                                <></>
                                            )}
                                        </View>
                                    </ListItem.Title>
                                    <ListItem.Subtitle>
                                        {this.renderLevel(user.level)}
                                    </ListItem.Subtitle>
                                </ListItem.Content>
                                <ListItem.Chevron color="white" />
                            </ListItem>
                        ))}
                    </ScrollView>
                )}
            </>
        )
    }
}

export default Users;