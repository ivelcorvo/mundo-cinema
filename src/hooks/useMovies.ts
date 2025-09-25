import { useCallback, useState } from "react";
import tmdb from "../api/tmdb";

export interface TMDBMovie  {
  id: number;
  title: string;
  poster_path: string | null;
  overview: string;
  vote_average: number;
  release_date: string;
  genres?: {id:number, name:string}[];
  runtime?: number;
  tagline?: string;
};

export const TMDB_IMAGE_URL = "https://image.tmdb.org/t/p/w500";

export const useMovies = ()=>{

  const [error,setError]     = useState<Error | null>(null)
  const [loading,setLoading] = useState<boolean>(false) ;

  const getMovies = useCallback(async(page = 1):Promise<TMDBMovie[]>=> {
    setLoading(true);
    try {
      const res = await tmdb.get<{results:TMDBMovie[]}>("/movie/popular",{params:{page}});      
      setLoading(false);
      return res.data.results;
    } catch (error:unknown) {
      setError(error as Error);
      setLoading(false);
      return [];
    }
  },[]);

  return {loading, error, getMovies};
};