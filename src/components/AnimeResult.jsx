function AnimeResult({ resultado }) {
<<<<<<< HEAD
  if (!resultado) return null;

  return (
    <section style={{ marginTop: "30px", textAlign: "center" }}>
      <h2>Anime Identificado</h2>

      <h3>
        {resultado.titulo?.english || resultado.titulo?.romaji || "Anime Desconhecido"}
      </h3>

      {resultado.image && (
        <img
          src={resultado.image}
          alt="Cena identificada"
          width="500"
          style={{ maxWidth: "100%", borderRadius: "8px" }}
        />
      )}

      <p><strong>Episódio:</strong> {resultado.episode || "N/A"}</p>

      <p>
        <strong>Similaridade:</strong> {(resultado.similarity * 100).toFixed(2)}%
      </p>

      {resultado.from !== undefined && resultado.to !== undefined && (
        <p>
          <strong>Momento:</strong> {resultado.from.toFixed(2)}s - {resultado.to.toFixed(2)}s
        </p>
      )}
=======
  if (!resultado) {
    return null;
  }

  return (
    <section>
      <h2>Anime Identificado</h2>

      <h3>
        {resultado.titulo?.english || resultado.titulo?.romaji}
      </h3>

      <img
        src={resultado.image}
        alt="Cena identificada"
        width="500"
      />

      <p>Episódio: {resultado.episode}</p>

      <p>
        Similaridade: {(resultado.similarity * 100).toFixed(2)}%
      </p>

      <p>
        Momento: {resultado.from.toFixed(2)}s - {resultado.to.toFixed(2)}s
      </p>
>>>>>>> 9754ffcc2e4883ab87a6ffa6107b65aee7c6cc70
    </section>
  );
}

export default AnimeResult;