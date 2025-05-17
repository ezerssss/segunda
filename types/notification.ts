import { z } from "zod";

export const NotificationSchema = z.object({
    id: z.string().min(1),
    receiverId: z.string().min(1),
    title: z.string().min(1),
    body: z.string().min(1),
    imageUrl: z.string().url().nullable(),
    isReceived: z.boolean(),
    dateCreated: z.string().datetime(),
});
export type NotificationType = z.infer<typeof NotificationSchema>;

export const ReceiveNotificationRequestSchema = z.object({
    notificationId: z.string().min(1),
});
export type ReceiveNotificationType = z.infer<
    typeof ReceiveNotificationRequestSchema
>;
