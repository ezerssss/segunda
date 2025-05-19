import { Button, Text } from "@ui-kitten/components";
import React from "react";
import Modal from "react-native-modal";
import { View } from "react-native";

interface PropsInterface {
    isVisible: boolean;
    setIsVisible: (val: boolean) => void;
    icon: React.ReactNode;
    title: string;
    body: string;
    confirmButtonText?: string;
    showConfirmButton?: boolean;
    onConfirm?: (() => void) | (() => Promise<void>);
    cancelButtonText?: string;
    showCancelButton?: boolean;
    onCancel?: (() => void) | (() => Promise<void>);
    isButtonsDisabled?: boolean;
    isDanger?: boolean;
}

export default function ConfirmCancelModal(props: PropsInterface) {
    const {
        isVisible,
        setIsVisible,
        icon,
        title,
        body,
        confirmButtonText = "Confirm",
        showConfirmButton = true,
        onConfirm,
        cancelButtonText = "Cancel",
        showCancelButton = true,
        onCancel,
        isButtonsDisabled = false,
        isDanger = false,
    } = props;

    async function handleConfirm() {
        if (onConfirm) {
            await onConfirm();
        }
        setIsVisible(false);
    }

    async function handleCancel() {
        if (onCancel) {
            await onCancel();
        }
        setIsVisible(false);
    }

    return (
        <Modal
            isVisible={isVisible}
            onBackdropPress={() => setIsVisible(false)}
            onBackButtonPress={() => setIsVisible(false)}
            animationIn="fadeIn"
            animationOut="fadeOut"
            useNativeDriver={false}
            backdropTransitionOutTiming={1}
            backdropOpacity={0.5}
            className="items-center justify-center"
        >
            <View className="w-[90%] max-w-[500px] items-center justify-center rounded-3xl bg-white p-4">
                {icon}
                <Text category="h5" className="mt-2 text-center">
                    {title}
                </Text>
                <Text category="p2" className="mb-1 text-center">
                    {body}
                </Text>

                <View className="mb-2 mt-4 flex-row gap-2">
                    {showConfirmButton && (
                        <Button
                            status={isDanger ? "danger" : "primary"}
                            appearance="filled"
                            disabled={isButtonsDisabled}
                            onPress={handleConfirm}
                        >
                            {confirmButtonText}
                        </Button>
                    )}
                    {showCancelButton && (
                        <Button
                            status="basic"
                            appearance="outline"
                            disabled={isButtonsDisabled}
                            onPress={handleCancel}
                        >
                            {cancelButtonText}
                        </Button>
                    )}
                </View>
            </View>
        </Modal>
    );
}
