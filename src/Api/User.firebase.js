import firestore from '@react-native-firebase/firestore';
import { FirebaseCollctionEnum } from '../Enums/FirebaseCollections.enum';

import UserDto from './Dto/User.dto'

async function createUser(userObj, username) {

    var userDto = new UserDto(userObj);

    return firestore()
        .collection(FirebaseCollctionEnum.USERS)
        .doc(username)
        .set(userDto)
}

async function userNameAvailability(username) {

    return firestore()
        .collection(FirebaseCollctionEnum.USERS)
        .doc(username)
        .get();
}

async function login(username) {
    return firestore()
        .collection(FirebaseCollctionEnum.USERS)
        .doc(username)
        .get();
}

async function getAllUsers() {
    return firestore()
        .collection(FirebaseCollctionEnum.USERS)
        .orderBy('rank', 'asc')
        .get();
}

export { createUser, userNameAvailability, login, getAllUsers }