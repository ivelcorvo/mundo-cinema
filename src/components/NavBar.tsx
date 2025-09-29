import { NavLink } from "react-router-dom";

// #### HOOKS ####
  import { useAuth } from "../context/AuthContext";
  import { useState } from "react";
  import { useAuthActions } from "../hooks/useAuthActions";

const NavBar = () => {
  const {user} = useAuth();

  const {logoutUser} = useAuthActions();
  
  const [collapse,setCollpse] = useState<boolean>(false);

  const classLink:string       = "block hover:bg-gray-900 p-3" ;
  const classLinkActive:string = "block hover:bg-gray-900 border-e-1 border-white p-3" ;

  return (
    <>
      <header className="bg-gray-950 fixed w-full shadow-md z-30">
        <nav className="px-3 py-1 w-full z-20">
          <div>
            <button 
              onClick={()=>{setCollpse(!collapse)}}
              className="bg-gray-900 px-4 py-2 rounded-md shadow-md hover:scale-110 hover:cursor-pointer"
            >
              <i className="fa-solid fa-bars"></i>
            </button>
          </div>
          <ul className={`bg-gray-950 fixed left-0 top-12 flex flex-col h-full w-35 transform duration-500 z-30 ${(collapse)?"translate-x-0":"-translate-x-full"}`}>
            <li>
              <NavLink to="/home" className={({isActive})=>isActive?classLinkActive:classLink}><i className="fa-solid fa-house"></i> Inicio</NavLink>
            </li>
            {!user &&
              <>
                <li>
                  <NavLink to="/login" className={({isActive})=>isActive?classLinkActive:classLink}><i className="fa-solid fa-right-to-bracket"></i> Login</NavLink>
                </li>
                <li>
                  <NavLink to="/register" className={({isActive})=>isActive?classLinkActive:classLink}><i className="fa-solid fa-address-card"></i> Cadastrar</NavLink>
                </li>
              </>
            }
            <li>
              <NavLink to="/about" className={({isActive})=>isActive?classLinkActive:classLink}><i className="fa-solid fa-circle-info"></i> Sobre</NavLink>
            </li>
            {user &&
              <>
                <li>
                  <NavLink to="/favorites" className={({isActive})=>isActive?classLinkActive:classLink}><i className="fa-solid fa-heart"></i> Favoritos</NavLink>
                </li>
                <li>
                  <button 
                    className={`${classLink} w-full text-start hover:cursor-pointer`}
                    onClick={()=>{logoutUser();}}  
                  >
                    <i className="fa-solid fa-right-from-bracket"></i> Sair
                  </button>
                </li>
              </>
            }
            
            <li>
              <button className={`${classLink} w-full text-start hover:cursor-pointer`}>
                <i className="fa-solid fa-sun"></i> / <i className="fa-solid fa-moon"></i> Tema
              </button>
            </li>
          </ul>
        </nav>
      </header>
      {collapse && 
        <div className="fixed inset-0 bg-black/50 z-20" onClick={()=>{setCollpse(!collapse)}}></div>
      }  
    </>
  )
}

export default NavBar