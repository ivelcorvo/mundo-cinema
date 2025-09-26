import { TMDBMovie, TMDB_IMAGE_URL } from "../hooks/useMovies"

interface Props {
  movie:TMDBMovie,
}

const DetailsMovie = ({movie}: Props) => {
  return (

    <article className="grid grid-cols-1 md:grid-cols-3">

      <div className="col-span-2 p-5">
        <header> 
          <h1 className="text-2xl font-bold">{movie.title}</h1>
        </header>
        <section>
          <h2 className="text-xl font-semibold mt-10">Sinopse</h2>
          <p>{movie.overview}</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold mt-10">Informações</h2>
          <p>{movie.release_date}</p>
          <p>tempo: {movie.runtime} min</p>
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
    
    // +++++++++++++++++++++++++++++++++++++++++++++++++
    //  teste
    // <div className="w-full h-screen overflow-hidden relative">
    //   <div className="w-full h-[1800px]">
    //     <img 
    //       src={`${TMDB_IMAGE_URL}${movie.poster_path}`} 
    //       alt={`Poster do filme: ${movie.title}`} 
    //       className="w-full h-full opacity-10 "
    //     />                  
    //   </div>
    //   <div className="absolute inset-0 grid grid-cols-1 md:grid-cols-3">
    //     <div className="col-span-2 p-5">
    //       <header> 
    //         <h1 className="text-2xl font-bold">{movie.title}</h1>
    //       </header>
    //       <div className="mt-10">
    //         <p>{movie.overview}</p>
    //       </div>
    //       <footer className="mt-10">
    //         <p>{movie.release_date}</p>
    //         <p>tempo: {movie.runtime} min</p>
    //       </footer>
    //     </div>

    //     <div className="col-span-1 p-5">
    //       <img id="image"
    //         src={`${TMDB_IMAGE_URL}${movie.poster_path}`} 
    //         alt={`Poster do filme: ${movie.title}`} 
    //         className="shadow-md"
    //       /> 
    //     </div>  
    //   </div>
    // </div>
  )
}

export default DetailsMovie