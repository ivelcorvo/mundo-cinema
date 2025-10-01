
// Mock da variável de ambiente antes de qualquer import
process.env.REACT_APP_FIREBASE_REALTIME_DATABASE = "https://fake-database.firebaseio.com";

import { renderHook, act, waitFor } from "@testing-library/react";
import { useFavorites } from "./useFavorites";
import { apiRequest } from "../api/apiRequest";

// Mock do apiRequest
jest.mock("../api/apiRequest");

// Mock do Firebase auth
jest.mock("../firebase/firebase_config", () => ({
  auth: {
    currentUser: {
      uid: "user123",
      getIdToken: jest.fn().mockResolvedValue("fake-token"),
    },
  },
}));

describe("useFavorites hook", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("deve carregar favoritos ao montar o hook", async () => {
    const mockResponse = { "550": true, "603": true };
    (apiRequest as jest.Mock).mockResolvedValue(mockResponse);

    const { result } = renderHook(() => useFavorites());

    await waitFor(() => expect(result.current.favorites).toEqual(["550", "603"]));
    expect(result.current.error).toBeNull();
    expect(result.current.loading).toBe(false);

    expect(apiRequest).toHaveBeenCalledWith(
      "https://fake-database.firebaseio.com/users/user123/favoritos.json",
      "GET",
      undefined,
      "fake-token"
    );
  });

  it("deve adicionar um favorito", async () => {
    (apiRequest as jest.Mock)
      .mockResolvedValueOnce({ "550": true })                // get inicial
      .mockResolvedValueOnce(true)                            // PUT adicionar
      .mockResolvedValueOnce({ "550": true, "603": true }); // get após adicionar

    const { result } = renderHook(() => useFavorites());

    await waitFor(() => expect(result.current.favorites).toEqual(["550"]));

    await act(async () => {
      await result.current.addIdFavorites("603");
    });

    await waitFor(() => expect(result.current.favorites).toEqual(["550", "603"]));

    expect(apiRequest).toHaveBeenCalledWith(
      "https://fake-database.firebaseio.com/users/user123/favoritos/603.json",
      "PUT",
      true,
      "fake-token"
    );
  });

  it("deve remover um favorito", async () => {
    (apiRequest as jest.Mock)
      .mockResolvedValueOnce({ "550": true, "603": true }) // get inicial
      .mockResolvedValueOnce(true)                           // DELETE remover
      .mockResolvedValueOnce({ "550": true });               // get após remover

    const { result } = renderHook(() => useFavorites());

    await waitFor(() => expect(result.current.favorites).toEqual(["550", "603"]));

    await act(async () => {
      await result.current.removeFavorite("603");
    });

    await waitFor(() => expect(result.current.favorites).toEqual(["550"]));

    expect(apiRequest).toHaveBeenCalledWith(
      "https://fake-database.firebaseio.com/users/user123/favoritos/603.json",
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
      .mockResolvedValueOnce({ "550": true })               // get inicial
      .mockRejectedValueOnce(new Error("Falha ao adicionar"));

    const { result } = renderHook(() => useFavorites());

    await waitFor(() => expect(result.current.favorites).toEqual(["550"]));

    await act(async () => {
      await result.current.addIdFavorites("603");
    });

    expect(result.current.error).toBeInstanceOf(Error);
    expect(result.current.favorites).toEqual(["550"]);
  });

  it("deve tratar erro ao remover favorito", async () => {
    (apiRequest as jest.Mock)
      .mockResolvedValueOnce({ "550": true, "603": true }) // get inicial
      .mockRejectedValueOnce(new Error("Falha ao remover"));

    const { result } = renderHook(() => useFavorites());

    await waitFor(() => expect(result.current.favorites).toEqual(["550", "603"]));

    await act(async () => {
      await result.current.removeFavorite("603");
    });

    expect(result.current.error).toBeInstanceOf(Error);
    expect(result.current.favorites).toEqual(["550", "603"]);
  });
});
