function AnimeResult({ resultado }) {
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
    </section>
  );
}

export default AnimeResult;