import { GenericReturnMessage } from "@/types/return_message";
import { getFunctions, httpsCallable } from "@react-native-firebase/functions";
import app from ".";

const functions = getFunctions(app, "asia-southeast1");

export const testOnCall = httpsCallable<never, GenericReturnMessage>(
    functions,
    "testOnCall",
);
