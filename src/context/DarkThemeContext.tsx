import { createContext, ReactNode, useContext, useEffect, useState } from "react";

interface Theme {
  isDark:boolean;  
  toggleDarkTheme:()=>void;
}

export const DarkThemeContext = createContext<Theme | undefined>(undefined);

export const DarkThemeProvider = ({children}:{children:ReactNode})=>{
  const [isDark,SetIsDark] = useState<boolean>(()=>{
    let saved = localStorage.getItem("isDark")
    return (saved)?JSON.parse(saved):true
  });

  const toggleDarkTheme = ()=>{
    SetIsDark(prev=>!prev);    
  };

  useEffect(()=>{
    localStorage.setItem("isDark",JSON.stringify(isDark));
  },[isDark]);

  return(
    <DarkThemeContext.Provider value={{isDark,toggleDarkTheme}}>
      {children}
    </DarkThemeContext.Provider>
  );
};

export const useDarkTheme = ()=>{
  const context = useContext(DarkThemeContext);

  if(!context){
    throw new Error("useDarkTheme deve ser usado dentro de um DarkThemeProvider");
  }

  return context;
};
