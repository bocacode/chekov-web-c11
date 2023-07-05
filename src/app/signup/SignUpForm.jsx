import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { AuthContext } from "../../App";

const firebaseConfig = {
  apiKey: "AIzaSyCTs4n4nu-yUh7hmUhpLqLPjjgqZ-sK2nA",
  authDomain: "chekov-c11.firebaseapp.com",
  projectId: "chekov-c11",
  storageBucket: "chekov-c11.appspot.com",
  messagingSenderId: "603639104843",
  appId: "1:603639104843:web:dc267f9c827fe83e8b14ce"
};

export default function SignUpForm() {

  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    createUserWithEmailAndPassword(auth, email, password)
      .then(response => {
        setUser(response.user);
        navigate("/");
      })
      .catch(err => alert(err.message))
  }

  return (
    <form onSubmit={handleSignUp}>
      <label htmlFor="email">
        Email
        <input type="email" name="email" />
      </label>
      <br />
      <label htmlFor="password">
        Password
        <input type="password" name="password" />
      </label>
      <br />
      <input type="submit" value="Sign Up" />
    </form>
  )
}