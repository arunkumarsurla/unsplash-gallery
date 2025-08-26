import React, { useState } from "react";
import Header from "./components/Header";
import SearchResults from "./components/SearchResults";

const App = () => {
  const [query, setQuery] = useState("");

  return (
    <div>
      <Header onSearch={setQuery} />
      <SearchResults query={query} />
    </div>
  );
};

export default App;
