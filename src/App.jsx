import { useState } from "react";
import Search from "./components/Search";
import SearchResults from "./components/SearchResults";

const App = () => {

  const [currentSearchQuery, setCurrentSearchQuery] = useState('');

  const handleSearch = (query) => {
    setCurrentSearchQuery(query);
  };

  return (
    <div>
      <Search onSearch={handleSearch} />
      <SearchResults searchQuery={currentSearchQuery} />
    </div>
  );
};

export default App;
