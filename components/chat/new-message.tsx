import { Input, Icon, useTheme } from "@ui-kitten/components";
import { useState } from "react";
import { TouchableOpacity, View } from "react-native";

export default function NewMessage() {
    const [message, setMessage] = useState("");
    const hasValidMessage = message.trim().length > 0;
    const theme = useTheme();

    return (
        <View className="flex-row items-center gap-2 py-3">
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
                    name="navigation-2-outline"
                    width={30}
                    height={30}
                    fill={hasValidMessage ? theme["color-primary-500"] : "gray"}
                />
            </TouchableOpacity>
        </View>
    );
}
