import { initializeApp } from "firebase/app";
import { createApp } from "vue";

import DisplayData from "../Basic/DisplayData.vue";

const firebaseConfig = {
  apiKey: "AIzaSyCfcJOWB2uHmVDcoxyZj1aIf0PuGa5pZCQ",
  authDomain: "react-admin-demo-69c8b.firebaseapp.com",
  projectId: "react-admin-demo-69c8b",
  storageBucket: "react-admin-demo-69c8b.appspot.com",
  messagingSenderId: "537365635427",
  appId: "1:537365635427:web:6442a7e563a90f526ab356",
};

initializeApp(firebaseConfig);
const app = createApp(DisplayData);

app.mount("#app");
