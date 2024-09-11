import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom"
import { GlobalContext } from "../../context";


export default function Details() {

    const params = useParams();      // { id } = useParams()

    const { recipeDetails, setRecipeDetails, handleAddToFavorites, favoritesList } = useContext(GlobalContext);

    // console.log(params);

    useEffect(() => {
        async function getRecipeDetails() {

            const response = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${params.id}`);
            const data = await response.json();

            // console.log(data);

            if (data) {
                setRecipeDetails(data.data)
            }
        }

        getRecipeDetails();
    }, [])

    console.log(recipeDetails);

    return (
        <div className='container mx-auto py-10 grid grid-cols-1 lg:grid-cols-2 gap-10'>
                    <div className="row-start-2 lg:row-start-auto">
                        <div className="h-96 overflow-hidden rounded-xl group">
                            <img
                                src={recipeDetails?.recipe?.image_url}
                                className="w-full h-full object-cover block group-hover:scale-105 duration-300" />
                        </div>
                    </div>
                    
                    <div className='flex flex-col gap-3'>
                        
                            <span className='text-sm text-cyan-700 font-medium'>
                                {recipeDetails?.recipe?.publisher}
                            </span>
                            <h3 className='font-bold text-2xl truncate text-black'>
                                {recipeDetails?.recipe?.title}
                            </h3>
                            <div>
                                <button 
                                    onClick = {() => handleAddToFavorites(recipeDetails?.recipe)}
                                    className="p-3 px-8 rounded-lg text-sm uppercase font-medium tracking-wider mt-3 inline-block shadow-md bg-black text-white">
                                    {
                                       favoritesList.length > 0 && 
                                       (favoritesList.findIndex((item) => item.id === recipeDetails?.recipe?.id) !== -1
                                       ? 'Remove From Favorites'
                                       : 'Add To Favorites'
                                    )
                                    }
                                </button>
                            </div>
                            <div>
                                <span className='text-2xl font-semibold text-black'>
                                    Ingredients:
                                </span>
                            </div>
                            <ul className="flex flex-col gap-3">
                                {recipeDetails?.recipe?.ingredients.map((ingredient) => (
                                    <li className="text-2xl font-semibold text-black">
                                            {ingredient.quantity} {ingredient.unit} {ingredient.description}     
                                    </li>
                                ))}
                            </ul>

                        </div>

        </div>
    )
}