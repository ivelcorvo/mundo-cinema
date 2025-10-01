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
      getIdToken: jest.fn().mockResolvedValue("fake-token"),
    };
  });

  it("deve carregar favoritos ao montar o hook", async () => {
    const mockResponse = { "550": true, "603": true }; // formato real do Firebase
    (apiRequest as jest.Mock).mockResolvedValue(mockResponse);

    const { result } = renderHook(() => useFavorites());

    await waitFor(() => expect(result.current.favorites).toEqual(["550", "603"]));

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
    // simula o get inicial
    (apiRequest as jest.Mock)
      .mockResolvedValueOnce({ "550": true }) // getIdsFavorites inicial
      .mockResolvedValueOnce(true)            // PUT addIdFavorites
      .mockResolvedValueOnce({ "550": true, "603": true }); // getIdsFavorites após adicionar

    const { result } = renderHook(() => useFavorites());

    await waitFor(() => expect(result.current.favorites).toEqual(["550"]));

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

  it("deve remover um favorito", async () => {
    (apiRequest as jest.Mock)
      .mockResolvedValueOnce({ "550": true, "603": true }) // getIdsFavorites inicial
      .mockResolvedValueOnce(true)                           // DELETE removeFavorite
      .mockResolvedValueOnce({ "550": true });              // getIdsFavorites após remoção

    const { result } = renderHook(() => useFavorites());

    await waitFor(() => expect(result.current.favorites).toEqual(["550", "603"]));

    await act(async () => {
      await result.current.removeFavorite("603");
    });

    await waitFor(() => expect(result.current.favorites).toEqual(["550"]));

    expect(apiRequest).toHaveBeenCalledWith(
      `${process.env.REACT_APP_FIREBASE_REALTIME_DATABASE}/users/user123/favoritos/603.json`,
      "DELETE",
      undefined,
      "fake-token"
    );
  });

  it("deve tratar erro ao buscar favoritos", async () => {
    (apiRequest as jest.Mock).mockRejectedValue(new Error("Falha"));

    const { result } = renderHook(() => useFavorites());

    await waitFor(() => expect(result.current.error).toBeInstanceOf(Error));
    expect(result.current.favorites).toEqual([]);
    expect(result.current.loading).toBe(false);
  });

  it("deve tratar erro ao adicionar favorito", async () => {
    (apiRequest as jest.Mock)
      .mockResolvedValueOnce({ "550": true }) // getIdsFavorites inicial
      .mockRejectedValueOnce(new Error("Falha ao adicionar"));

    const { result } = renderHook(() => useFavorites());

    await waitFor(() => expect(result.current.favorites).toEqual(["550"]));

    await act(async () => {
      await result.current.addIdFavorites("603");
    });

    expect(result.current.error).toBeInstanceOf(Error);
    expect(result.current.favorites).toEqual(["550"]); // não adicionou
  });

  it("deve tratar erro ao remover favorito", async () => {
    (apiRequest as jest.Mock)
      .mockResolvedValueOnce({ "550": true, "603": true }) // getIdsFavorites inicial
      .mockRejectedValueOnce(new Error("Falha ao remover"));

    const { result } = renderHook(() => useFavorites());

    await waitFor(() => expect(result.current.favorites).toEqual(["550", "603"]));

    await act(async () => {
      await result.current.removeFavorite("603");
    });

    expect(result.current.error).toBeInstanceOf(Error);
    expect(result.current.favorites).toEqual(["550", "603"]); // não removeu
  });
});
