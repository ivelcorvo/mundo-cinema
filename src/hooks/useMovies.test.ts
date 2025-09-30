import { renderHook } from "@testing-library/react";
import { useMovies,TMDBMovie } from "./useMovies";
import tmdb from "../api/tmdb";
import { act } from "react";

jest.mock("../api/tmdb",()=>({
  get:jest.fn()
}));

describe("useMovies",()=>{
  
  beforeEach(()=>jest.clearAllMocks());

  it("RETORNA LISTA DE FILMES POPULARES", async()=>{
    const mockMovies: TMDBMovie[] = [
      { id: 1, title: 'Movie 1', poster_path: null, overview: '...', vote_average: 8, release_date: '...' },
      { id: 2, title: 'Movie 2', poster_path: null, overview: '...', vote_average: 7.5, release_date: '...' },
    ];

    (tmdb.get as jest.Mock).mockResolvedValue({data:{results:mockMovies}});
    const {result} = renderHook(()=>useMovies());
    let res: TMDBMovie[] | undefined;
    await act(async()=>{
      res = await result.current.getMovies();
    });

    expect(res).toEqual(mockMovies);
    expect(result.current.error).toBeNull();
    expect(result.current.loading).toBe(false);

    expect(tmdb.get).toBeCalledTimes(1);
  });

  it("RETORN FILMES PESQUISADOS POR QUERY", async()=>{
    const mockMovies:TMDBMovie[] = [
      { id: 1, title: 'Movie 1', poster_path: null, overview: '...', vote_average: 8, release_date: '...' },
      { id: 2, title: 'Movie 2', poster_path: null, overview: '...', vote_average: 7.5, release_date: '...' },
    ];

    (tmdb.get as jest.Mock).mockResolvedValue({data:{results:mockMovies}});
    const {result} = renderHook(()=>useMovies());
    let res: TMDBMovie[] | undefined;
    await act(async()=>{
      res = await result.current.searchMovies("1",1);
    });

    expect(res).toEqual(mockMovies);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();

    expect(tmdb.get).toBeCalledTimes(1);
  })

  it("RETORNA UM UNICO FILME", async()=>{
    const mockMovie:TMDBMovie = { id: 1, title: 'Movie 1', poster_path: null, overview: '...', vote_average: 8, release_date: '...' };
    (tmdb.get as jest.Mock).mockResolvedValue({data:mockMovie});

    const {result} = renderHook(()=>useMovies());

    let res: TMDBMovie | undefined;
    await act(async()=>{
      res = await result.current.getMovie("1");      
    });

    expect(res).toEqual(mockMovie);
    expect(result.current.error).toBeNull();
    expect(result.current.loading).toBe(false)
  });

});