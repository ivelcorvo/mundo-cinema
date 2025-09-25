import { renderHook } from "@testing-library/react";
import { useAuthActions } from "./useAuthActions";
import { 
    createUserWithEmailAndPassword,
    updateProfile,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth"; 
import { act } from "react";

// Mocks do Firebase Auth
jest.mock("firebase/auth", () => ({
  createUserWithEmailAndPassword: jest.fn(),
  updateProfile: jest.fn(),
  signInWithEmailAndPassword: jest.fn(),
  signOut: jest.fn(),
}));

// Mock simples do auth exportado
jest.mock("../firebase/firebase_config", () => ({
  auth: {}, 
}));

describe("useAuthActions", () => { 

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("DEVE CRIAR USUÁRIO COM SUCESSO", async()=>{
        // Mock do createUser com email consistente
        (createUserWithEmailAndPassword as jest.Mock).mockResolvedValue({user: { uid:"123",email:"teste@email.com" }});
        (updateProfile as jest.Mock).mockResolvedValue(undefined);

        const { result } = renderHook(() => useAuthActions());

        await act(async()=> {
            const res = await result.current.createUser({email:"teste@email.com",password:"123456",name:"Levi"});
            expect(res?.user.email).toBe("teste@email.com");
        });

        expect(result.current.error).toBeNull();
        expect(result.current.loading).toBe(false);
        // expect(updateProfile).toHaveBeenCalledWith(expect.anything(), { displayName: "Levi" });
        expect(updateProfile).toHaveBeenCalled();
    });

    it("DEVE TRATAR ERRO DE EMAIL JÁ CADASTRADO", async()=>{
        (createUserWithEmailAndPassword as jest.Mock).mockRejectedValue({code:"auth/email-already-in-use"});

        const { result } = renderHook(() => useAuthActions());

        await act(async () => {
            const res = await result.current.createUser({email: "teste@email.com",password: "123456",name: "Levi"});
            expect(res).toBeNull();
        });

        expect(result.current.error).toBe("Este e-mail já está cadastrado.");
        expect(result.current.loading).toBe(false);
    });

    it("DEVE FAZER LOGIN COM SUCESSO", async()=>{
        (signInWithEmailAndPassword as jest.Mock).mockResolvedValue({user: { uid:"123",email:"teste@email.com"}});
        const {result} = renderHook(()=>useAuthActions());
        await act(async()=>{
            const res = await result.current.loginUser({email:"teste@email.com",password:"123456"});
            expect(res?.user.email).toBe("teste@email.com");
        });

        expect(result.current.error).toBeNull();
        expect(result.current.loading).toBe(false);
    })

    it("DEVE LOGOUT COM O USUÁRIO", async()=>{
        (signOut as jest.Mock).mockResolvedValue(undefined);
        const {result} = renderHook(()=>useAuthActions());
        await act(async()=>{
            await result.current.logoutUser();            
        });
    })

});