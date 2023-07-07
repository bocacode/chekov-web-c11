import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { initializeApp } from 'firebase/app'
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth'
import { AuthContext } from '../../App'
import Button from '../login/Button'

const firebaseConfig = {
  apiKey: 'AIzaSyCTs4n4nu-yUh7hmUhpLqLPjjgqZ-sK2nA',
  authDomain: 'chekov-c11.firebaseapp.com',
  projectId: 'chekov-c11',
  storageBucket: 'chekov-c11.appspot.com',
  messagingSenderId: '603639104843',
  appId: '1:603639104843:web:dc267f9c827fe83e8b14ce',
}
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

export default function SignUpForm() {
  const { setUser } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleGoogle = () => {
    const provider = new GoogleAuthProvider()
    signInWithPopup(auth, provider)
      .then(response => {
        setUser(response.user)
        navigate('/')
      })
      .catch(err => alert(err.message))
  }

  const handleSignUp = e => {
    e.preventDefault()
    const email = e.target.email.value
    const password = e.target.password.value
    createUserWithEmailAndPassword(auth, email, password)
      .then(response => {
        setUser(response.user)
        navigate('/')
      })
      .catch(err => alert(err.message))
  }

  return (
    <section className='bg-violet-950 p-6 rounded-lg max-w-[420px] w-full mx-auto shadow'>
      <form
        onSubmit={handleSignUp}
        className='flex flex-col items-start justify-around min-h-[30vh]'>
        <label htmlFor='email' className='flex justify-between w-full'>
          Email
          <input
            type='email'
            name='email'
            className='rounded-lg border-transparent border
          border-violet-500 py-2 px-4 bg-zinc-50 text-zinc-700 placeholder-zinc-400
          text-base focus:ring-2 focus:ring-violet-600 focus:border-transparent'
          />
        </label>
        <br />
        <label htmlFor='password' className='flex justify-between w-full'>
          Password
          <input
            type='password'
            name='password'
            className='rounded-lg border-transparent border
          border-violet-500 py-2 px-4 bg-zinc-50 text-zinc-700 placeholder-zinc-400
          text-base focus:ring-2 focus:ring-violet-600 focus:border-transparent'
          />
        </label>
        <br />
        <input
          type='submit'
          value='Sign Up'
          className='bg-green-300 text-violet-950 py-2 px-8
          rounded-lg shadow-lg transition duration-300 hover:bg-violet-300 hover:shadow-sm
          cursor-pointer w-full'
        />
      </form>
      <Button
        action={handleGoogle}
        wfull={false}
        text='Signup with Google'
        bgColor='bg-sky-300'
        textColor='text-violet-950'
        className='mt-4'
      />
    </section>
  )
}
