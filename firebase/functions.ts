import functions from "@react-native-firebase/functions";

export const testOnCall = functions().httpsCallable<never, never>("testOnCall");
