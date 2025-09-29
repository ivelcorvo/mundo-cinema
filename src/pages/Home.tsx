// ### COMPONENTES ###
  import Movies from "../components/Movies";
  import Loading from "../components/Loading";
  import BtnProxAnt from "../components/BtnProxAnt";

// ### HOOKS | INTERFACES ###
  import { useEffect, useState, FormEvent } from "react";
  import { useMovies,TMDBMovie } from "../hooks/useMovies";
  import { useParams } from "react-router-dom";


const Home = () => {
  const {loading, error, getMovies} = useMovies();
  const {currentPage} = useParams<{currentPage?:string}>()

  const [movies,setMovies] = useState<TMDBMovie[]>([]);
  const [page,setPage]     = useState<number>(()=>currentPage?Number(currentPage):1);

  // ### BUSCA OS FILMES ####
    useEffect(()=>{
      const loadMovies = async()=>{
        const data = await getMovies(page);
        setMovies(data);
      };
      loadMovies();
    },[getMovies,page]);
    // console.log(movies);
    // console.log(page);

  // ### MANIPULAÇÃO DAS PÁGINAS ####
    const nextPage = ()=>{
      setPage(prev=>prev+1);
    };
    const prevPage = ()=>{
      setPage(prev=>prev-1);
    }
    const iniPage = ()=>{
      setPage(1);
    }

  // ### PESQUISA ####
    const handleSubmit = (e:FormEvent<HTMLFormElement>)=>{
      e.preventDefault();
    }

  return (
    // <div className="max-w-[95%] sm:max-w-[80%] mx-auto ">
    <>

      {/* ### FORMULARIO DE BUSCA ### */}
        <section className="mb-10">
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
        </section>

        {/* ### MENU COM GENEROS ### */}
        <nav className="mb-10">
          generos
        </nav>

        {/* ### PAGINAÇÃO SUPERIOR ### */}
        {(!loading&&!error&&movies.length>0) &&
          <BtnProxAnt 
            page={page}
            iniPage={iniPage}
            nextPage={nextPage}
            prevPage={prevPage}
          ></BtnProxAnt>
        }

        {/* ### EXIBIÇÃO DOS FILMES ### */}
        {(loading&&!error) &&
          <Loading></Loading>
        }
        {(!loading&&!error&&movies.length>0) &&
          <Movies 
            movies={movies}
            currentPage={page}
          ></Movies>
        }
        {error && <p><i className="fa-solid fa-face-frown"></i> Infelizmente não foi possível trazer os filmes...</p>}

        {/* ### PAGINAÇÃO INFERIOR ### */}
        {(!loading&&!error&&movies.length>0) &&
          <BtnProxAnt 
            page={page}
            iniPage={iniPage}
            nextPage={nextPage}
            prevPage={prevPage}            
          ></BtnProxAnt>
        }
        
    </>
    // </div>
  )
};

export default Home