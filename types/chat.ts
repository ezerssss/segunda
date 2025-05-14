import { z } from "zod";
import { ItemSchema } from "./item";
import { UserPublicDataSchema } from "./user";

export const ChatSchema = z.object({
    id: z.string().min(1),
    sellerId: z.string().min(1),
    sellerData: UserPublicDataSchema,
    buyerId: z.string().min(1),
    buyerData: UserPublicDataSchema,
    lastMessage: z
        .string()
        .trim()
        .min(1, { message: "Message should have at least one character." }),
    isSeen: z.object({
        seller: z.boolean(),
        buyer: z.boolean(),
    }),
    dateCreated: z.string().datetime(),
    dateUpdated: z.string().datetime(),
});
export type ChatType = z.infer<typeof ChatSchema>;

export const AssociatedItemSchema = z
    .object({
        bidId: z.string().min(1),
        item: ItemSchema,
        showApproveButton: z.boolean(),
    })
    .nullable();
export type AssociatedItemType = z.infer<typeof AssociatedItemSchema>;

export const MessageSchema = z.object({
    id: z.string().min(1),
    senderId: z.string().min(1).nullable(),
    senderData: UserPublicDataSchema.nullable(),
    message: z
        .string()
        .trim()
        .min(1, { message: "Message should have at least one character." }),
    imageUrl: z.string().url().nullable(),
    associatedBid: AssociatedItemSchema,
    isSystemGenerated: z.boolean(),
    dateCreated: z.string().datetime(),
});
export type MessageType = z.infer<typeof MessageSchema>;

export const SendMessageRequestSchema = z.object({
    chatId: z.string().min(1),
    message: z
        .string()
        .trim()
        .min(1, { message: "Message should have at least one character." }),
    imageUrl: z.string().url().nullable(),
});
export type SendMessageRequestType = z.infer<typeof SendMessageRequestSchema>;

export const SeenMessageRequest = z.object({
    chatId: z.string().min(1),
});
export type SeenMessageType = z.infer<typeof SeenMessageRequest>;
