import { Key } from "./constants";


export const fetchData = async (searchQuery) => {
    try {
      const apiKey = Key;
      const apiUrl = "https://serpapi.com/search";
      const queryString = new URLSearchParams({
        engine: "google_shopping",
        q: searchQuery,
        api_key: apiKey,
      });
  
      const fetchUrl = `${apiUrl}?${queryString}`;
      const response = await fetch(fetchUrl);
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      return data?.shopping_results;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error; 
    }
  };

//   export  const filterResults = ({results, minPrice, maxPrice}) => {
//     const filtered = results.filter((result) => {
//       const price = parseFloat(result.price.replace(/[^0-9.-]+/g, '')); 
//       return (
//         (!minPrice || price >= parseFloat(minPrice)) &&
//         (!maxPrice || price <= parseFloat(maxPrice))
//       );
//     });
//     return filtered;
//   };



