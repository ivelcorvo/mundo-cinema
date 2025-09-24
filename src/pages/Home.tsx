import { FormEvent, useEffect, useState } from "react";
import Movies from "../components/Movies";
import { useMovies } from "../hooks/useMovies";
import { TMDBMovie } from "../hooks/useMovies"; 
import Loading from "../components/Loading";

const Home = () => {
  const {loading, error, getMovies} = useMovies();

  const [movies,setMovies] = useState<TMDBMovie[]>([]);

  useEffect(()=>{
    const loadMovies = async()=>{
      const data = await getMovies(1);
      setMovies(data);
    };
    loadMovies();
  },[getMovies]);
  // console.log(movies);

  const handleSubmit = (e:FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
  }
  return (
    <div className="max-w-[95%] sm:max-w-[80%] mx-auto ">

      <div className="mb-10">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-row">
            <input 
              type="text" 
              className={"bg-gray-700 w-full px-4 py-1 rounded-s-md"}  
            />
            <button
              type="submit"
              className="bg-gray-800 hover:bg-gray-900 px-2 py-1 rounded-e-md hover:cursor-pointer"
            >
              Pesquisar
            </button>
          </div>
        </form>
      </div>

      <div className="mb-10">
        generos
      </div>

      <div>
        {(loading&&!error) &&
          <Loading></Loading>
        }
        {(!loading&&!error&&movies.length>0) &&
          <Movies movies={movies}></Movies>
        }
      </div>

    </div>
  )
};

export default Home