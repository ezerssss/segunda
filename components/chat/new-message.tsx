import { Input, Icon, useTheme } from "@ui-kitten/components";
import { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import * as ImagePicker from "expo-image-picker";

export default function NewMessage() {
    const [message, setMessage] = useState("");
    const hasValidMessage = message.trim().length > 0;
    const theme = useTheme();

    async function openImageLibrary() {
        try {
            let res = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ["images"],
                allowsMultipleSelection: false,
                aspect: [9, 16],
                quality: 1,
            });

            if (!res.canceled) {
                console.log(res.assets[0].uri);
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
                console.log(res.assets[0].uri);
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
                    fill={hasValidMessage ? theme["color-primary-500"] : "gray"}
                />
            </TouchableOpacity>
            <TouchableOpacity onPress={openImageLibrary}>
                <Icon
                    name="image-2"
                    width={30}
                    height={30}
                    fill={hasValidMessage ? theme["color-primary-500"] : "gray"}
                />
            </TouchableOpacity>
            <Input
                multiline
                placeholder="Message"
                className="flex-1 rounded-3xl"
                textClassName="px-3"
                value={message}
                onChangeText={setMessage}
            />
            <TouchableOpacity disabled={!hasValidMessage}>
                <Icon
                    name="navigation-2"
                    width={30}
                    height={30}
                    fill={hasValidMessage ? theme["color-primary-500"] : "gray"}
                />
            </TouchableOpacity>
        </View>
    );
}
