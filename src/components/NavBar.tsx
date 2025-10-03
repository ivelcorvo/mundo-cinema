import { NavLink } from "react-router-dom";

// #### HOOKS ####
  import { useAuth } from "../context/AuthContext";
  import { useDarkTheme } from "../context/DarkThemeContext";
  import { useState } from "react";
  import { useAuthActions } from "../hooks/useAuthActions";

const NavBar = () => {
  const {user} = useAuth();
  const {isDark,toggleDarkTheme} = useDarkTheme();

  const {logoutUser} = useAuthActions();
  
  const [collapse,setCollpse] = useState<boolean>(false);

  // #### CLASSES ####
    const classThemeMenu:string  = (isDark)?"bg-gray-950":"bg-gray-100";
    const classLink:string       = `${(isDark)?"hover:bg-gray-900":"hover:bg-gray-200"} block p-3` ;
    const classLinkActive:string = `${(isDark)?"hover:bg-gray-900":"hover:bg-gray-200"} block border-e-1 ${(isDark)?"border-white":"border-black"} p-3`;

  return (
    <>
      <header className={`${classThemeMenu} fixed w-full shadow-md z-30`}>
        <nav className="px-3 py-1 w-full z-20">
          <div>
            <button 
              onClick={()=>{setCollpse(!collapse)}}
              className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-md shadow-md hover:scale-110 hover:cursor-pointer"
            >
              <i className="fa-solid fa-bars"></i>
            </button>
          </div>
          <ul className={`${classThemeMenu} fixed left-0 top-12 flex flex-col h-full w-35 transform duration-500 z-30 ${(collapse)?"translate-x-0":"-translate-x-full"}`}>
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
              <button 
                onClick={toggleDarkTheme}
                className={`${classLink} w-full text-start hover:cursor-pointer`}
              >
                {isDark?<i className="fa-solid fa-moon"></i>:<i className="fa-solid fa-sun"></i>} Tema
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