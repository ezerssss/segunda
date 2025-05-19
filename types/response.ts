import { StatusCodes } from "http-status-codes";

export type GenericResponseMessage = {
    message: string;
    status: StatusCodes;
};

export type CreatePostResponseMessage = {
    postId: string;
} & GenericResponseMessage;

export type ConfirmBidResponseMessage = {
    chatId: string;
} & GenericResponseMessage;
