/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import { useEffect } from "react";
import { fetchData } from "../utils/helpers";


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


    



  return (
    <div>SearchResults</div>
  )
}

export default SearchResults