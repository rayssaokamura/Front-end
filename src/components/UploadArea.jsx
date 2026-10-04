import { useRef, useState } from "react";

function UploadArea() {
  const inputRef = useRef(null);

  const [arquivo, setArquivo] = useState(null);
  const [preview, setPreview] = useState(null);

  function handleArquivo(event) {
    const arquivoSelecionado = event.target.files[0];

    if (!arquivoSelecionado) return;

    setArquivo(arquivoSelecionado);

    const imagem = URL.createObjectURL(arquivoSelecionado);
    setPreview(imagem);
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