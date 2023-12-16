import { useState } from "react";
import Search from "./components/Search";
import SearchResults from "./components/SearchResults";

function App() {

  const [currentSearchQuery, setCurrentSearchQuery] = useState('');

  const handleSearch = (query) => {
    setCurrentSearchQuery(query);
  };

  return (
   <div>
    <Search handleSearch={handleSearch}/>
    <SearchResults searchQuery={currentSearchQuery} />
   </div>
  )
}

export default App
