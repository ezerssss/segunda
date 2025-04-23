import { getFunctions, httpsCallable } from "@react-native-firebase/functions";
import app from ".";
import { SetUpUserRequestType } from "@/types/user";
import { GenericResponseMessage } from "@/types/response";
import { PostRequestType } from "@/types/post";

const functions = getFunctions(app, "asia-southeast1");
export const setUpUser = httpsCallable<
    SetUpUserRequestType,
    GenericResponseMessage
>(functions, "setUpUser");

export const createPost = httpsCallable<
    PostRequestType,
    GenericResponseMessage
>(functions, "createPost");
