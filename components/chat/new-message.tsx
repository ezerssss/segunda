import { Input, Icon } from "@ui-kitten/components";
import { useState } from "react";
import { TouchableOpacity, View } from "react-native";

export default function NewMessage() {
    const [message, setMessage] = useState("");
    const hasValidMessage = message.trim().length > 0;

    return (
        <View className="mb-3 flex-row items-center gap-2">
            <Input
                multiline
                placeholder="Message"
                className="flex-1"
                textClassName="px-3"
                value={message}
                onChangeText={setMessage}
            />
            <TouchableOpacity disabled={!hasValidMessage}>
                <Icon
                    name="navigation-2-outline"
                    width={30}
                    height={30}
                    fill={hasValidMessage ? "blue" : "gray"}
                />
            </TouchableOpacity>
        </View>
    );
}
