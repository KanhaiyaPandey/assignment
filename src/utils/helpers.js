import { Key } from "./constants";


export const fetchData = async (searchQuery) => {
    try {
      const apiKey = Key;
      const apiUrl = "https://serpapi.com/search";
      const queryString = new URLSearchParams({
        engine: "google_shopping",
        q: searchQuery || "h&m",
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




