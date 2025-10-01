// ### COMPONENTES ###
  import Movies from "../components/Movies";
  import Loading from "../components/Loading";
  import BtnProxAnt from "../components/BtnProxAnt";

// ### HOOKS | INTERFACES ###
  import { useEffect, useState, FormEvent } from "react";
  import { useMovies,TMDBMovie } from "../hooks/useMovies";
  import { useParams } from "react-router-dom";
  import { useFavorites } from "../hooks/useFavorites";


const Home = () => {

  // const {getIdsFavorites}                         = useFavorites();
  const {favorites,addIdFavorites,removeFavorite} = useFavorites();
  const {loading, error, getMovies, searchMovies} = useMovies();
  const {currentPage,search}                      = useParams<{currentPage?:string, search?:string}>()

  const [searchQuery,setSearchQuery] = useState<string>(()=>(search)?search:"");
  const [movies,setMovies]           = useState<TMDBMovie[]>([]);
  const [page,setPage]               = useState<number>(()=>(currentPage)?Number(currentPage):1);
  // const [favorites,setFavorites]     = useState<string[]>([]);


  // ### PESQUISA ####
    const handleSubmit = (e:FormEvent<HTMLFormElement>)=>{
      e.preventDefault();      
      setPage(1);
      setSearchQuery("");

      // const res = await searchMovies(searchQuery,page);
      // setMovies(res);
    }

  // ### BUSCA OS FILMES ####
    useEffect(()=>{
      const loadMovies = async()=>{
        let data:TMDBMovie[];
        if(searchQuery.trim()===""){
          data = await getMovies(page);
        }else{
          data = await searchMovies(searchQuery,page)
        }
        setMovies(data);
      };
      loadMovies();
    },[getMovies,searchMovies,page,searchQuery]);
    // console.log(movies);
    // console.log(page);

  // ### BUSCA OS IDS DOS FILMES FAVORITOS ####
    // useEffect(()=>{
    //   const loadFavorites = async()=>{
    //     const ids = await getIdsFavorites();
    //     setFavorites(ids);
    //   }
    //   loadFavorites();
    // },[getIdsFavorites]);
    // console.log(favorites);

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

  return (
    <>

      {/* ### FORMULARIO DE BUSCA ### */}
        <section className="mb-10">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-row relative">
              <input 
                type="text" 
                className={"bg-gray-700 w-full ps-4 pe-16 py-1 rounded-md"}  
                autoComplete="off"
                placeholder="Pesquise..."
                onChange={(e)=>{
                  setPage(1);
                  setSearchQuery(e.target.value);
                }}
                value={searchQuery}
              />
              <button
                type="submit"
                className="absolute right-2 top-1 hover:cursor-pointer"
              >
                Limpar
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
            search={searchQuery} 
            favorites={favorites}
            addIdFavorites={addIdFavorites}
            removeFavorite={removeFavorite}
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