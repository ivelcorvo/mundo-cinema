import { renderHook, act, waitFor } from "@testing-library/react";
import { useFavorites } from "./useFavorites";
import { apiRequest } from "../api/apiRequest";
import { auth } from "../firebase/firebase_config";

jest.mock("../api/apiRequest");
jest.mock("../firebase/firebase_config");

describe("useFavorites hook", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (auth.currentUser as any) = {
      uid: "user123",
      getIdToken: jest.fn().mockResolvedValue("fake-token")
    };
  });

  it("deve carregar favoritos ao montar o hook", async () => {
    const mockFavorites = ["550", "603"];
    (apiRequest as jest.Mock).mockResolvedValue(mockFavorites);

    const { result } = renderHook(() => useFavorites());

    // espera o estado de favoritos ser atualizado
    await waitFor(() => expect(result.current.favorites).toEqual(mockFavorites));

    expect(apiRequest).toHaveBeenCalledWith(
      `${process.env.REACT_APP_FIREBASE_REALTIME_DATABASE}/users/user123/favoritos.json`,
      "GET",
      undefined,
      "fake-token"
    );
    expect(result.current.error).toBeNull();
    expect(result.current.loading).toBe(false);
  });

  it("deve adicionar um favorito", async () => {
    const mockFavorites = ["550"];
    (apiRequest as jest.Mock)
      .mockResolvedValueOnce(mockFavorites)      // primeiro getIdsFavorites
      .mockResolvedValueOnce(true)               // addIdFavorites
      .mockResolvedValueOnce([...mockFavorites, "603"]); // segundo getIdsFavorites

    const { result } = renderHook(() => useFavorites());

    await waitFor(() => expect(result.current.favorites).toEqual(mockFavorites));

    await act(async () => {
      await result.current.addIdFavorites("603");
    });

    await waitFor(() => expect(result.current.favorites).toEqual(["550", "603"]));

    expect(apiRequest).toHaveBeenCalledWith(
      `${process.env.REACT_APP_FIREBASE_REALTIME_DATABASE}/users/user123/favoritos/603.json`,
      "PUT",
      true,
      "fake-token"
    );
  });

  it("deve tratar erro ao buscar favoritos", async () => {
    (apiRequest as jest.Mock).mockRejectedValue(new Error("Falha"));

    const { result } = renderHook(() => useFavorites());

    await waitFor(() => expect(result.current.error).toBeInstanceOf(Error));
    expect(result.current.favorites).toEqual([]);
  });
});
