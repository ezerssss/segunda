import { getFunctions, httpsCallable } from "@react-native-firebase/functions";
import app from ".";
import { SetUpUserRequestType } from "@/types/user";
import { GenericResponseMessage } from "@/types/response";

const functions = getFunctions(app, "asia-southeast1");


export const testOnCall = httpsCallable<never, never>(functions, "testOnCall");
export const setUpUser = httpsCallable<
    SetUpUserRequestType,
    GenericResponseMessage
>(functions, "setUpUser");