import { FormEvent, useEffect, useState } from "react";
import { useAuthActions } from "../hooks/useAuthActions";
import { useNavigate } from "react-router-dom";


const Register = () => {
  const classInput = "bg-gray-800 w-full px-2 py-0.5 rounded-md";
  const classBtn   = "bg-gray-800 hover:bg-gray-900 px-2 py-0.5 rounded-md hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed";

  const {loading, error:authError, createUser, logoutUser} = useAuthActions();

  const navigate = useNavigate();

  const [showPassword,setShowPassword]       = useState<boolean>(false);
  const [email,setEmail]                     = useState<string>("");
  const [password,setPassword]               = useState<string>("");
  const [name,setName]                       = useState<string>("");
  const [confirmPassword,setConfirmPassword] = useState<string>("");
  const [error,setError]                     = useState<string | null>(null);

  const handleSubmit = async(e:FormEvent<HTMLFormElement>):Promise<void>=>{
    
    e.preventDefault();

    setError(null);

    if(!email || !password || !name || !confirmPassword){
      setError("Por favor preencha todos os campos");
      return;
    }

    if(confirmPassword !== password){
      setError("Senha e Confirmar senha precisam ser iguais.");
      return;
    } 

    const data = {
      email,
      password,
      name
    };

    const userCredential = await createUser(data);

    if(userCredential){
      await logoutUser();
      navigate("/login");
    }

  }

  useEffect(()=>{
    setError(authError);
  },[authError])

  return (
    <>
      <div className="bg-gray-950 max-w-100 mx-auto p-3 rounded-xl shadow-md shadow-gray-900">
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <input 
              type="text" 
              value={name}
              placeholder="Nome"
              onChange={(e)=>{setName(e.target.value)}}
              className={classInput}
            />
          </div>
          <div className="mb-2">
            <input 
              type="email" 
              value={email}
              placeholder="E-mail"
              onChange={(e)=>{setEmail(e.target.value)}}
              className={classInput}
            />
          </div>
          <div className="mb-2 relative">
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
          <div className="mb-4">
            <input 
              type={`${(showPassword)?"text":"password"}`} 
              value={confirmPassword}
              placeholder="Confirmar senha"
              onChange={(e)=>{setConfirmPassword(e.target.value)}}
              className={classInput}
            />
          </div>
          <div className="text-end">
            <button
              type="submit"
              className={classBtn}
              disabled={loading}
            >
              {loading?"Cadastrando...":"Cadastrar"}
            </button>
          </div>
        </form>
      </div>
      {error &&
        <div className="mt-5">
          <p className="text-red-700">
            {error}
          </p>
        </div>
      }
    </>
  )
}

export default Register