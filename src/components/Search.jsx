/* eslint-disable react/prop-types */

import { useEffect, useRef, useState } from "react";
import { Key } from "../utils/constants";

const Search = ({onSearch}) => {

 
    const [searchQuery, setSearchQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const searchRef = useRef(null);


  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const apiUrl = `https://serpapi.com/search?q=${searchQuery}&api_key=${Key}&engine=google_trends_autocomplete`;
        const response = await fetch(apiUrl);
        const data = await response.json();

        setSuggestions(data?.suggestions || []);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
      }
    };
    if (searchQuery.trim() !== '') {
      fetchSuggestions();
    } else {
      setSuggestions([]); 
    }
  }, [searchQuery]);

// suggestion bar hide handle

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSuggestions([]);
      }
    };

    const handleScroll = () => {
      setSuggestions([]);
    };

    document.addEventListener('click', handleOutsideClick);
    document.addEventListener('scroll', handleScroll);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
      document.removeEventListener('scroll', handleScroll);
    };
  }, []);


  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    setSuggestions([]); 
    onSearch(suggestion);
  };


    const handleSearchClick = () => {
        onSearch(searchQuery);
      };


  return (
    <div className="container mx-auto fixed z-10">
    <nav className="flex items-center justify-between bg-gray-800 text-white h-20 p-5 relative">
      <div className="first-div w-296">
        <p className="text-3xl">Hello</p>
      </div>
      <div className="search-bar relative flex items-center">
      
        <input
          type="text"
          className="h-[2.6rem] px-6 focus:border-gray-400 focus:outline-none"
          placeholder="Search latest trends..."
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          className="h-[2.6rem] bg-green-500 text-white px-4 py-2"
          onClick={handleSearchClick}
        >
          Search
        </button>

        {suggestions.length > 0 && (
          <ul className="absolute z-10 left-0 w-full top-[2.1rem] mt-2 bg-gray-600">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => handleSuggestionClick(suggestion.title)}
                className="px-4 py-2 cursor-pointer hover:bg-gray-800"
              >
                {suggestion.title}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="third-div flex items-center space-x-4">
        <a
          href="#"
          className="bg-green-500 rounded-badge text-white px-4 py-2  focus:outline-none"
        >
          User
        </a>
      </div>
    </nav>
  </div>

  )
}
export default Search
