import { firebase } from "@react-native-firebase/functions";

const fn = firebase.app().functions("asia-southeast1");

export const testOnCall = fn.httpsCallable<never, never>("testOnCall");
