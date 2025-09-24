import Movie from "./Movie"
import { TMDBMovie } from "../hooks/useMovies"

interface Props{
  movies: TMDBMovie[];
};

const Movies = ({movies}:Props) => {  
  // const filmes:number[] = [...Array(21).keys()];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:sm:grid-cols-3 xl:sm:grid-cols-5 justify-center items-center">
      {movies && movies.map((movie,i)=>(
        <Movie key={movie.id} movie={movie}></Movie>
      ))}
    </div>
  )
}

export default Movies