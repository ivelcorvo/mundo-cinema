import { TMDBMovie,TMDB_IMAGE_URL } from "../hooks/useMovies";
import { Link } from "react-router-dom";

// ### COMPONENTES ###
  import BtnFavorite from "./BtnFavorite";

// ### HOOKS | INTERFACES ###
  import { useAuth } from "../context/AuthContext";

interface Props{
  movie: TMDBMovie;
  currentPage?: number | undefined;
  search?: string | undefined;
  webPage?: string | undefined;
};

const Movie = ({
  movie,
  currentPage,
  search,
  webPage,
}:Props) => {

  const {user} = useAuth();
  // console.log(movie);

  let url_rote:string = "";
  if(webPage==="favorites") {
    url_rote = `/movie/detail/${webPage}/${movie.id}`;
  }else{
    url_rote = `/movie/detail/${webPage}/${movie.id}/${currentPage}/${search}`;
  }

  return (

    <article className="relative hover:scale-105 transition-all duration-400 group p-3 ">
      
      <img 
        src={`${TMDB_IMAGE_URL}${movie.poster_path}`} 
        alt={`Poster do filme ${movie.title}`} 
        className="  duration-500 group-hover:opacity-25 rounded-md"
      />
      
      <div className="absolute inset-0 opacity-100 xl:opacity-0 hover:opacity-100 h-full content-end text-white p-3 rounded-b-md">    
        
        {user && 
          <div className="absolute top-5 right-5 ">
            <BtnFavorite 
              id_movie={movie.id}
            ></BtnFavorite>
          </div>
        }

        <div className="bg-gradient-to-b from-transparent via-black/80 via-10% to-black to-90% flex flex-col p-5 rounded-b-md ">
          <header>
            <h2 className="text-lg font-bold">{movie.title}</h2>
          </header>
          <div className="sm:mt-1">
            <p>{movie.release_date}</p>
          </div>
          <div className="sm:mt-1">
            <Link 
              to={url_rote}
              className="bg-gray-800 hover:bg-gray-700 text-white px-2 py-0.5 rounded-md shadow-md "              
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