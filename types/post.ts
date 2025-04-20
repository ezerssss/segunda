import { MAX_CAPTION_LENGTH } from "../constants/post";
import { z } from "zod";
import { PostTagsEnum } from "../enums/post";
import { ItemFormSchema } from "./item";

export const PostSchema = z.object({
    id: z.string().min(1),
    userId: z.string().min(1),
    caption: z
        .string()
        .trim()
        .min(1, { message: "Caption is required." })
        .max(MAX_CAPTION_LENGTH, {
            message: "Caption can only be 500 letters long.",
        }),
    tags: z.array(PostTagsEnum),
    imageUrls: z.array(z.string().url()),
    dateCreated: z.string().datetime(),
    dateUpdated: z.string().datetime(),
    isDeleted: z.boolean(),
});
export type PostType = z.infer<typeof PostSchema>;

/*
This looks like:
{
    caption: string,
    tags: PostTagsEnum[],
    items: {
        index: number,
        name: string,
        price: number,
        description: string,
        // No image url because the image is not uploaded in Firebase storage yet.
    }[]
}
*/
export const PostFormSchema = PostSchema.omit({
    id: true,
    userId: true,
    imageUrls: true,
    dateCreated: true,
    dateUpdated: true,
    isDeleted: true,
}).extend({
    items: z
        .array(ItemFormSchema)
        .min(1, { message: "There should be at least 1 item in a post." }),
});
export type PostFormType = z.infer<typeof PostFormSchema>;

/*
This is the actual data we will pass to the endpoint.
The only difference is that the items now have imageUrls in them because we have already uploaded it in Firebase storage.

This looks like:
{
    caption: string,
    tags: PostTagsEnum[],
    items: {
        index: number,
        name: string,
        price: number,
        description: string,
        imageUrl: string
    }[]
}
*/
export const PostRequestSchema = PostFormSchema.omit({ items: true }).extend({
    items: z
        .array(ItemFormSchema.extend({ imageUrl: z.string().url() }))
        .min(1, { message: "There should be at least 1 item in a post." }),
});
export type PostRequestType = z.infer<typeof PostRequestSchema>;
