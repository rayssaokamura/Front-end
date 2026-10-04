<<<<<<< HEAD
import { useState, useReducer } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";


const initialState = {
  carregando: false,
  erro: null,
};

function searchReducer(state, action) {
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

function SearchByUrl({ setResultado }) {
  const [urlInput, setUrlInput] = useState("");
  const [state, dispatch] = useReducer(searchReducer, initialState);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!urlInput.trim()) return;

    dispatch({ type: "BUSCA_INICIO" });
    setResultado(null);

    try {
      const res = await fetch(
        `https://api.trace.moe/search?url=${encodeURIComponent(urlInput)}`
      );

      if (!res.ok) {
        throw new Error(
          "Não foi possível acessar a imagem. Use um link direto (.jpg ou .png)."
        );
      }

      const dados = await res.json();

      if (!dados.result || dados.result.length === 0) {
        throw new Error("Nenhum anime foi encontrado para esta URL.");
      }

      const anime = dados.result[0];

      
      const query = `
        query ($id: Int) {
          Media (id: $id, type: ANIME) {
            title { romaji english native }
          }
        }
      `;

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
        payload: erro.message || "Erro ao realizar busca por link.",
      });
    }
  };

  return (
    <Card sx={{ maxWidth: 600, margin: "20px auto", borderRadius: 3 }}>
      <CardContent sx={{ textAlign: "center", padding: 3 }}>
        <Typography variant="h5" gutterBottom>
          Buscar por Link 
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 2 }}>
          Cole a URL direta de uma imagem (.jpg/.png)
        </Typography>

        <Box
          component="form"
          onSubmit={handleSearch}
          sx={{ display: "flex", gap: 1, justifyContent: "center" }}
        >
          <TextField
            fullWidth
            size="small"
            variant="outlined"
            placeholder="https://exemplo.com/imagem.jpg"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            disabled={state.carregando}
          >
            {state.carregando ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Buscar"
            )}
          </Button>
        </Box>

        {state.erro && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {state.erro}
          </Alert>
        )}
      </CardContent>
    </Card>
=======
function SearchByUrl() {
  return (
    <section>
      <h2>Buscar por URL</h2>
      <p>Insira a URL de uma imagem para identificar o anime.</p>
    </section>
>>>>>>> 9754ffcc2e4883ab87a6ffa6107b65aee7c6cc70
  );
}

export default SearchByUrl;