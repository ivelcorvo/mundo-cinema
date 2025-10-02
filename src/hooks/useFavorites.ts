import { useCallback, useEffect, useState } from "react";
import { apiRequest } from "../api/apiRequest";
import { auth } from "../firebase/firebase_config";

import { useAuth } from "../context/AuthContext";

export const useFavorites = ()=>{

  const url:string = process.env.REACT_APP_FIREBASE_REALTIME_DATABASE!;

  const {user} = useAuth()

  const [loading,setLoading]     = useState<boolean>(false);
  const [error,setError]         = useState<null | Error>(null);
  const [favorites,setFavorites] = useState<string[]>([]);

  const getToken = useCallback(async()=>{
    if(!user) return null;
    return await user.getIdToken();
  },[user]);
  
  const getIdsFavorites = useCallback(async()=>{
    setError(null);
    setLoading(false);
    try {
      const token = await getToken();
      const res   = await apiRequest(
        `${url}/users/${user!.uid}/favoritos.json`,
        "GET",
        undefined,
        token??undefined
      );
      setFavorites((res)?Object.keys(res):[]);

    } catch (error:unknown) {
      setError(error as Error);
      setLoading(false);
      return [];
    }
  },[url,getToken]);

  useEffect(()=>{
    getIdsFavorites();
  },[getIdsFavorites]);
  // console.log(favorites);

  const addIdFavorites = async(id:string)=>{
    setError(null);
    setLoading(false);
    try {
      const token = await getToken();
      await apiRequest(
        `${url}/users/${user!.uid}/favoritos/${id}.json`,
        "PUT",
        true,
        token??undefined
      );      
      await getIdsFavorites();
    } catch (error:unknown) {
      setError(error as Error);
      setLoading(false);
      return [];
    }
  }

  const removeFavorite = async(id:string)=>{
    setError(null);
    setLoading(true);
    try {
      const token = await getToken();
      await apiRequest(
        `${url}/users/${user!.uid}/favoritos/${id}.json`,
        "DELETE",
        undefined,
        token??undefined
      );
      await getIdsFavorites();
    } catch (error:unknown) {
      setError(error as Error)
      setLoading(false);
      return [];
    }
  }

  return {favorites,error,loading,getIdsFavorites,addIdFavorites,removeFavorite}
};