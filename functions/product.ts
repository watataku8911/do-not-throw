import { genalateRandomFileName } from "./common";
import { app } from "../firebase/index";
import {
  getFirestore,
  collection,
  addDoc,
  Timestamp,
  getDoc,
  DocumentData,
  updateDoc,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const productList = () => {};

export const product = () => {};

export const productAdd = (
  fileList: Array<BlobPart[]> | null,
  product_name: string,
  product_body: string,
  price: number,
  uid: string
) => {
  const db = getFirestore(app);
  const storage = getStorage(app);

  const timestamp = Timestamp.now();

  let photoURL = [];
  if (fileList != null) {
    fileList.forEach((file) => {
      const blob = new Blob(file, { type: "image/png" });
      const fileName = genalateRandomFileName();

      const storageRef = ref(storage, "product/" + fileName);

      uploadBytes(storageRef, blob)
        .then((snapshot) => {
          if (snapshot) {
            getDownloadURL(storageRef)
              .then((url) => {
                photoURL.push(url);
              })
              .catch(() => {
                throw new Error("アップロード先のURLが取得できませんでした。");
              });
          }
        })
        .catch(() => {
          throw new Error("画像がアップロードできませんでした。");
        });
    });
  }

  //photoURL 初期値
  //photoURL.push("")

  const data = {
    created_at: timestamp,
    updated_at: timestamp,
    productImage: photoURL,
    productName: product_name,
    productBody: product_body,
    price: price,
    uid: uid,
  };

  addDoc(collection(db, "products"), data)
    .then(() => {
      const router = useRouter();
      router.push("/mypage/" + uid);
    })
    .catch(() => {
      throw new Error("出品せきませんでした。");
    });
};

export const productEdit = () => {
  const db = getFirestore(app);
  const storage = getStorage(app);
};
