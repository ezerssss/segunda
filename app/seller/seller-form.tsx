import {
    View,
    Text,
    TextInput,
    Button,
    TouchableOpacity,
    Image,
} from "react-native";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";

const SellerFormPage = () => {
    const [image, setImage] = useState<string | null>(null);

    const openImageLibrary = async () => {
        try {
            let res = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ["images", "videos"],
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });
            console.log(res);

            if (!res.canceled) {
                setImage(res.assets[0].uri);
            }
        } catch (e) {
            console.log("Error: ", e);
        }
    };

    return (
        <View className=" ">
            <View className="">
                <Text aria-label="label" className="font-bold">
                    What's this item?
                </Text>
                <View className="mt-2">
                    <TextInput
                        className="w-full rounded-md bg-gray-300 px-3 py-1.5 text-base text-gray-900"
                        placeholder="say something"
                        multiline={true}
                    ></TextInput>
                </View>
            </View>
            <View className="mt-2">
                <Text aria-label="label" className="font-bold">
                    Item Price
                </Text>
                <View className="mt-2">
                    <TextInput
                        className="w-full rounded-md bg-gray-300 px-3 py-1.5 text-base text-gray-900"
                        placeholder="enter price"
                        keyboardType="numeric"
                    ></TextInput>
                </View>
            </View>

            <View className="mt-4">
                <TouchableOpacity
                    className="self-baseline rounded border px-4 py-2"
                    onPress={openImageLibrary}
                >
                    <Text>Open Image Library</Text>
                    {image && (
                        <Image
                            source={{ uri: image }}
                            className="h-10 w-10 flex-1 items-center justify-center"
                        />
                    )}
                </TouchableOpacity>
            </View>

            <View className="mt-4">
                <Button
                    title="Submit"
                    onPress={() => console.log("test")}
                ></Button>
            </View>
        </View>
    );
};

export default SellerFormPage;
