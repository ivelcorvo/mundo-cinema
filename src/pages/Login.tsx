import { FormEvent, useEffect, useState } from "react";
import { useAuthActions } from "../hooks/useAuthActions";
import { useNavigate } from "react-router-dom";
import { useDarkTheme } from "../context/DarkThemeContext";

const Login = () => {

  const {isDark} = useDarkTheme();

  // #### CLASSES ####
    const classTheme:string = (isDark)?"bg-gray-950 shadow-gray-900":"bg-gray-200";
    const classInput:string = `${(isDark)?"bg-gray-800":"bg-white"} w-full px-2 py-0.5 rounded-md`;
    const classBtn:string   = "bg-gray-800 hover:bg-gray-700 text-white px-2 py-0.5 rounded-md hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed";

  const {loading, error:authError, loginUser} = useAuthActions();

  const navigate = useNavigate();

  const [showPassword,setShowPassword] = useState<boolean>(false);
  const [email,setEmail]               = useState<string>("");
  const [password,setPassword]         = useState<string>("");
  const [error,setError]               = useState<string | null>(null);

  const handleSubmit = async(e:FormEvent<HTMLFormElement>):Promise<void>=>{
    e.preventDefault();

    setError(null);

    if(!email || !password){
      setError("Por favor preencha todos os campos");
      return;
    }

    const data = {
      email,
      password
    };

    await loginUser(data);
  }

  const testar = ()=>{
    setEmail("levi_teste123@gmail.com");
    setPassword("Levi123@");
  };

  useEffect(()=>{
    setError(authError);
  },[authError])

  return (
    <>
      <div className={`${classTheme} max-w-100 mx-auto p-3 rounded-xl shadow-md`}>
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
              tabIndex={-1}
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
              disabled={loading}
            >
              {(loading)?"Entrando":"Entrar"}
            </button>
          </div>

          {/* BTN PROVISORIOS */}
          <div className="mt-5 text-start flex space-x-2">
            <button
              type="button"
              className={classBtn}
              onClick={()=>{navigate("/register")}}
            >
              Cadastrar
            </button>
            <button
              type="button"
              className={classBtn}
              onClick={()=>{testar()}}
            >
              Testar
            </button>
          </div>

        </form>
      </div>    
      {error &&
        <div className="max-w-100 mt-50 mx-auto">
          <p className="text-red-700">
            {error}
          </p>
        </div>
      }
    </>
  )
}

export default Login