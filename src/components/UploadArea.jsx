<<<<<<< HEAD
import { useRef, useReducer, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";

// Reducer para gerenciar o estado do upload
const initialState = {
  carregando: false,
  erro: null,
};

function uploadReducer(state, action) {
  switch (action.type) {
    case "BUSCA_INICIO":
      return { carregando: true, erro: null };
    case "BUSCA_SUCESSO":
      return { carregando: false, erro: null };
    case "BUSCA_ERRO":
      return { carregando: false, erro: action.payload };
    default:
      return state;
  }
}
=======
import { useRef, useState } from "react";

import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
>>>>>>> 9754ffcc2e4883ab87a6ffa6107b65aee7c6cc70

function UploadArea({ setResultado }) {
  const inputRef = useRef(null);

  const [arquivo, setArquivo] = useState(null);
  const [preview, setPreview] = useState(null);
<<<<<<< HEAD
  const [state, dispatch] = useReducer(uploadReducer, initialState);

  function handleArquivo(event) {
    const arquivoSelecionado = event.target.files[0];
    if (!arquivoSelecionado) return;

    setArquivo(arquivoSelecionado);
    setPreview(URL.createObjectURL(arquivoSelecionado));
=======
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState(null);

  function handleArquivo(event) {
    const arquivoSelecionado = event.target.files[0];

    if (!arquivoSelecionado) return;

    setArquivo(arquivoSelecionado);

    const imagem = URL.createObjectURL(arquivoSelecionado);

    setPreview(imagem);
>>>>>>> 9754ffcc2e4883ab87a6ffa6107b65aee7c6cc70
  }

  async function buscarAnime() {
    if (!arquivo) return;

<<<<<<< HEAD
    dispatch({ type: "BUSCA_INICIO" });
    setResultado(null);

    const formData = new FormData();
=======
    setCarregando(true);
    setErro(null);

    const formData = new FormData();

>>>>>>> 9754ffcc2e4883ab87a6ffa6107b65aee7c6cc70
    formData.append("image", arquivo);

    try {
      const resposta = await fetch("https://api.trace.moe/search", {
        method: "POST",
        body: formData,
      });

      const dados = await resposta.json();

<<<<<<< HEAD
      if (!resposta.ok || !dados.result || dados.result.length === 0) {
        throw new Error("Nenhum anime foi encontrado para este ficheiro.");
=======
      console.log("Resposta do trace.moe:", dados);

      if (!resposta.ok) {
        console.error("Erro na API trace.moe:", dados);
        return;
      }

      if (!dados.result || dados.result.length === 0) {
        console.error("Nenhum anime encontrado.");
        return;
>>>>>>> 9754ffcc2e4883ab87a6ffa6107b65aee7c6cc70
      }

      const anime = dados.result[0];

<<<<<<< HEAD
      // Consulta AniList
      const query = `
        query ($id: Int) {
          Media (id: $id, type: ANIME) {
            title { romaji english native }
=======
      const query = `
        query ($id: Int) {
          Media (id: $id, type: ANIME) {
            title {
              romaji
              english
              native
            }
>>>>>>> 9754ffcc2e4883ab87a6ffa6107b65aee7c6cc70
          }
        }
      `;

<<<<<<< HEAD
      let tituloAnime = {
        romaji: anime.filename || "Desconhecido",
        english: anime.filename || "Desconhecido",
      };

      try {
        const respostaAnime = await fetch("https://graphql.anilist.co", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            query: query,
            variables: { id: anime.anilist },
          }),
        });

        const dadosAnime = await respostaAnime.json();
        if (respostaAnime.ok && dadosAnime.data?.Media?.title) {
          tituloAnime = dadosAnime.data.Media.title;
        }
      } catch (errAni) {
        console.warn("Erro ao consultar o AniList:", errAni);
      }

      setResultado({
        titulo: tituloAnime,
        image: anime.image,
        episode: anime.episode,
        similarity: anime.similarity,
        from: anime.from,
        to: anime.to,
      });

      dispatch({ type: "BUSCA_SUCESSO" });
    } catch (erro) {
      dispatch({
        type: "BUSCA_ERRO",
        payload: erro.message || "Erro ao processar imagem.",
      });
=======
      const respostaAnime = await fetch(
        "https://graphql.anilist.co",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: query,
            variables: {
              id: anime.anilist,
            },
          }),
        }
      );

      const dadosAnime = await respostaAnime.json();

      console.log("Resposta do AniList:", dadosAnime);

      if (!respostaAnime.ok || !dadosAnime.data?.Media) {
        console.error(
          "Erro ao buscar o anime no AniList:",
          dadosAnime
        );

        setResultado(anime);
        return;
      }

      setResultado({
        ...anime,
        titulo: dadosAnime.data.Media.title,
      });
    } catch (erro) {
      console.error("Erro ao buscar anime:", erro);
      setErro("Não foi possível identificar o anime.");
    } finally {
      setCarregando(false);
>>>>>>> 9754ffcc2e4883ab87a6ffa6107b65aee7c6cc70
    }
  }

  return (
<<<<<<< HEAD
    <Card sx={{ maxWidth: 600, margin: "20px auto", borderRadius: 3 }}>
      <CardContent sx={{ textAlign: "center", padding: 3 }}>
        <Typography variant="h5" gutterBottom>
          Upload de Arquivo
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 2 }}>
          Selecione uma imagem do seu computador
        </Typography>

        <Box sx={{ my: 2 }}>
=======
    <Card
      sx={{
        maxWidth: 600,
        margin: "30px auto",
        borderRadius: 3,
      }}
    >
      <CardContent
        sx={{
          textAlign: "center",
          padding: 4,
        }}
      >
        <Typography variant="h5">
          Upload de Arquivo
        </Typography>

        <Typography color="text.secondary">
          Selecione uma imagem de uma cena de anime
        </Typography>

        <Box sx={{ margin: 3 }}>
>>>>>>> 9754ffcc2e4883ab87a6ffa6107b65aee7c6cc70
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/gif"
            hidden
            onChange={handleArquivo}
          />

<<<<<<< HEAD
          <Button
            variant="outlined"
            onClick={() => inputRef.current.click()}
          >
            Escolher Imagem
          </Button>

          {preview && (
            <Box sx={{ mt: 2 }}>
              <Box
                component="img"
                src={preview}
                alt="Prévia"
                sx={{
                  maxWidth: "100%",
                  maxHeight: 250,
                  borderRadius: 2,
                  mb: 1,
                }}
              />
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                {arquivo.name}
              </Typography>
              <Button
                variant="contained"
                onClick={buscarAnime}
                disabled={state.carregando}
              >
                {state.carregando ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Analisar Imagem"
                )}
              </Button>
            </Box>
          )}
        </Box>

        {state.erro && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {state.erro}
          </Alert>
        )}
=======
          {!preview && (
            <Button
              variant="contained"
              onClick={() => inputRef.current.click()}
            >
              Escolher imagem
            </Button>
          )}

          {preview && (
            <>
              <Box
                component="img"
                src={preview}
                alt="Prévia da imagem"
                sx={{
                  width: "100%",
                  maxWidth: 400,
                  borderRadius: 2,
                  marginBottom: 2,
                }}
              />

              <Typography color="text.secondary">
                {arquivo.name}
              </Typography>

              <Button
                variant="contained"
                onClick={buscarAnime}
                disabled={carregando}
                sx={{ marginTop: 2 }}
              >
                Buscar anime
              </Button>
            </>
          )}
        </Box>
>>>>>>> 9754ffcc2e4883ab87a6ffa6107b65aee7c6cc70
      </CardContent>
    </Card>
  );
}

export default UploadArea;