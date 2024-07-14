import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { MdEmail, MdLock, MdPerson } from "react-icons/md"
import InputText from "../components/Input/InputText"
// import appConfig from "../config/env"
import { useNavigate } from "react-router-dom"
import AppLogo from "../components/AppLogo"

export default function RegisterPage() {
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')

  // error state
  const [nameError, setNameError] = useState<string>('')
  const [emailError, setEmailError] = useState<string>('')
  const [passwordError, setPasswordError] = useState<string>('')
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>('')

  const navigate = useNavigate()

  function handleName(event: ChangeEvent<HTMLInputElement>) {
    setName(event.target.value)
  }

  function handleEmail(event: ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value)
  }

  function handlePassword(event: ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value)
  }

  function handleConfirmPassword(event: ChangeEvent<HTMLInputElement>) {
    setConfirmPassword(event.target.value)
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!name) setNameError('Nama tidak boleh kosong')
    if (!email) setEmailError('Email tidak boleh kosong')
    if (password.length < 6) setPasswordError('Password minimal 6 karakter')
    if (password !== confirmPassword) setConfirmPasswordError('Password tidak sama')
    if (!name || !email || password.length < 6 || password !== confirmPassword) return

    return navigate('/')

    // try {
    //   const response = await fetch(`${appConfig.apiUrl}/api/auth/login`, {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({ email, password })
    //   }).then(res => {
    //     if (res.ok) return res.json()

    //     throw new Error('Login failed')
    //   })

    //   console.log(response)

    //   return navigate('/dashboard')

    // } catch (error) {
    //   console.error(error)
    // }
  }

  useEffect(() => {

  }, [password, confirmPassword])

  return (
    <main className="relative flex flex-col justify-between min-h-screen mx-auto bg-slate-50">
      <div className="relative flex flex-col justify-between gap-4 px-8 py-4 sm:flex-row">
        <a href="/">
          <AppLogo />
        </a>

        <div className="flex items-center gap-3">
          <span>Already have an account?</span>
          <a className="px-3 py-2 text-blue-500 border border-blue-500 rounded-lg" href="/login">Login</a>
        </div>
      </div>

      <div className="flex items-center justify-center h-full ">
        <div className="relative p-12 rounded-xl w-[32rem] h-fit bg-white border border-slate-100">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Register Account</h1>
            <p>Input your information</p>
          </div>

          <form className="flex flex-col gap-4 mt-6" onSubmit={handleSubmit}>
            <InputText id="name" label="Full Name" placeholder="Full Name" value={name} onChange={handleName} icon={<MdPerson className="w-full h-full" />}
              error={{ value: nameError, setValue: setNameError }}
            />
            <InputText id="email" label="Username" placeholder="Input your username" value={email} onChange={handleEmail} icon={<MdEmail className="w-full h-full" />}
              error={{ value: emailError, setValue: setEmailError }}
            />
            <InputText id="password" label="Password" placeholder="Input your password" type="password" value={password} onChange={handlePassword} icon={<MdLock className="w-full h-full" />}
              error={{ value: passwordError, setValue: setPasswordError }}
            />
            <InputText id="password" label="Confirm Password" placeholder="Input the same password" type="password" value={confirmPassword} onChange={handleConfirmPassword} icon={<MdLock className="w-full h-full" />}
              error={{ value: confirmPasswordError, setValue: setConfirmPasswordError }}
            />

            <button type="submit" className="p-2 text-white bg-blue-500 rounded-lg">Register</button>
          </form>

        </div>
      </div>

      <div className="w-full py-8 text-center">
        <p className="text-sm text-slate-500">Copyright 2024</p>
      </div>
    </main>
  )
}