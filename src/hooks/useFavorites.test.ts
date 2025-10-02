import { renderHook, act } from "@testing-library/react";
import { useFavorites } from "./useFavorites";
import { apiRequest } from "../api/apiRequest";
import { auth } from "../firebase/firebase_config";

// --- Configuração da Autenticação Simulada ---

// Mock para a função de obtenção de token do usuário
const mockGetIdToken = jest.fn();
const mockUser = {
  // Definimos as propriedades essenciais para evitar erros de runtime no hook
  getIdToken: mockGetIdToken,
  uid: "mock-uid",
};

// 1. Mock do Firebase Auth: Garante que o objeto 'auth' e o 'currentUser' existem
jest.mock("../firebase/firebase_config", () => ({
  auth: {
    currentUser: mockUser,
  },
}));

// 2. Mock do Contexto: Simula o valor retornado pelo useAuth()
jest.mock("../context/AuthContext", () => ({
  useAuth: jest.fn(),
}));
const mockedUseAuth = require("../context/AuthContext").useAuth;


jest.mock("../api/apiRequest");
const mockedApiRequest = apiRequest as jest.MockedFunction<typeof apiRequest>;

// Valor injetado no useAuth: Simula um usuário logado com estado de carregamento finalizado
const defaultAuthContextValue = {
  user: mockUser,
  loading: false,
};

// --- Testes ---

describe("useFavorites", () => {
  beforeEach(() => {
    // Limpa o estado dos mocks para garantir isolamento entre os testes
    jest.clearAllMocks();
    // Garante que o contexto sempre retorna um usuário mockado e pronto
    mockedUseAuth.mockReturnValue(defaultAuthContextValue);
    // Mocka o valor de retorno do token de autenticação
    mockGetIdToken.mockResolvedValue("mock-token");
  });

  it("BUSCA OS IDS FAVORITOS (Inicial)", async () => {
    // Configura o mock da API para a busca inicial
    mockedApiRequest.mockResolvedValue({ "550": true, "603": true });

    const { result } = renderHook(() => useFavorites());

    // Resolve a Promise gerada pelo useEffect que chama getIdsFavorites
    await act(async () => {
      await result.current.getIdsFavorites();
    });

    // Verifica o estado final
    expect(result.current.favorites).toEqual(["550", "603"]);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it("TRATA ERRO AO TENTAR BUSCAR IDS FAVORITOS", async () => {
    mockedApiRequest.mockRejectedValue(new Error("Erro no fetch"));

    const { result } = renderHook(() => useFavorites());

    await act(async () => {
      await result.current.getIdsFavorites();
    });

    expect(result.current.favorites).toEqual([]);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeInstanceOf(Error);
  });

  it("ADICIONAR FAVORITO", async () => {
    // Mocks em sequência para 4 chamadas da API: [Busca Inicial, Busca Duplicada, PUT, Busca Atualizada]
    mockedApiRequest
      .mockResolvedValueOnce({ "550": true, "603": true })
      .mockResolvedValueOnce({ "550": true, "603": true })
      .mockResolvedValueOnce(undefined)
      .mockResolvedValueOnce({ "550": true, "603": true, "700": true });

    const { result } = renderHook(() => useFavorites());

    // Resolve a busca inicial (consome os dois primeiros mocks devido ao useEffect)
    await act(async () => {
      await result.current.getIdsFavorites();
    });

    // Confirma que o estado inicial foi carregado corretamente
    expect(result.current.favorites).toEqual(["550", "603"]);

    // Executa a AÇÃO (PUT) e espera a atualização do estado (consome mocks 3 e 4)
    await act(async () => {
      await result.current.addIdFavorites("700");
    });

    // Verifica o estado final após a adição
    expect(result.current.favorites).toEqual(["550", "603", "700"]);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it("REMOVER FAVORITO", async () => {
    // Mocks em sequência para 4 chamadas da API: [Busca Inicial, Busca Duplicada, DELETE, Busca Atualizada]
    mockedApiRequest
      .mockResolvedValueOnce({ "550": true, "603": true, "700": true }) // 1. Busca inicial
      .mockResolvedValueOnce({ "550": true, "603": true, "700": true }) // 2. Busca duplicada
      .mockResolvedValueOnce(undefined)                               // 3. Ação DELETE
      .mockResolvedValueOnce({ "603": true, "700": true });            // 4. Busca Atualizada

    const { result } = renderHook(() => useFavorites());

    // Resolve a busca inicial (consome os dois primeiros mocks do useEffect)
    await act(async () => {
      await result.current.getIdsFavorites();
    });

    // Confirma que o estado inicial foi carregado corretamente
    expect(result.current.favorites).toEqual(["550", "603", "700"]);

    // Executa a AÇÃO (DELETE) e espera a atualização do estado (consome mocks 3 e 4)
    await act(async () => {
      await result.current.removeFavorite("550");
    });

    // Verifica o estado final após a remoção
    expect(result.current.favorites).toEqual(["603", "700"]);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });
});