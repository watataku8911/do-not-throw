import { genalateRandomFileName } from "./common";
import { app } from "../firebase/index";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  User,
  UserCredential,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  setDoc,
  Timestamp,
  getDoc,
  DocumentData,
  updateDoc,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const signUp = async (
  username: string,
  email: string,
  postcode: number,
  address: string,
  fileList: BlobPart[] | null,
  passwd: string
): Promise<void> => {
  const auth = getAuth(app);
  const db = getFirestore(app);
  const storage = getStorage(app);

  await createUserWithEmailAndPassword(auth, email, passwd).then(
    (result: UserCredential) => {
      const user = result.user;
      if (user) {
        const uid = user.uid;
        const timestamp = Timestamp.now();
        let photoURL =
          "https://firebasestorage.googleapis.com/v0/b/dont-throw.appspot.com/o/users%2Fno-profile.png?alt=media&token=dfb7e066-aebb-446a-857f-50ab55cf4887";
        if (fileList != null) {
          const blob = new Blob(fileList, { type: "image/png" });
          const fileName = genalateRandomFileName();

          const storageRef = ref(storage, "users/" + fileName);

          uploadBytes(storageRef, blob)
            .then((snapshot) => {
              if (snapshot) {
                getDownloadURL(storageRef)
                  .then((url) => (photoURL = url))
                  .catch(() => {
                    throw new Error(
                      "アップロード先のURLが取得できませんでした。"
                    );
                  });
              }
            })
            .catch(() => {
              throw new Error("画像がアップロードできませんでした。");
            });
        }

        const data = {
          created_at: timestamp,
          email: email,
          uid: uid,
          updated_at: timestamp,
          userName: username,
          photoURL: photoURL,
          postcode: postcode,
          address: address,
        };

        setDoc(doc(db, "users", uid), data)
          .then(() => {
            return uid;
          })
          .catch(() => {
            throw new Error("AutenticationはOKだがFirestoreできませんでした。");
          });
      }
    }
  );
};

export const signIn = (
  email: string,
  passwd: string
): Promise<string | null> => {
  const auth = getAuth(app);
  return new Promise((resolve, reject) => {
    signInWithEmailAndPassword(auth, email, passwd)
      .then((result) => {
        resolve(result.user.uid);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const getUserData = (uid: string): Promise<DocumentData | null> => {
  const db = getFirestore(app);
  return new Promise((resolve, reject) => {
    getDoc(doc(db, "users", uid))
      .then((doc) => {
        const userDoc = doc.data();

        resolve(userDoc);
      })
      .catch(() => reject(null));
  });
};

export const logOut = (): Promise<string | null> => {
  const auth = getAuth(app);
  return new Promise((resolve, reject) => {
    signOut(auth)
      .then(() => {
        resolve("サインアウトです。");
      })
      .catch(() => reject(null));
  });
};

export const listenAuthState = (): boolean => {
  let flg = false;
  const auth = getAuth(app);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      flg = true;
    } else {
      flg = false;
    }
  });

  return flg;
};

export const updateUserData = (
  userName: string,
  postcode: number,
  address: string,
  photoURL: string,
  fileList: BlobPart[] | null,
  uid: string
): Promise<string | null> => {
  return new Promise((resolve, reject) => {
    const db = getFirestore(app);
    const storage = getStorage(app);
    if (fileList != null) {
      const blob = new Blob(fileList, { type: "image/png" });
      const fileName = genalateRandomFileName();

      const storageRef = ref(storage, "users/" + fileName);

      uploadBytes(storageRef, blob)
        .then((snapshot) => {
          if (snapshot) {
            getDownloadURL(storageRef)
              .then((url) => (photoURL = url))
              .catch(() => {
                throw new Error("アップロード先のURLが取得できませんでした。");
              });
          }
        })
        .catch(() => {
          throw new Error("画像がアップロードできませんでした。");
        });
    }

    const data = {
      userName: userName,
      postcode: postcode,
      address: address,
      photoURL: photoURL,
    };

    updateDoc(doc(db, "users", uid), data)
      .then(() => {
        resolve("ユーザー情報をアップデートしました。");
      })
      .catch(() => reject(null));
  });
};

export const resetPasswd = () => {};
