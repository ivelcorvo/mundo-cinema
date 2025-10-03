import { Link } from "react-router-dom"
import { TMDBMovie, TMDB_IMAGE_URL } from "../hooks/useMovies"
import BtnFavorite from "./BtnFavorite";
import { useAuth } from "../context/AuthContext";
import { useDarkTheme } from "../context/DarkThemeContext";

interface Props {
  movie: TMDBMovie,
  currentPage?: string | undefined,
  search?: string | undefined
  webPage?: string | undefined;
}

const DetailsMovie = ({movie,webPage,currentPage,search}: Props) => {

  const {user}   = useAuth();
  const {isDark} = useDarkTheme();

  // #### CLASSES ####
    const classTheme = (isDark)?"bg-black/85":"bg-white/85";

  let url_rote:string = "";
  if(webPage==="favorites") {
    url_rote = `/favorites`;
  }else{
    url_rote = `/home/${currentPage}/${(search===undefined)?"":search}`;
  }

  return (
    
    <div       
      className="rounded-xl"
      style={{ 
        backgroundImage: `url(${TMDB_IMAGE_URL}${movie.poster_path})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    > 
      <div className={`${classTheme} p-3 rounded-md`} >
        <div className="flex justify-between">
          <Link 
            to={url_rote}
            className="bg-blue-900 hover:bg-blue-700 text-white px-4 py-3 rounded-full inline-block hover:scale-125"
          >
            <i className="fa-solid fa-left-long"></i>
          </Link>            
          {user &&
            <BtnFavorite
              id_movie={movie.id}
            ></BtnFavorite>
          }
        </div>
        <article className="grid grid-cols-1 md:grid-cols-3">
          <div className="col-span-2 p-2">
            <header> 
              <h1 className="text-2xl font-bold">{movie.title}</h1>
            </header>
            <section className="mt-5">
              <header>
                <h2 className="text-xl font-semibold">Sinopse</h2>
              </header>
              <p>{movie.overview}</p>
            </section>
            <section className="mt-5">
              <header>
                <h2 className="text-xl font-semibold">Informações</h2>
              </header>
              <p>{movie.release_date}</p>
              <p>tempo: {movie.runtime} min</p>
            </section>
            <section className="mt-5">
              <header>
                <h2 className="text-xl font-semibold">Avaliação</h2>
              </header>
              <p>{movie.vote_average}/10</p>
            </section>
            <section className="mt-5">
              <header>
                <h2 className="text-xl font-semibold">Gêneros</h2>
              </header>
              <ul>{movie.genres?.map(g=>(
                <li key={g.name}>{g.name}</li>
              ))}</ul>
            </section>
          </div>
          <div className="col-span-1 p-5">
            <img
              src={`${TMDB_IMAGE_URL}${movie.poster_path}`} 
              alt={`Poster do filme: ${movie.title}`} 
              className="w-full rounded-md shadow-md "
              loading="lazy"
              /> 
          </div>  
        </article>    
      </div>
    </div>
  )
}

export default DetailsMovie