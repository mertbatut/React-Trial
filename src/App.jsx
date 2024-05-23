import { useState } from 'react'
import LoginForm from './FormValidation/FormValid'
import GoogleAut from './FormValidation/GoogleSignin'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <LoginForm/>
    <GoogleAut/>
    </>
  )
}

export default App
