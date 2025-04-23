import { z } from "zod";
import { BidderSchema } from "./bidder";

export const ItemSchema = z.object({
    id: z.string().min(1),
    userId: z.string().min(1),
    postId: z.string().min(1),
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
    imageUrl: z.string().url(),
    miner: BidderSchema.nullable(),
    confirmedBidder: BidderSchema.nullable(),
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
    userId: true,
    postId: true,
    price: true,
    imageUrl: true,
    miner: true,
    confirmedBidder: true,
    dateCreated: true,
    dateUpdated: true,
    isDeleted: true,
}).extend({
    price: z.coerce.number().min(1, "Price must be greater than 0."),
    imageUrl: z
        .string()
        .refine((val) => val === "" || /^https?:\/\/\S+$/.test(val), {
            message: "Image must be a valid URL",
        }),
});
export type ItemFormType = z.infer<typeof ItemFormSchema>;
