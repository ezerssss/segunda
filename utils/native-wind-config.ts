import { Input, Button, Text, Divider } from "@ui-kitten/components";
import { Image } from "expo-image";
import { cssInterop } from "nativewind";

// ui-kitten
cssInterop(Input, {
    className: {
        target: "style",
    },
    textClassName: "textStyle",
});
cssInterop(Button, { className: "style" });
cssInterop(Text, { className: "style" });
cssInterop(Divider, { className: "style" });

// expo-image
cssInterop(Image, { className: "style" });
