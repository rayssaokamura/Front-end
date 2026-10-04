import { useRef, useState } from "react";

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

      const respostaAnime = await fetch("https://graphql.anilist.co", {
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
      });

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
    <section>
      <h2>Upload de Arquivo</h2>

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/gif"
        hidden
        onChange={handleArquivo}
      />

      <button onClick={() => inputRef.current.click()}>
        Escolher imagem
      </button>

      {arquivo && (
        <button onClick={buscarAnime} disabled={carregando}>
          Buscar anime
        </button>
      )}

      {arquivo && <p>Arquivo selecionado: {arquivo.name}</p>}

      {preview && (
        <img
          src={preview}
          alt="Prévia da imagem selecionada"
          width="300"
        />
      )}
    </section>
  );
}

export default UploadArea;