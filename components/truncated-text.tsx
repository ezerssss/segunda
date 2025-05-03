import { Text } from "@ui-kitten/components";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native";

interface TruncatedTextInterface {
    text: string;
    maxLength: number;
    onToggleExpanded?: (expanded: boolean) => void;
}
export function TruncatedText(props: TruncatedTextInterface) {
    const { text, maxLength, onToggleExpanded } = props;
    const [expanded, setExpanded] = useState(false);

    const toggleExpanded = () => {
        setExpanded(!expanded);
        onToggleExpanded?.(!expanded);
    };

    const displayedText = expanded ? text : text.slice(0, maxLength);

    return (
        <>
            <Text category="c2" style={{ color: "#65676B" }}>
                {displayedText}
            </Text>
            <TouchableOpacity onPress={toggleExpanded}>
                <Text
                    category="c2"
                    style={{ color: "#65676B", fontWeight: "bold" }}
                >
                    {expanded ? "See Less" : "...See More"}
                </Text>
            </TouchableOpacity>
        </>
    );
}
