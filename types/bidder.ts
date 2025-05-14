import { z } from "zod";
import { BidTypeEnum } from "../enums/bid";
import { UserPublicDataSchema } from "./user";

export const BidSchema = z.object({
    id: z.string().min(1),
    itemId: z.string().min(1),
    postId: z.string().min(1),
    chatId: z.string().nullable(),
    bidderId: z.string().min(1),
    bidderData: UserPublicDataSchema,
    price: z.number().nonnegative(),
    type: BidTypeEnum,
    isConfirmed: z.boolean(),
    dateCreated: z.string().datetime(),
});
export type BidType = z.infer<typeof BidSchema>;

export const BidRequestSchema = z.object({
    itemId: z.string().min(1),
    price: z.coerce.number().nonnegative(),
});
export type BidRequestType = z.infer<typeof BidRequestSchema>;

export const ConfirmBidRequestSchema = z.object({
    itemId: z.string().min(1),
    bidId: z.string().min(1),
});
export type ConfirmBidRequestType = z.infer<typeof ConfirmBidRequestSchema>;

export const CancelBidRequestSchema = z.object({
    itemId: z.string().min(1),
});
export type CancelBidRequestType = z.infer<typeof CancelBidRequestSchema>;
