import firebase from "firebase/compat/app";
import "firebase/compat/storage";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDXyAm_nmFy8TdE26UIScSK40zxvvwzQ24",
  authDomain: "fir-adopt-pet.firebaseapp.com",
  projectId: "fir-adopt-pet",
  storageBucket: "fir-adopt-pet.appspot.com",
  messagingSenderId: "126333126255",
  appId: "1:126333126255:web:400d32a57b08405655ef9a",
  measurementId: "G-6M6KGBLJM0",
};
firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();

export { storage };

/*const handleUpload = (image) => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    return uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            setUrl(url);
            return url;
          });
      }
    );
  };*/
