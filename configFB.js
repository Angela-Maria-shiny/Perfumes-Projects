// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyByrkOXf53QFaa_CQ9vaB0TXLUcD17blkU",
  authDomain: "perfume-project-8e35b.firebaseapp.com",
  databaseURL: "https://perfume-project-8e35b-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "perfume-project-8e35b",
  storageBucket: "perfume-project-8e35b.appspot.com",
  messagingSenderId: "487332665810",
  appId: "1:487332665810:web:b6d9b123e55c57018ad00b",
  measurementId: "G-5XGLNS4C3Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Handling form submission
document.getElementById('registrationForm').addEventListener('submit', async (event) => {
  event.preventDefault();

  const firstName = document.getElementById("first-name").value;
  const lastName = document.getElementById("last-name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirm-password").value;

  let namePattern = /^[A-Za-z\s]+$/;
  let emailPattern = /^[A-Za-z0-9.\+\*%]+@[A-Za-z0-9.-]+\.[a-zA-Z]{2,}$/;
  let passwordPattern = /^[a-zA-Z0-9@.\+\$\*]{8,}$/;

  if (!namePattern.test(firstName)) {
    alert("First Name is invalid");
  } else if (!namePattern.test(lastName)) {
    alert("Last Name is invalid");
  } else if (!emailPattern.test(email)) {
    alert("Email is invalid");
  } else if (!passwordPattern.test(password)) {
    alert("Password is invalid");
  } else if (confirmPassword !== password) {
    alert("Passwords do not match");
  } else {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Add user information to Firestore
      await setDoc(doc(db, "users", user.uid), {
        firstName: firstName,
        lastName: lastName,
        email: email
      });

      alert('Account created successfully');
      window.location.href = 'perfume.html';
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
    }
  }
});
