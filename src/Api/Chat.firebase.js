import firestore from '@react-native-firebase/firestore';
import { FirebaseCollctionEnum } from '../Enums/FirebaseCollections.enum';

async function getChats(ownUser, otherEndUser) {
    return firestore()
        .collection(FirebaseCollctionEnum.USERS)
        .doc(ownUser)
        .collection(FirebaseCollctionEnum.SUBCHATS)
        .where("with", "==", otherEndUser)
        .get()
}

async function getSingleChat(document) {
    return firestore()
        .collection(FirebaseCollctionEnum.CHATS)
        .doc(document)
        .collection(FirebaseCollctionEnum.CHATSUB)
}

async function addChat(document, message) {
    return firestore()
        .collection(FirebaseCollctionEnum.CHATS)
        .doc(document)
        .collection(FirebaseCollctionEnum.CHATSUB)
        .add(message)
}

async function createNewChat(ownUser) {
    return firestore()
        .collection(FirebaseCollctionEnum.CHATS)
        .doc()
        .collection(FirebaseCollctionEnum.CHATSUB)
        .add({
            text: "Hello",
            createdAt: new Date(),
            user: ownUser
        })
}

async function linkNewChat(ownUser, messageRefObj) {
    return firestore()
        .collection(FirebaseCollctionEnum.USERS)
        .doc(ownUser)
        .collection(FirebaseCollctionEnum.SUBCHATS)
        .add(messageRefObj)
}

async function linkOtherEndNewChat(otherUser, messageRefObj) {
    return firestore()
        .collection(FirebaseCollctionEnum.USERS)
        .doc(otherUser)
        .collection(FirebaseCollctionEnum.SUBCHATS)
        .add(messageRefObj)
}

export { getChats, getSingleChat, addChat, createNewChat, linkNewChat,linkOtherEndNewChat }