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

export { getChats, getSingleChat, addChat }