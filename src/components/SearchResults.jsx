/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { fetchData } from "../utils/helpers.js";

const SearchResults = ({searchQuery}) => {

    const [results, setResults] = useState([]);
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [filteredResults, setFilteredResults] = useState([]);

    useEffect(() => {

      const fetchCardData = async () => {
        try {
          const data = await fetchData(searchQuery);
          setResults(data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
  
      fetchCardData();
    
    }, [searchQuery]);


    useEffect(() => {
   
      const filterResults = () => {
        const filtered = results.filter((result) => {
          const price = parseFloat(result.price.replace(/[^0-9.-]+/g, '')); 
          return (
            (!minPrice || price >= parseFloat(minPrice)) &&
            (!maxPrice || price <= parseFloat(maxPrice))
          );
        });
        setFilteredResults(filtered);
      };
  
      filterResults();

    }, [results, minPrice, maxPrice]);
  


  
    return (
      <div className="p-28">
      <div className="flex justify-center space-x-4 p-4">
  <input
    type="text"
    placeholder="Min Price"
    value={minPrice}
    onChange={(e) => setMinPrice(e.target.value)}
    className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-300"
  />
  <input
    type="text"
    placeholder="Max Price"
    value={maxPrice}
    onChange={(e) => setMaxPrice(e.target.value)}
    className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-300"
  />
  <button
   
    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
  >
    Filter
  </button>
</div>

      <div className="flex flex-wrap justify-around -mx-2 p-4">
        {filteredResults.map((result, index) => (
          <div
            key={index}
            className="relative w-full sm:w-1/2 md:w-1/2 lg:w-1/5 xl:w-1/5 p-2 sm:p-4 group hover:cursor-pointer"
          >
            
            <img
           src={result.thumbnail}
           alt={result.title}
           className="w-full h-40 object-cover rounded-xl"
            />
              <p className="text-sm font-semibold">{result.title}</p>
           <p className="text-sm">{result.price}</p>
          <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 text-white flex flex-col
           items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
           <button className="mt-2 bg-green-500 text-white py-2 px-4 rounded-full hover:bg-green-600 transition-colors duration-300">
             View Product
           </button>
           </div>
          </div>
        ))}
      </div>
    </div>
    );
  };

export default SearchResults



