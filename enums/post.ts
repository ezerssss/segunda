import { z } from "zod";

export const PostTagsEnum = z.enum([
    "Clothes",
    "Shoes",
    "Bags",
    "Gadgets",
    "Beauty",
    "Home",
    "Food",
    "School",
    "Affordable",
    "Luxury",
    "FixedPrice",
]);
