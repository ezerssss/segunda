import { CampusEnum } from "@/enums/campus";
import { z } from "zod";

export const UserDataSchema = z.object({
    id: z.string().min(1),
    email: z.string().email(),
    name: z
        .string()
        .trim()
        .min(1, { message: "Name is required" })
        .max(100, { message: "Name can only be 100 letters long." }),
    imageUrl: z.string().url().nullable(),
    campus: CampusEnum,
    dateCreated: z.string().datetime(),
    dateUpdated: z.string().datetime(),
});
export type UserDataType = z.infer<typeof UserDataSchema>;
