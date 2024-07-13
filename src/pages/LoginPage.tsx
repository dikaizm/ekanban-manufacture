import Cookies from "js-cookie"
import { ChangeEvent, FormEvent, useState } from "react"
import { MdEmail, MdLock } from "react-icons/md"
import InputText from "../components/Input/InputText"
// import appConfig from "../config/env"
import { useNavigate } from "react-router-dom"
import AppLogo from "../components/AppLogo"
import appConfig from "../config/env"

export default function LoginPage() {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [remember, setRemember] = useState<boolean>(false)

  // error state
  const [emailError, setEmailError] = useState<string>('')
  const [passwordError, setPasswordError] = useState<string>('')
  const [loginError, setLoginError] = useState<string>('')

  const navigate = useNavigate()

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
      }).then(async res => {
        return { status: res.status, data: await res.json() }
      })

      console.log(response);
      if (response.status !== 200) {
        setLoginError(response.data.message)
        return;
      }
      
      // Save token to cookie
      Cookies.set('auth', response.data.data.token, { expires: remember ? 365 : 1 })

      return navigate('/dashboard')

    } catch (error) {
      console.error(error)
    }
  }

  return (
    <main className="relative flex flex-col justify-between min-h-screen mx-auto bg-slate-50">
      <div className="relative flex justify-between gap-4 px-8 py-4">
        <a href="/">
          <AppLogo />
        </a>

        <div className="flex items-center gap-3">
          <span>Belum memiliki akun?</span>
          <a className="px-3 py-2 text-blue-500 border border-blue-500 rounded-lg" href="/register">Daftar Akun</a>
        </div>
      </div>

      <div className="flex items-center justify-center h-full ">
        <div className="relative p-12 rounded-xl w-[32rem] h-fit bg-white border border-slate-100">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Masuk ke Akun Anda</h1>
            <p>Selamat datang kembali!</p>
          </div>

          <form className="flex flex-col gap-4 mt-6" onSubmit={handleSubmit}>
            <InputText id="email" label="Email" placeholder="Masukkan email" onChange={handleEmail} icon={<MdEmail className="w-full h-full" />}
              error={{ value: emailError, setValue: setEmailError }}
            />
            <InputText id="password" label="Password" placeholder="Masukkan password" type="password" onChange={handlePassword} icon={<MdLock className="w-full h-full" />}
              error={{ value: passwordError, setValue: setPasswordError }}
            />
            <div>
              <input type="checkbox" id="remember" onChange={handleRemember} checked={remember} />
              <label className="ml-2" htmlFor="remember">Ingat saya</label>
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