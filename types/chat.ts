import { z } from "zod";
import { ItemSchema } from "./item";
import { UserPublicDataSchema } from "./user";

export const ChatSchema = z.object({
    id: z.string().min(1),
    sellerId: z.string().min(1),
    sellerData: UserPublicDataSchema,
    buyerId: z.string().min(1),
    buyerData: UserPublicDataSchema,
    lastMessage: z.object({
        message: z
            .string()
            .trim()
            .min(1, { message: "Message should have at least one character." }),
        senderId: z.string().min(1).nullable(),
        senderData: UserPublicDataSchema.nullable(),
        isSystemGenerated: z.boolean(),
    }),
    isSeen: z.object({
        seller: z.boolean(),
        buyer: z.boolean(),
    }),
    dateCreated: z.string().datetime(),
    dateUpdated: z.string().datetime(),
});
export type ChatType = z.infer<typeof ChatSchema>;

export const SystemGeneratedMessageSchema = z.object({
    title: z.string().min(1),
    message: z.string().min(1),
    item: ItemSchema.nullable(),
    bidId: z.string().min(1).nullable(),
    showActionButton: z.boolean(),
});
export type SystemGeneratedMessageType = z.infer<
    typeof SystemGeneratedMessageSchema
>;

export const MessageSchema = z.object({
    id: z.string().min(1),
    senderId: z.string().min(1).nullable(),
    senderData: UserPublicDataSchema.nullable(),
    message: z.string(),
    imageUrl: z.string().url().nullable(),
    systemGeneratedMessage: SystemGeneratedMessageSchema.nullable(),
    dateCreated: z.string().datetime(),
});
export type MessageType = z.infer<typeof MessageSchema>;

export const SendMessageRequestSchema = z.object({
    chatId: z.string().min(1),
    message: z.string().trim(),
    imageUrl: z.string().url().nullable(),
});
export type SendMessageRequestType = z.infer<typeof SendMessageRequestSchema>;

export const SeenMessageRequest = z.object({
    chatId: z.string().min(1),
});
export type SeenMessageType = z.infer<typeof SeenMessageRequest>;
