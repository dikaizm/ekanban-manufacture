import Cookies from "js-cookie"
import { ChangeEvent, useState } from "react"
import { MdEmail, MdLock, MdPerson } from "react-icons/md"
import InputText from "../components/Input/InputText"
// import appConfig from "../config/env"
import { useNavigate } from "react-router-dom"
import AppLogo from "../components/AppLogo"
import appConfig from "../config/env"
import SelectInput from "../components/Input/InputSelect"

export default function RegisterPage() {
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const [role, setRole] = useState<string>('')
  const [registerKey, setRegisterKey] = useState<string>('')

  // error state
  const [nameError, setNameError] = useState<string>('')
  const [emailError, setEmailError] = useState<string>('')
  const [passwordError, setPasswordError] = useState<string>('')
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>('')
  const [roleError, setRoleError] = useState<string>('')
  const [registerKeyError, setRegisterKeyError] = useState<string>('')
  const [registerError, setRegisterError] = useState<string>('')

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

  function handleRegisterKey(event: ChangeEvent<HTMLInputElement>) {
    setRegisterKey(event.target.value)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async function handleSubmit(event: any) {
    event.preventDefault()

    if (!name) setNameError('Nama tidak boleh kosong')
    if (!email) setEmailError('Email tidak boleh kosong')
    if (password.length < 6) setPasswordError('Password minimal 6 karakter')
    if (password !== confirmPassword) setConfirmPasswordError('Password tidak sama')
    if (!registerKey) setRegisterKeyError('Register key tidak boleh kosong')
    if (!name || !email || password.length < 6 || password !== confirmPassword || !registerKey) return

    const registerData = { name, email, role, password, confirmPassword, registerKey }

    try {
      const response = await fetch(`${appConfig.apiUrl}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(registerData)
      }).then(async res => {
        return { status: res.status, data: await res.json() }
      })

      console.log(response);
      if (response.status !== 201) {
        setRegisterError(response.data.message)
        return;
      }

      // Save response data to cookies
      Cookies.set('user', btoa(JSON.stringify(response.data.data.user)))
      Cookies.set('auth', response.data.data.token, { expires: 30 })

      return navigate('/')

    } catch (error) {
      console.error(error)
    }
  }

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
            <InputText id="email" label="Email" placeholder="Input your email" type="email" value={email} onChange={handleEmail} icon={<MdEmail className="w-full h-full" />}
              error={{ value: emailError, setValue: setEmailError }}
            />

            <SelectInput id="role" label="Role" value={role} onChange={(e) => {
              setRole(e.target.value)
            }} icon={<MdPerson className="w-full h-full" />} options={
              [
                { value: 'manager', label: 'Manager' },
                { value: 'assembly_line_operator', label: 'Assembly Line Operator' },
                { value: 'assembly_store_operator', label: 'Assembly Store Operator' },
                { value: 'fabrication_operator', label: 'Fabrication Operator' },
              ]
            } error={{ value: roleError, setValue: setRoleError }} />

            <InputText id="password" label="Password" placeholder="Input your password" type="password" value={password} onChange={handlePassword} icon={<MdLock className="w-full h-full" />}
              error={{ value: passwordError, setValue: setPasswordError }}
            />
            <InputText id="confirm_password" label="Confirm Password" placeholder="Input the same password" type="password" value={confirmPassword} onChange={handleConfirmPassword} icon={<MdLock className="w-full h-full" />}
              error={{ value: confirmPasswordError, setValue: setConfirmPasswordError }}
            />

            <InputText id="register_key" label="Register Key" placeholder="Input register key" type="password" value={registerKey} onChange={handleRegisterKey} icon={<MdLock className="w-full h-full" />} error={{ value: registerKeyError, setValue: setRegisterKeyError }} />

            <button type="button" className="p-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600">Register</button>
            {registerError && <span className="text-xs text-red-500">{registerError}</span>}
          </form>

        </div>
      </div>

      <div className="w-full py-8 text-center">
        <p className="text-sm text-slate-500">Copyright 2024</p>
      </div>
    </main>
  )
}