import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";


export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {

    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const [recipeList, setRecipeList] = useState([]);
    const [recipeDetails, setRecipeDetails] = useState([]);
    const [favoritesList, setFavoritesList] = useState([]);

    const navigate = useNavigate();

    async function handleSubmit(e) {

        e.preventDefault();        // to prevent page refresh

        setLoading(true);

        try {

            const response = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes?search=${search}`);

            const data = await response.json();

            console.log(data.data);

            if (data.data) {                 // if(data) {} 
                setRecipeList(data.data.recipes);
                setLoading(false);
                setSearch('');

                navigate('/');

            }
        }
        catch (e) {

            console.log(e.message);
            setLoading(false);
            setSearch('');

        }
    }

    // console.log(loading, recipeList); 


    async function handleAddToFavorites(getCurrentDetails) {

        // console.log(getCurrentDetails);
        let copyFavoritesList = [...favoritesList];
        const index = copyFavoritesList.findIndex((item) => item.id === getCurrentDetails.id);

        if (index === -1) {
            copyFavoritesList.push(getCurrentDetails);
        }
        else {
            copyFavoritesList.splice(index, 1);           // copyFavoritesList.splice(index) -> If there is only one item to remove
        }

        setFavoritesList(copyFavoritesList);
    }



    return <GlobalContext.Provider
        value={{
                 search, setSearch, handleSubmit, recipeList, loading, recipeDetails,
                 setRecipeDetails, handleAddToFavorites, favoritesList
        }}>
        {children}
    </GlobalContext.Provider>;
}