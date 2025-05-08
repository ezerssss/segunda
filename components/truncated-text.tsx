import { Text, useTheme } from "@ui-kitten/components";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native";

interface PropsInterface {
    text: string;
    color?: string;
}
export function TruncatedText(props: PropsInterface) {
    const { text, color } = props;
    const [isExpanded, setIsExpanded] = useState(false);
    const theme = useTheme();

    const toggleExpanded = () => {
        setIsExpanded(!isExpanded);
    };

    const textColor = color ?? theme["color-gray-500"];

    return (
        <>
            <Text
                style={{ color: textColor }}
                numberOfLines={isExpanded ? undefined : 2}
                ellipsizeMode="clip"
            >
                {text}
            </Text>
            <TouchableOpacity onPress={toggleExpanded}>
                <Text style={{ color: textColor, fontWeight: "bold" }}>
                    {isExpanded ? "See Less" : "...See More"}
                </Text>
            </TouchableOpacity>
        </>
    );
}
