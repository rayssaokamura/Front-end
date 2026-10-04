import { useRef, useState } from "react";

import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function UploadArea({ setResultado }) {
  const inputRef = useRef(null);

  const [arquivo, setArquivo] = useState(null);
  const [preview, setPreview] = useState(null);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState(null);

  function handleArquivo(event) {
    const arquivoSelecionado = event.target.files[0];

    if (!arquivoSelecionado) return;

    setArquivo(arquivoSelecionado);

    const imagem = URL.createObjectURL(arquivoSelecionado);

    setPreview(imagem);
  }

  async function buscarAnime() {
    if (!arquivo) return;

    setCarregando(true);
    setErro(null);

    const formData = new FormData();

    formData.append("image", arquivo);

    try {
      const resposta = await fetch("https://api.trace.moe/search", {
        method: "POST",
        body: formData,
      });

      const dados = await resposta.json();

      console.log("Resposta do trace.moe:", dados);

      if (!resposta.ok) {
        console.error("Erro na API trace.moe:", dados);
        return;
      }

      if (!dados.result || dados.result.length === 0) {
        console.error("Nenhum anime encontrado.");
        return;
      }

      const anime = dados.result[0];

      const query = `
        query ($id: Int) {
          Media (id: $id, type: ANIME) {
            title {
              romaji
              english
              native
            }
          }
        }
      `;

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
    }
  }

  return (
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
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/gif"
            hidden
            onChange={handleArquivo}
          />

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
      </CardContent>
    </Card>
  );
}

export default UploadArea;