import { AsyncPaginate } from "react-select-async-paginate"
import { useState } from "react";
import { GEO_API_URL , geoApiOptions} from '../api';
const Search =({onSearchChange})=>{

    const [search,setSearch] = useState(null);


    const loadOptions= (inputValue)=>{
        try {
        return fetch(
          `${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`,
          geoApiOptions
        )
          .then((response) => response.json())
          .then((response) => {
            return {
              options: response.data.map((city) => {
                return {    
                  value: `${city.latitude} ${city.longitude}`,
                  label: `${city.name}, ${city.countryCode}`,
                };
              }),
              
            };
        
          });
        }
        catch (error) {
            console.error(error);
        }};
    const handleOnchange =(searchData)=>
    {
        setSearch(searchData);
        onSearchChange(searchData);
    }
    

    
        
    
    
    return(
        <AsyncPaginate
            placeholder="search for the city"
            debounceTimeout={600}
            value={search}
            loadOptions={loadOptions}
            onChange={handleOnchange}
        />
    )
}

export default Search;