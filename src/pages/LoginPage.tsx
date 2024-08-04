import Cookies from "js-cookie"
import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { MdEmail, MdLock } from "react-icons/md"
import InputText from "../components/Input/InputText"
// import appConfig from "../config/env"
import { useNavigate } from "react-router-dom"
import AppLogo from "../components/AppLogo"
import appConfig from "../config/env"

export default function LoginPage() {
  const navigate = useNavigate()

  useEffect(() => {
    const authToken = Cookies.get('auth')
    if (authToken) {
      return navigate('/dashboard')
    }
  }, [navigate])

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [remember, setRemember] = useState<boolean>(false)

  // error state
  const [emailError, setEmailError] = useState<string>('')
  const [passwordError, setPasswordError] = useState<string>('')
  const [loginError, setLoginError] = useState<string>('')

  function handleEmail(event: ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value)
  }

  function handlePassword(event: ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value)
  }

  function handleRemember(event: ChangeEvent<HTMLInputElement>) {
    setRemember(event.target.checked)
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!email) setEmailError('Email tidak boleh kosong')
    if (!password) setPasswordError('Password tidak boleh kosong')
    if (!email || !password) return

    try {
      const response = await fetch(`${appConfig.apiUrl}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      }).then(res => res.json())

      if (!response.success) {
        setLoginError(response.message)
        return;
      }

      // Save user to localStorage
      localStorage.setItem('user', JSON.stringify(response.data.user))
      // Save token to cookie
      Cookies.set('auth', response.data.token, { expires: remember ? 30 : 3 })

      return navigate('/dashboard')

    } catch (error) {
      console.error(error)
    }
  }

  return (
    <main className="relative flex flex-col justify-between min-h-screen mx-auto bg-slate-50">
      <div className="relative flex flex-col items-center justify-between gap-4 px-8 py-4 text-white bg-green-500">
        <h3 className="py-2 text-2xl font-semibold">Login to E-Kanban</h3>
        <div className="h-[1px] bg-white/40 w-full"></div>
        <div className="flex flex-col items-center justify-between w-full sm:flex-row">
          <a href="/">
            <AppLogo />
          </a>
          <div className="flex items-center gap-3">
            <a className="px-3 py-2 text-white border border-white rounded-lg" href="/register">Register</a>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center h-full ">
        <div className="relative p-12 rounded-xl w-[32rem] h-fit bg-white border border-slate-100">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Login</h1>
          </div>

          <form className="flex flex-col gap-4 mt-6" onSubmit={handleSubmit}>
            <InputText id="email" label="Email" placeholder="Input your email" onChange={handleEmail} icon={<MdEmail className="w-full h-full" />}
              error={{ value: emailError, setValue: setEmailError }}
            />
            <InputText id="password" label="Password" placeholder="Input your password" type="password" onChange={handlePassword} icon={<MdLock className="w-full h-full" />}
              error={{ value: passwordError, setValue: setPasswordError }}
            />
            <div>
              <input type="checkbox" id="remember" onChange={handleRemember} checked={remember} />
              <label className="ml-2" htmlFor="remember">Remember me</label>
            </div>
            <button type="submit" className="p-2 text-white bg-blue-500 rounded-lg">Login</button>
            {loginError && <span className="text-xs text-red-500">{loginError}</span>}
          </form>

        </div>
      </div>

      <div className="w-full py-8 text-center">
        <p className="text-sm text-slate-500">Copyright 2024</p>
      </div>
    </main>
  )
}