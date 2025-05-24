import { z } from "zod";
import { BidSchema } from "./bidder";
import { UserPublicDataSchema } from "./user";
import { PostTagsEnum } from "../enums/post";

export const ItemSchema = z.object({
    id: z.string().min(1),
    postId: z.string().min(1),
    sellerId: z.string().min(1),
    sellerData: UserPublicDataSchema,
    index: z.number().nonnegative(),
    name: z
        .string()
        .trim()
        .min(1, { message: "Item name is required." })
        .max(200, { message: "Item name can only be 200 letters long." }),
    price: z.number().nonnegative(),
    description: z
        .string()
        .trim()
        .max(500, { message: "Description can only be 500 letters long." }),
    tags: z.array(PostTagsEnum),
    imageUrl: z.string().url(),
    blurHash: z.string().min(1),
    miner: BidSchema.nullable(),
    confirmedBidder: BidSchema.nullable(),
    isSold: z.boolean(),
    dateCreated: z.string().datetime(),
    dateUpdated: z.string().datetime(),
    isDeleted: z.boolean(),
});
export type ItemType = z.infer<typeof ItemSchema>;

/*
This looks like:
{
    index: number,
    name: string,
    price: number,
    description: string,
}
*/
export const ItemFormSchema = ItemSchema.omit({
    id: true,
    postId: true,
    sellerId: true,
    sellerData: true,
    price: true,
    tags: true,
    imageUrl: true,
    blurHash: true,
    miner: true,
    confirmedBidder: true,
    isSold: true,
    dateCreated: true,
    dateUpdated: true,
    isDeleted: true,
}).extend({
    price: z.coerce.number().nonnegative(),
});
export type ItemFormType = z.infer<typeof ItemFormSchema>;

export const DeleteItemRequestSchema = z.object({
    itemId: z.string().min(1),
});
export type DeleteItemRequestType = z.infer<typeof DeleteItemRequestSchema>;

export const EditItemRequestSchema = ItemFormSchema.extend({
    id: z.string().min(1),
    imageUrl: z.string().url(),
}).omit({ index: true });
export type EditItemRequestType = z.infer<typeof EditItemRequestSchema>;
