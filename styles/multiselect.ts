import { StyleSheet } from "react-native";

const multiSelectStyle = StyleSheet.create({
    dropdown: {
        backgroundColor: "white",
        borderRadius: 4,
        paddingVertical: 12,
        paddingHorizontal: 0,
        marginTop: 4,
    },
    dropdownContainer: {
        backgroundColor: "white",
        borderRadius: 4,
    },
    hashtagChip: {
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 20,
        paddingHorizontal: 12,
        paddingVertical: 4,
        marginRight: 8,
        marginTop: 8,
    },
    hashtagText: {
        color: "white",
        fontWeight: "500",
        marginRight: 6,
    },
    hashtagClose: {
        color: "white",
    },
});

export default multiSelectStyle;
