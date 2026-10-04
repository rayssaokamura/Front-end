import { useState } from "react";
import UploadArea from "./components/UploadArea";
import SearchByUrl from "./components/SearchByUrl";
import AnimeResult from "./components/AnimeResult";

function App() {
  const [resultado, setResultado] = useState(null);

  return (
    <>
      <SearchByUrl />
      <UploadArea setResultado={setResultado} />
      <AnimeResult resultado={resultado} />
    </>
  );
}

export default App;