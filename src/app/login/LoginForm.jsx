import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword,
    GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { AuthContext } from "../../App";

const firebaseConfig = {
  apiKey: "AIzaSyCTs4n4nu-yUh7hmUhpLqLPjjgqZ-sK2nA",
  authDomain: "chekov-c11.firebaseapp.com",
  projectId: "chekov-c11",
  storageBucket: "chekov-c11.appspot.com",
  messagingSenderId: "603639104843",
  appId: "1:603639104843:web:dc267f9c827fe83e8b14ce"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default function LoginForm() {

  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then(response => {
        setUser(response.user);
        navigate("/");
      })
      .catch(err => alert(err.message));
  }

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    signInWithEmailAndPassword(auth, email, password)
      .then(response => {
        setUser(response.user);
        navigate("/");
      })
      .catch(err => alert(err.message));
  }

  return (
    <main>
      <form onSubmit={handleLogin}>
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
        <input type="submit" value="Login" />
      </form>
      <button onClick={handleGoogle}>Login with Google</button>
    </main>
  )
}