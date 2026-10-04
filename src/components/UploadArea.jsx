import { useRef, useState } from "react";

function UploadArea() {
  const inputRef = useRef(null);
  const [arquivo, setArquivo] = useState(null);

  function handleArquivo(event) {
    const arquivoSelecionado = event.target.files[0];

    if (!arquivoSelecionado) return;

    setArquivo(arquivoSelecionado);
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

      {arquivo && <p>Arquivo selecionado: {arquivo.name}</p>}
    </section>
  );
}

export default UploadArea;