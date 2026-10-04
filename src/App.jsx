import { useState } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

import SearchByUrl from "./components/SearchByUrl";
import UploadArea from "./components/UploadArea";
import AnimeResult from "./components/AnimeResult";

function App() {
  const [resultado, setResultado] = useState(null);

  return (
    <Container maxWidth="md" sx={{ py: 4, textAlign: "center" }}>
      <Typography variant="h3" component="h1" fontWeight="bold" gutterBottom>
        Anime Episode Search
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" paragraph>
        Encontrou uma cena de anime e não sabe de onde é? Envie a imagem ou cole o link para descobrir o episódio!
      </Typography>

      {/* Opção 1: Busca via Link/URL */}
      <SearchByUrl setResultado={setResultado} />

      <Divider sx={{ my: 3 }}>OU</Divider>

      {/* Opção 2: Envio de Ficheiro Local */}
      <UploadArea setResultado={setResultado} />

      {/* Resultado da Identificação */}
      <AnimeResult resultado={resultado} />
    </Container>
  );
}

export default App;