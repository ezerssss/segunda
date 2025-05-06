import { z } from "zod";
import { ItemSchema } from "./item";
import { UserPublicDataSchema } from "./user";

export const ChatSchema = z.object({
    id: z.string().min(1),
    sellerId: z.string().min(1),
    sellerData: UserPublicDataSchema,
    buyerId: z.string().min(1),
    buyerData: UserPublicDataSchema,
    postId: z.string().min(1),
    itemId: z.string().min(1),
    bidId: z.string().min(1),
    item: ItemSchema,
    lastMessage: z
        .string()
        .trim()
        .min(1, { message: "Message should have at least one character." }),
    isSeen: z.object({
        seller: z.boolean(),
        buyer: z.boolean(),
    }),
    isConfirmed: z.boolean(),
    dateCreated: z.string().datetime(),
    dateUpdated: z.string().datetime(),
});
export type ChatType = z.infer<typeof ChatSchema>;

export const MessageSchema = z.object({
    id: z.string().min(1),
    senderId: z.string().min(1),
    senderData: UserPublicDataSchema,
    message: z
        .string()
        .trim()
        .min(1, { message: "Message should have at least one character." }),
    imageUrl: z.string().url().nullable(),
    dateCreated: z.string().datetime(),
    isSystemGenerated: z.boolean(),
});
export type MessageType = z.infer<typeof MessageSchema>;
