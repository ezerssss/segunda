import { getFunctions, httpsCallable } from "firebase/functions";
import app from ".";

const functions = getFunctions(app, "asia-southeast1");

export const testOnCall = httpsCallable<never, never>(functions, "testOnCall");
