import { genalateRandomFileName } from "./common";
import { app } from "../firebase/index";
import {
  getFirestore,
  doc,
  addDoc,
  Timestamp,
  getDoc,
  DocumentData,
  updateDoc,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const productList = () => {};

export const product = () => {};

export const productAdd = () => {
  const db = getFirestore(app);
  const storage = getStorage(app);
};

export const productEdit = () => {
  const db = getFirestore(app);
  const storage = getStorage(app);
};
