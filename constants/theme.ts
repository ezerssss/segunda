import { DefaultTheme, Theme } from "@react-navigation/native";

export const SegundaTheme: Theme = {
    dark: false,
    colors: {
        // The random rgb is from the default theme, let's adjust them when we need to :)
        primary: "rgb(0, 122, 255)",
        background: "white",
        card: "rgb(255, 255, 255)",
        text: "black",
        border: "rgb(216, 216, 216)",
        notification: "rgb(255, 59, 48)",
    },
    fonts: DefaultTheme.fonts,
};
