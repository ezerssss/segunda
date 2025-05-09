import { Text } from "@ui-kitten/components";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native";

interface PropsInterface {
    text: string;
    color?: string;
    isItemCard?: boolean;
}
export function TruncatedText(props: PropsInterface) {
    const { text, color = "black", isItemCard = true } = props;
    const [isExpanded, setIsExpanded] = useState(false);
    const [numLines, setNumLines] = useState(0);

    function toggleExpanded() {
        setIsExpanded(!isExpanded);
    }

    function handleTextLayout(event: any) {
        setNumLines(event.nativeEvent.lines.length);
    }

    const seeMoreColor = color === "black" ? "zinc-50" : "white";

    return (
        <>
            <Text
                className={`text-${color}`}
                onTextLayout={handleTextLayout}
                numberOfLines={isExpanded ? undefined : 2}
                ellipsizeMode="clip"
                category={isItemCard ? "c1" : "s1"}
            >
                {text}
            </Text>
            {!isExpanded && numLines > 1 && (
                <TouchableOpacity onPress={toggleExpanded}>
                    <Text
                        className={`text-${seeMoreColor}`}
                        category={isItemCard ? "c1" : "s1"}
                    >
                        ...See More
                    </Text>
                </TouchableOpacity>
            )}
        </>
    );
}
