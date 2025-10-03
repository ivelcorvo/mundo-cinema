import { createContext, ReactNode, useEffect, useState } from "react";

interface Theme {
  isDark:boolean;  
  toggleDarkTheme:()=>void;
}

export const DarkThemeContext = createContext<Theme | undefined>(undefined);

export const DarkThemProvider = ({children}:{children:ReactNode})=>{
  const [isDark,SetIsDark] = useState<boolean>(()=>{
    let saved = localStorage.getItem("isDark")
    return (saved)?JSON.parse(saved):false
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
