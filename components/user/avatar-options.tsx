import { Button, MenuItem, OverflowMenu } from "@ui-kitten/components";
import Feather from "@expo/vector-icons/Feather";
import { useState } from "react";

import { Text } from "react-native";

interface AvatarOptionProps {
    openImageLibrary: () => Promise<void>;
    openCamera: () => Promise<void>;
    handleRemovePhoto: () => void;
    isLoading: boolean;
}

function AvatarOptions(props: Readonly<AvatarOptionProps>) {
    const [visible, setVisible] = useState(false);
    const { openCamera, openImageLibrary, handleRemovePhoto, isLoading } =
        props;
    function toggleOptionsButton() {
        return (
            <Button
                onPress={handleSetVisible}
                disabled={isLoading}
                status="basic"
                style={{ paddingHorizontal: 0, paddingVertical: 0 }}
            >
                <Text>
                    <Feather name="edit" size={16} color="black" /> Edit
                </Text>
            </Button>
        );
    }

    function handleSetInvisible() {
        setVisible(false);
    }

    function handleSetVisible() {
        setVisible(true);
    }

    function handleOptionPress(handleOption: Function) {
        handleOption();
        handleSetInvisible();
    }
    return (
        !isLoading && (
            <OverflowMenu
                visible={visible}
                anchor={toggleOptionsButton}
                onBackdropPress={handleSetInvisible}
            >
                <MenuItem
                    title="Upload new photo"
                    onPress={() => handleOptionPress(openImageLibrary)}
                />
                <MenuItem
                    title="Take a photo"
                    onPress={() => handleOptionPress(openCamera)}
                />
                <MenuItem
                    title="Remove photo"
                    onPress={() => handleOptionPress(handleRemovePhoto)}
                />
            </OverflowMenu>
        )
    );
}
export default AvatarOptions;
