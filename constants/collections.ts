import { CollectionEnum } from "@/enums/collection";
import { db } from "@/firebase/db";
import { collection } from "@react-native-firebase/firestore";

export const usersCollectionRef = collection(db, CollectionEnum.USERS);
export const postsCollectionRef = collection(db, CollectionEnum.POSTS);
export const itemsCollectionRef = collection(db, CollectionEnum.ITEMS);
export const biddersCollectionRef = collection(db, CollectionEnum.BIDDERS);
