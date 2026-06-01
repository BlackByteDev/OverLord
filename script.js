import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import {
  getFirestore,
  addDoc,
  collection,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

/* ?? SENÝN FIREBASE */
const firebaseConfig = {
  apiKey: "AIzaSyAf4THGKIZY_I7FIUEo92d1-MfinULWuk8",
  authDomain: "overlord-4dd84.firebaseapp.com",
  projectId: "overlord-4dd84",
  storageBucket: "overlord-4dd84.firebasestorage.app",
  messagingSenderId: "311721762866",
  appId: "1:311721762866:web:b7cbfdf546bc61c8dcdc2b"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

let currentUser = "";

/* REGISTER */
window.register = () => {
  createUserWithEmailAndPassword(auth, email.value, pass.value);
};

/* LOGIN */
window.login = () => {
  signInWithEmailAndPassword(auth, email.value, pass.value);
};

/* USER */
onAuthStateChanged(auth, (user)=>{
  if(user){
    currentUser = user.email;
    user.innerText = "Giriþ: " + currentUser;
  }
});

/* POST EKLE */
window.addPost = async () => {
  await addDoc(collection(db, "posts"), {
    title: title.value,
    text: text.value,
    user: currentUser
  });
};

/* CANLI FORUM */
onSnapshot(collection(db, "posts"), (snap)=>{
  posts.innerHTML = "";

  snap.forEach(doc=>{
    let d = doc.data();

    let div = document.createElement("div");
    div.className = "post";
    div.innerHTML = `
      <b>${d.title}</b><br>
      ${d.text}<br>
      <small>${d.user}</small>
    `;

    posts.appendChild(div);
  });
});