import { renderHook } from "@testing-library/react";
import { useFavorites } from "./useFavorites";
import { apiRequest } from "../api/apiRequest";
import { auth } from "../firebase/firebase_config";
import { act } from "react";

jest.mock("../firebase/firebase_config",()=>({
  auth:{
    currentUser:{
      getIdToken:jest.fn(),
      uid:"mock-uid"
    }
  }
}));

jest.mock("../api/apiRequest");
const mockedApiRequest = apiRequest as jest.MockedFunction<typeof apiRequest>;

describe("useFavorites",()=>{
  beforeEach(()=>{
    jest.clearAllMocks();
  });

  it("BUSCA OS IDS FAVORITOS", async()=>{
    (auth.currentUser!.getIdToken as jest.Mock).mockResolvedValue("mock-token");

    mockedApiRequest.mockResolvedValue({
      '550': true,
      '603': true
    });

    const {result} = renderHook(()=>useFavorites());

    await act(async()=>{
      await result.current.getIdsFavorites();
    });

    expect(result.current.data).toEqual(["550","603"]);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull;
  });

  it('TRATA ERRO AO TENTAR BUSCAR IDS FAVORITOS', async ()=>{
    (auth.currentUser!.getIdToken as jest.Mock).mockResolvedValue('mock-token');
    mockedApiRequest.mockRejectedValue(new Error('Erro no fetch'));

    const { result } = renderHook(() => useFavorites());

    await act(async () => {
      await result.current.getIdsFavorites();
    });

    expect(result.current.data).toEqual([]);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeInstanceOf(Error);
  });

  it("ADICIONAR FAVORITO", async()=>{
    (auth.currentUser!.getIdToken as jest.Mock).mockResolvedValue("mock-token");

    mockedApiRequest.mockResolvedValue({
      '550': true,
      '603': true,
      '700': true
    });

    const {result} = renderHook(()=>useFavorites());
    await act(async()=>{
      await result.current.addIdFavorites("700");
    });

    expect(result.current.data).toEqual(['550', '603', '700']);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });


})