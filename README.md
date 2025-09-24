# 🎬 Mundo Cinema

Aplicação desenvolvida em **React com TypeScript**, utilizando
**TailwindCSS** para estilização e **Firebase Authentication** para
login de usuários.

A aplicação consome a API do **TMDB** (via **Axios**) para:\
- Listar filmes em destaque\
- Exibir detalhes de cada filme\
- Gerenciar lista de favoritos (persistência do usuário autenticado)

## 🚀 Tecnologias Utilizadas

-   **React (Create React App)**\
-   **TypeScript**\
-   **TailwindCSS**\
-   **Firebase Authentication**\
-   **Axios** para consumo da API RESTful (TMDB)\
-   **GitHub Actions (CI/CD)** para deploy automático no **GitHub
    Pages**

## 🔒 Segurança e Deploy

O deploy é feito com **GitHub Actions**, garantindo integração e entrega
contínua.

-   Por padrão, o `GITHUB_TOKEN` já garante autenticação segura.\
-   No entanto, utilizei um **Personal Access Token (Fine-grained)** com
    permissões restritas (`Contents: Read & Write`) apenas para este
    repositório.

Essa escolha demonstra:\
- ✔️ Princípio de **menor privilégio**\
- ✔️ Conhecimento de **configurações avançadas do GitHub**\
- ✔️ Capacidade de adaptação do fluxo de autenticação

## 💡 Aprendizados e Boas Práticas

-   Integração com API RESTful usando Axios\
-   Tratamento de dados e estados globais com Context API\
-   Autenticação segura com Firebase\
-   CI/CD automatizado no GitHub Actions\
-   Interfaces **responsivas** com TailwindCSS

