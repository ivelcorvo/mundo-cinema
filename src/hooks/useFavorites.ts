import { useState } from "react";
import { apiRequest } from "../api/apiRequest";
import { auth } from "../firebase/firebase_config";

// type Favorite = {
//   id:number,
// }

export const useFavorites = ()=>{

  const url:string = process.env.REACT_APP_FIREBASE_REALTIME_DATABASE!;

  const [loading,setLoading] = useState<boolean>(false);
  const [error,setError]     = useState<null | Error>(null);
  const [data,setData]       = useState<string[]>([]);

  const getToken = async()=>{
    if(!auth.currentUser) return null;
    return await auth.currentUser.getIdToken(true);
  };
  
  const getIdsFavorites = async()=>{
    setError(null);
    setLoading(false);
    try {
      const token = await getToken();
      const res   = await apiRequest(
        `${url}/users/${auth.currentUser!.uid}/favoritos.json`,
        "GET",
        undefined,
        token??undefined
      );
      setData(res?Object.keys(res):[]);
    } catch (error:unknown) {
      setError(error as Error);
      setLoading(false);
      return [];
    }
  };

  const addIdFavorites = async(id:string)=>{
    setError(null);
    setLoading(false);
    try {
      const token = await getToken();
      const res   = await apiRequest(
        `${url}/users/${auth.currentUser!.uid}/favoritos/${id}.json`,
        "PUT",
        true,
        token??undefined
      );
      setData(res?Object.keys(res):[]);
    } catch (error:unknown) {
      setError(error as Error);
      setLoading(false);
      return [];
    }
  }

  return {error,loading,data,getIdsFavorites,addIdFavorites}
};