import { TMDBMovie } from "../hooks/useMovies"

interface Props{
  movie:TMDBMovie;
};

const Movie = ({movie}:Props) => {

  return (

    <div className="relative hover:scale-105 transition-all duration-500 group p-3">
      
      <img 
        src={"https://images.unsplash.com/photo-1755398104195-294a494782e8?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} 
        alt="teste" 
        className="duration-500 group-hover:opacity-50"
      />
      
      <div className="absolute inset-0 opacity-100 sm:opacity-0 hover:opacity-100 flex flex-col">
        <div className="h-full content-end p-5 text-white">
          <header>
            <h2 className="text-lg font-bold">{movie.title}</h2>
          </header>
          <div className="mt-5">
            <p>{movie.release_date}</p>
          </div>
          <div className="mt-5">
            <button
              tabIndex={-1}
              className="bg-gray-800 hover:bg-gray-900 px-2 py-0.5 rounded-md shadow-md hover:cursor-pointer" 
            >
              Detalhes
            </button>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Movie