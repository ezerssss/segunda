import { getFunctions, httpsCallable } from "@react-native-firebase/functions";
import app from ".";
import { SetUpUserRequestType } from "@/types/user";
import { GenericResponseMessage } from "@/types/response";
import { DeletePostRequestType, PostRequestType } from "@/types/post";
import {
    BidRequestType,
    CancelBidRequestType,
    ConfirmBidRequestType,
} from "@/types/bidder";
import { SeenMessageType, SendMessageRequestType } from "@/types/chat";
import { EditItemRequestType, DeleteItemRequestType } from "@/types/item";
import { ReceiveNotificationType } from "@/types/notification";

const functions = getFunctions(app, "asia-southeast1");
export const setUpUser = httpsCallable<
    SetUpUserRequestType,
    GenericResponseMessage
>(functions, "setUpUser");

export const createPost = httpsCallable<
    PostRequestType,
    GenericResponseMessage
>(functions, "createPost");

export const editItem = httpsCallable<
    EditItemRequestType,
    GenericResponseMessage
>(functions, "editItem");

export const deletePost = httpsCallable<
    DeletePostRequestType,
    GenericResponseMessage
>(functions, "deletePost");

export const deleteItem = httpsCallable<
    DeleteItemRequestType,
    GenericResponseMessage
>(functions, "deleteItem");

export const bidItem = httpsCallable<BidRequestType, GenericResponseMessage>(
    functions,
    "bidItem",
);

export const confirmBid = httpsCallable<
    ConfirmBidRequestType,
    GenericResponseMessage
>(functions, "confirmBid");

export const cancelBid = httpsCallable<
    CancelBidRequestType,
    GenericResponseMessage
>(functions, "cancelBid");

export const sendMessage = httpsCallable<
    SendMessageRequestType,
    GenericResponseMessage
>(functions, "sendMessage");

export const seenMessage = httpsCallable<
    SeenMessageType,
    GenericResponseMessage
>(functions, "seenMessage");

export const receiveNotification = httpsCallable<
    ReceiveNotificationType,
    GenericResponseMessage
>(functions, "receiveNotification");

export const receiveAllNotifications = httpsCallable<
    void,
    GenericResponseMessage
>(functions, "receiveAllNotifications");
