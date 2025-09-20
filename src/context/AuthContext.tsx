import { createContext, useEffect, useState, ReactNode, useContext } from "react";
import { onAuthStateChanged,User } from "firebase/auth";
import { auth } from "../firebase/firebase_config";

interface AuthContextType {
    user: User | null,
    loading: boolean
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({children}:{children:ReactNode})=>{
    
    const [user,setUser]       = useState<User | null>(null);
    const [loading,setLoading] = useState<boolean>(true);

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth,(currentUser)=>{
            setUser(currentUser);
            setLoading(false)
        })
        return ()=>unsubscribe();
    },[]);
    
    return(
        <AuthContext.Provider value={{user,loading}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = ()=>{
    const context = useContext(AuthContext);
    if(!context){
        throw new Error("useAuth deve ser usado dentro de um AuthProvider");
    }
    return context;
};