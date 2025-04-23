import app from "@/firebase/index";

import {
    getStorage,
    ref,
    getDownloadURL,
} from "@react-native-firebase/storage";
import uuid from "react-native-uuid";
import { useContext } from "react";
import { UserContext } from "@/contexts/userContext";

export function useUploadImage() {
    const { user } = useContext(UserContext);

    async function uploadImage(uri: string): Promise<string> {
        if (!user) throw new Error("User not authenticated");

        try {
            const storage = getStorage(app);
            const fileName = `${uuid.v4()}`;
            const path = `users/${user.uid}/${fileName}`;
            const reference = ref(storage, path);

            await reference.putFile(uri);

            const url = await getDownloadURL(reference);
            console.log("Uploaded successfully!");

            return url;
        } catch (err) {
            console.error("Upload failed:", err);
            throw err;
        }
    }

    return { uploadImage };
}

export default useUploadImage;
