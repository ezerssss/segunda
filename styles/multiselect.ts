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
        backgroundColor: "#ffffff",
        borderRadius: 4,
    },
    hashtagChip: {
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 20,
        paddingHorizontal: 12,
        paddingVertical: 6,
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
        fontSize: 18,
    },
});

export default multiSelectStyle;
