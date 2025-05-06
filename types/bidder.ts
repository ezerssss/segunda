import { z } from "zod";
import { CampusEnum } from "../enums/campus";
import { BidTypeEnum } from "../enums/bid";

export const BidSchema = z.object({
    id: z.string().min(1),
    userId: z.string().min(1),
    itemId: z.string().min(1),
    postId: z.string().min(1),
    name: z
        .string()
        .trim()
        .min(1, { message: "Name is required" })
        .max(100, { message: "Name can only be 100 letters long." }),
    campus: CampusEnum,
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
