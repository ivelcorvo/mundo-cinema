import { useState } from "react";
import { auth } from "../firebase/firebase_config";
import { 
    createUserWithEmailAndPassword,
    updateProfile,
    signInWithEmailAndPassword,
    signOut,
    UserCredential
} from "firebase/auth";

export const useAuthActions = ()=>{
    const [loading,setLoading] = useState<boolean>(false);
    const [error,setError]     = useState<string | null>(null);
    
    interface CreateUser{
        email:string,
        password:string,
        [key:string]:any,
    }
    const createUser = async(data:CreateUser): Promise<UserCredential | null> =>{
        setLoading(true);
        setError(null);
        try {
            const UserCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
            await updateProfile(UserCredential.user,{displayName:data.name});
            setLoading(false);
            return UserCredential;
        } catch (error:any) {
        
            let errorMessage:string = "";
            switch (error.code){
                case "auth/email-already-in-use":
                errorMessage = "Este e-mail já está cadastrado.";
                break;
                case "auth/invalid-email":
                errorMessage = "Formato de e-mail inválido.";
                break;
            case "auth/operation-not-allowed":
                errorMessage = "Cadastro com e-mail/senha desabilitado.";
                break;
            case "auth/weak-password":
                errorMessage = "A senha deve ter pelo menos 6 caracteres.";
                break;
            default:
                errorMessage = "Ocorreu um erro inesperado. Tente novamente.";
            }
            setError(errorMessage);
            setLoading(false);
            return null;
        }


    }

    interface LoginUser{
        email:string,
        password:string
    }
    const loginUser = async(data:LoginUser):Promise<UserCredential | null>=>{
        setLoading(true);
        setError(null);
        try {
            const UserCredential = await signInWithEmailAndPassword(auth,data.email,data.password);
            setLoading(false);
            return UserCredential;
        } catch (error:any) {
            let errorMessage = "";
            switch (error.code) {
                case "auth/user-not-found":
                errorMessage = "Não existe usuário com esse e-mail.";
                break;
                case "auth/wrong-password":
                errorMessage = "Senha incorreta.";
                break;
                case "auth/invalid-email":
                errorMessage = "E-mail em formato inválido.";
                break;
                case "auth/user-disabled":
                errorMessage = "Conta desativada.";
                break;
                case "auth/invalid-credential":
                errorMessage = "Credenciais inválidas. Verifique e-mail e senha.";
                break;
                default:
                errorMessage = "Ocorreu um erro inesperado. Tente novamente.";
            }
            setError(errorMessage);
            setLoading(false)
            return null;
        }

    };

    const logoutUser = async(): Promise<void>=>{
        signOut(auth);
    };

    return {
        loading,
        error,
        createUser,
        loginUser,
        logoutUser
    }

};