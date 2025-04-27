import app from "@/firebase/index";

import {
    getStorage,
    ref,
    getDownloadURL,
} from "@react-native-firebase/storage";
import uuid from "react-native-uuid";
import { useContext, useState } from "react";
import { UserContext } from "@/contexts/userContext";

export function useUploadImage() {
    const { user } = useContext(UserContext);
    const [progress, setProgress] = useState(0);

    async function uploadImages(imageUris: string[]): Promise<string[]> {
        if (!user) throw new Error("User not authenticated");

        const storage = getStorage(app);
        const progresses = Array(imageUris.length).fill(0);

        const uploadPromises = imageUris.map(async (uri, index) => {
            try {
                const fileName = `${uuid.v4()}`;
                const path = `users/${user.uid}/itemImages/${fileName}`;
                const reference = ref(storage, path);

                const uploadTask = reference.putFile(uri);

                uploadTask.on("state_changed", (taskSnapshot) => {
                    const indivProgress =
                        taskSnapshot.bytesTransferred / taskSnapshot.totalBytes;
                    progresses[index] = indivProgress;
                    const totalProgress =
                        progresses.reduce((acc, p) => acc + p, 0) /
                        progresses.length;
                    setProgress(totalProgress);
                });

                await uploadTask;
                const url = await getDownloadURL(reference);

                return url;
            } catch (err) {
                console.error("Upload failed:", err);
                throw err;
            }
        });

        try {
            const downloadUrls = await Promise.all(uploadPromises);
            return downloadUrls;
        } catch (err) {
            console.error("Upload failed:", err);
            throw err;
        }
    }

    return { uploadImages, progress };
}

export default useUploadImage;
