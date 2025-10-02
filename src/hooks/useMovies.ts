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
  adult?:boolean;
};

export const TMDB_IMAGE_URL = "https://image.tmdb.org/t/p/w500";

export const useMovies = ()=>{

  const [error,setError]     = useState<Error | null>(null)
  const [loading,setLoading] = useState<boolean>(false) ;

  const getMovies = useCallback(async(page:number=1):Promise<TMDBMovie[]>=> {
    setLoading(true);
    try {
      const res = await tmdb.get<{results:TMDBMovie[]}>("/movie/popular",{params:{page}});      
      setLoading(false);
      
      // REMOVE FILMES P... | por algum motivo tudo está com 'adult:false' a forma que encontrei foi ver o overview, já que os filmes P... geralmente não tem
      let movies;
      movies = res.data.results.filter(r=>r.adult!==true);
      movies = movies.filter(m=>m.overview!=="");
      // movies = res.data.results // retorna todos;
      
      return movies;
    } catch (error:unknown) {
      setError(error as Error);
      setLoading(false);
      return [];
    }
  },[]);

  const getMoviesByIds = useCallback(async(ids:string[]):Promise<TMDBMovie[]>=>{
    setError(null);
    setLoading(true);
    try {            
      const requests = ids.map(id => tmdb.get<TMDBMovie>(`/movie/${id}`));            
      const res = await Promise.all(requests);
      setLoading(false);      
      return res.map(r => r.data);
    } catch (error:unknown) {
      setError(error as Error);
      setLoading(false);
      return [];
    }
  },[]);

  const searchMovies = useCallback(async(query:string, page:number=1):Promise<TMDBMovie[]>=>{
    setLoading(true);
    try {
      const res = await tmdb.get<{results:TMDBMovie[]}>("search/movie",{params:{query,page}});

      // REMOVE FILMES P... | por algum motivo tudo está com 'adult:false' a forma que encontrei foi ver o overview, já que os filmes P... geralmente não tem
      let movies;
      movies = res.data.results.filter(r=>r.adult!==true);
      movies = movies.filter(m=>m.overview!=="");
      // movies = res.data.results // retorna todos;

      setLoading(false);
      return movies;
    } catch (error:unknown) {
      setError(error as Error);
      setLoading(false);
      return [];

    }
  },[]);

  const getMovie = useCallback(async(id:string|undefined):Promise<TMDBMovie>=>{
    setLoading(true);
    try {
      const res = await tmdb.get<TMDBMovie>(`/movie/${id}`);
      setLoading(false);
      return res.data;
    } catch (error:unknown) {
      setError(error as Error);
      setLoading(false);
      throw error;
    }
  },[]);

  return {loading, error, getMovies, getMoviesByIds, getMovie, searchMovies};
};