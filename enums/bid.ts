import { z } from "zod";

export const BidTypeEnum = z.enum(["Mine", "Steal"]);
