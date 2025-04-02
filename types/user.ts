import { z } from "zod";

export const UserDataSchema = z.object({
    uid: z.string().min(1),
    name: z.string().min(1),
    email: z.string().email(),
    dateCreated: z.string().datetime(),
});
export const UserDataType = UserDataSchema._type;
