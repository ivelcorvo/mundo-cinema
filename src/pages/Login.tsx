import { FormEvent, useState } from "react"

const Login = () => {
  
  const classInput = "bg-gray-800 w-full px-2 py-0.5 rounded-md";
  const classBtn   = "bg-gray-800 hover:bg-gray-900 px-2 py-0.5 rounded-md hover:cursor-pointer";

  const [showPassword,setShowPassword] = useState<boolean>(false);
  const [email,setEmail]               = useState<string>("");
  const [password,setPassword]         = useState<string>("");

  const handleSubmit = (e:FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
  }

  return (
    <div className="bg-gray-950 max-w-100 mx-auto p-3 rounded-xl shadow-md shadow-gray-900">
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <input 
            type="email" 
            value={email}
            placeholder="E-mail"
            onChange={(e)=>{setEmail(e.target.value)}}
            className={classInput}
          />
        </div>
        <div className="mb-4 relative">
          <input 
            type={`${(showPassword)?"text":"password"}`} 
            value={password}
            placeholder="Senha"
            onChange={(e)=>{setPassword(e.target.value)}}
            className={classInput}
          />
          <button
            type="button"
            className="absolute top-0.5 right-2 hover:cursor-pointer text-gray-500"
            onClick={()=>{setShowPassword(!showPassword)}}
          >
            {(showPassword)?<i className="fa-solid fa-eye-slash"></i>:<i className="fa-solid fa-eye"></i>}
          </button>
        </div>
        <div className="text-end">
          <button
            type="submit"
            className={classBtn}
          >
            Entrar
          </button>
        </div>
      </form>
    </div>
  )
}

export default Login