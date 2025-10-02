import { useMovies, TMDBMovie } from "../hooks/useMovies"
import { useFavorites } from "../hooks/useFavorites"
import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import Movies from "../components/Movies";

const Favorites = () => {

  const {favorites} = useFavorites();
  const {getMoviesByIds,error,loading} = useMovies();

  const [movies,setMovies] = useState<TMDBMovie[]>([]);

  useEffect(()=>{
    const loadMovie = async()=>{
      const data :TMDBMovie[] = await getMoviesByIds(favorites);
      setMovies(data);
    }
    loadMovie();
  },[getMoviesByIds,favorites]);
  // console.log(favorites);
  // console.log(movies);

  return (
    <>

      {(loading&&!error) &&
        <Loading></Loading>
      }
      {(!error&&!loading&&movies.length>0) &&
        <Movies
        movies={movies}
        webPage={"favorites"}
        ></Movies>
      }
      {error && <p><i className="fa-solid fa-face-frown"></i> Infelizmente não foi possível trazer os filmes...</p>}
    
    </>
  )
}

export default Favorites