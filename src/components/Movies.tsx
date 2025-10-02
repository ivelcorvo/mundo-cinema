// ### COMPONENTES ###
  import Movie from "./Movie"

// ### HOOKS | INTERFACES ###
  import { TMDBMovie } from "../hooks/useMovies"

interface Props{
  movies: TMDBMovie[];
  currentPage?: number | undefined;
  search?: string | undefined;
  webPage?: string | undefined;
};

const Movies = ({
  movies,
  currentPage,
  search,
  webPage,
}:Props) => {  
  // const filmes:number[] = [...Array(21).keys()];

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 md:sm:grid-cols-3 xl:sm:grid-cols-5 justify-center items-center">
      {movies && movies.map((movie,i)=>(
        <Movie           
          key={movie.id} 
          movie={movie}
          currentPage={currentPage}
          search={search}
          webPage={webPage}
        ></Movie>
      ))}
    </section>
  )
}

export default Movies