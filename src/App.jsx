import { useState } from 'react'
import LoginForm from './FormValidation/FormValid'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <LoginForm/>
    </>
  )
}

export default App
