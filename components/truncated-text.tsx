import { Text } from "@ui-kitten/components";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native";

interface TruncatedTextInterface {
    text: string;
    maxLength: number;
    onToggleExpanded?: (expanded: boolean) => void;
    color?: string;
}
export function TruncatedText(props: TruncatedTextInterface) {
    const { text, maxLength, onToggleExpanded, color } = props;
    const [expanded, setExpanded] = useState(false);

    const toggleExpanded = () => {
        setExpanded(!expanded);
        onToggleExpanded?.(!expanded);
    };

    const displayedText = expanded ? text : text.slice(0, maxLength);

    const textColor = color ? color : "#65676B";

    return (
        <>
            <Text category="c2" style={{ color: textColor }}>
                {displayedText}
            </Text>
            <TouchableOpacity onPress={toggleExpanded}>
                <Text
                    category="c2"
                    style={{ color: textColor, fontWeight: "bold" }}
                >
                    {expanded ? "See Less" : "...See More"}
                </Text>
            </TouchableOpacity>
        </>
    );
}
