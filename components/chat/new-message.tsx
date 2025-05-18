import { Input, Icon, useTheme } from "@ui-kitten/components";
import { useState } from "react";
import { ActivityIndicator, TouchableOpacity, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { SendMessageRequestType } from "@/types/chat";
import useUploadImage from "@/hooks/useUploadImage";
import { MESSAGE_IMAGES_FOLDER } from "@/constants/storage";
import { sendMessage } from "@/firebase/functions";

interface PropsInterface {
    chatId: string;
}

export default function NewMessage(props: PropsInterface) {
    const { chatId } = props;
    const [message, setMessage] = useState("");
    const [isSending, setIsSending] = useState(false);
    const hasValidMessage = message.trim().length > 0;
    const theme = useTheme();
    const { uploadImages } = useUploadImage();

    async function handleSendMessage(imageUri?: string) {
        if (isSending || (!message.trim() && !imageUri)) {
            return;
        }

        try {
            setIsSending(true);
            let imageUrl: string | null = null;
            if (imageUri) {
                imageUrl = (
                    await uploadImages([imageUri], MESSAGE_IMAGES_FOLDER)
                )[0];
            }

            const messageRequest: SendMessageRequestType = {
                chatId,
                message,
                imageUrl,
            };

            await sendMessage(messageRequest);
            setMessage("");
        } catch (error) {
            console.error(error);
        } finally {
            setIsSending(false);
        }
    }

    async function openImageLibrary() {
        try {
            let res = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ["images"],
                allowsMultipleSelection: false,
                aspect: [9, 16],
                quality: 1,
            });

            if (!res.canceled) {
                handleSendMessage(res.assets[0].uri);
            }
        } catch (error) {
            console.error(error);
        }
    }

    async function openCamera() {
        try {
            let res = await ImagePicker.launchCameraAsync({
                mediaTypes: ["images"],
                aspect: [9, 16],
                quality: 1,
            });

            if (!res.canceled) {
                handleSendMessage(res.assets[0].uri);
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <View className="flex-row items-center gap-2 py-3">
            <TouchableOpacity onPress={openCamera}>
                <Icon
                    name="camera"
                    width={30}
                    height={30}
                    fill={theme["color-primary-500"]}
                />
            </TouchableOpacity>
            <TouchableOpacity onPress={openImageLibrary}>
                <Icon
                    name="image-2"
                    width={30}
                    height={30}
                    fill={theme["color-primary-500"]}
                />
            </TouchableOpacity>
            <Input
                multiline
                placeholder="Message"
                className="flex-1 rounded-3xl"
                textClassName="px-3"
                value={message}
                onChangeText={setMessage}
                disabled={isSending}
                editable={!isSending}
            />
            <TouchableOpacity
                disabled={!hasValidMessage || isSending}
                onPress={() => handleSendMessage()}
            >
                {isSending ? (
                    <ActivityIndicator />
                ) : (
                    <Icon
                        name="navigation-2"
                        width={30}
                        height={30}
                        fill={
                            hasValidMessage && !isSending
                                ? theme["color-primary-500"]
                                : "gray"
                        }
                    />
                )}
            </TouchableOpacity>
        </View>
    );
}
