import { useState } from "react";
<<<<<<< HEAD
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

import SearchByUrl from "./components/SearchByUrl";
import UploadArea from "./components/UploadArea";
=======
import UploadArea from "./components/UploadArea";
import SearchByUrl from "./components/SearchByUrl";
>>>>>>> 9754ffcc2e4883ab87a6ffa6107b65aee7c6cc70
import AnimeResult from "./components/AnimeResult";

function App() {
  const [resultado, setResultado] = useState(null);

  return (
<<<<<<< HEAD
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
=======
    <>
      <SearchByUrl />
      <UploadArea setResultado={setResultado} />
      <AnimeResult resultado={resultado} />
    </>
>>>>>>> 9754ffcc2e4883ab87a6ffa6107b65aee7c6cc70
  );
}

export default App;