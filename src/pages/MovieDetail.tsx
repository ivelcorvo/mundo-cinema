// ### COMPONENTES ###
  import Loading from '../components/Loading';
  import DetailsMovie from '../components/DetailsMovie';

// ### HOOKS | INTERFACES ###
  import { useEffect, useState } from 'react';
  import { useParams } from 'react-router-dom';
  import { useMovies, TMDBMovie } from '../hooks/useMovies';

type Props = {}

const MovieDetail = (props: Props) => {

  const {id, currentPage, search} = useParams();

  const {error,loading,getMovie} = useMovies();

  const [movie,setMovie] = useState<TMDBMovie>();

  useEffect(()=>{
    if(!id) return;
    const loadMovie = async(movieId:string)=>{
      const m = await getMovie(movieId);
      setMovie(m);
    };
    loadMovie(id);
  },[getMovie,id]);
  // console.log(movie);

  return (
    <>
      {loading && <Loading></Loading>}
      {(!error&&!loading&&movie) &&
        <DetailsMovie 
          movie={movie}
          currentPage={currentPage}
          search={search}
        ></DetailsMovie>
      }
      {error && <p><i className="fa-solid fa-face-frown"></i> Infelizmente não foi possível encontrar o filme...</p>}

    </>
  );
};

export default MovieDetail