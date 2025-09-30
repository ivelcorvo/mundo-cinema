import { TMDBMovie,TMDB_IMAGE_URL } from "../hooks/useMovies";

import { Link } from "react-router-dom";

interface Props{
  movie: TMDBMovie;
  currentPage: number;
  search: string;
};

const Movie = ({movie,currentPage,search}:Props) => {

  // console.log(movie);

  return (

    <article className="relative hover:scale-105 transition-all duration-500 group p-3">
      
      <img 
        src={`${TMDB_IMAGE_URL}${movie.poster_path}`} 
        alt={`Poster do filme ${movie.title}`} 
        className="duration-500 group-hover:opacity-25 rounded-md"
      />
      
      <div className="absolute inset-0 opacity-100 sm:opacity-0 hover:opacity-100 h-full content-end text-white">    
        <div className="p-4 bg-gradient-to-b from-transparent to-black"></div>  
        <div className="bg-black flex flex-col p-5">
          <header>
            <h2 className="text-lg font-bold">{movie.title}</h2>
          </header>
          <div className="sm:mt-1">
            <p>{movie.release_date}</p>
          </div>
          <div className="sm:mt-1">
            <Link 
              to={`/movie/detail/${movie.id}/${currentPage}/${search}`}
              className="bg-blue-900 hover:bg-blue-950 px-2 py-0.5 rounded-md shadow-md "              
            >
              Detalhes
            </Link>            
          </div>
        </div>
      </div>

    </article>
  )
}

export default Movie