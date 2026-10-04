# 🎬 Anime Episode Search

O **Anime Episode Search** é uma aplicação web interativa em React que permite identificar qual é o anime, o número do episódio e o minuto exato de uma cena. A busca pode ser feita colando a URL de uma imagem ou enviando um arquivo local do computador ou telemóvel.

---

## 🚀 Funcionalidades

- **Busca por Link (URL):** Cole a URL direta de uma imagem (.jpg, .png) para realizar a identificação.
- **Upload de Ficheiro Local:** Selecione uma imagem armazenada no seu dispositivo com visualização prévia antes da busca.
- **Identificação Precisa:** Exibe o título do anime em inglês e romaji, o número do episódio, a percentagem de similaridade e a marcação de tempo da cena.
- **Interface Responsiva & Glassmorphism:** Design moderno estilizado com Material UI e transparência adaptativa.

---

## 🛠️ Tecnologias e Bibliotecas Utilizadas

- **[React](https://react.dev/):** Biblioteca principal para a construção da interface.
- **[Vite](https://vitejs.dev/):** Ferramenta para criação e build rápido do projeto frontend.
- **[Material UI (@mui/material)](https://mui.com/):** Biblioteca externa de componentes de UI (`Card`, `Button`, `TextField`, `CircularProgress`, etc.).
- **[Emotion (@emotion/react e @emotion/styled)](https://emotion.sh/):** Utilizada internamente pelo Material UI para a estilização dos componentes.

---

## 🌐 APIs Utilizadas

1. **[trace.moe API](https://soruly.github.io/trace.moe-api/):** 
   - API pública e aberta para reconhecimento visual de imagens de animes.
   - Suporta busca via query string (`GET`) e envio de ficheiros via `FormData` (`POST`).
2. **[AniList GraphQL API](https://anilist.gitbook.io/anilist-apidocs/):** 
   - API pública para consultar dados de mídia.
   - Utilizada para traduzir o ID retornado pelo trace.moe no título oficial do anime em Romaji e Inglês.

---

## 🧠 Hooks do React Aplicados

- **`useReducer`:** Gerencia o fluxo de estados das requisições (`BUSCA_INICIO`, `BUSCA_SUCESSO`, `BUSCA_ERRO`), mantendo a lógica de carregamento e mensagens de erro organizadas nos componentes de busca.
- **`useRef`:** Utilizado no componente de upload para referenciar de forma imperativa o input do tipo `file` e disparar a janela de seleção de ficheiros.
- **`useState`:** Controle de inputs, links de pré-visualização da imagem e armazenamento do resultado final.

---

## 💻 Como Executar o Projeto Localmente

### Pré-requisitos
Certifique-se de ter instalado no seu computador:
- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- Gerenciador de pacotes `pnpm` ou `npm`

### Passo a Passo

1. **Clonar o repositório:**
   ```bash
   git clone [https://github.com/rayssaokamura/Front-end.git](https://github.com/rayssaokamura/Front-end.git)

2. **Entrar na pasta do projeto:**
    ```bash
    cd Front-end

3. **Instalar as dependências:**
    ```bash
    pnpm install # ou
    npm install.  

4. **Executar o servidor de desenvolvimento:**
    ```bash    
    pnpm dev # ou
    npm run dev

5. **Acessar no navegador:**
Abra o endereço exibido no terminal (geralmente http://localhost:5173/).