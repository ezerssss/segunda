import { getFirestore } from "@react-native-firebase/firestore";
import app from ".";

export const db = getFirestore(app);
