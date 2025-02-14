import axios from 'axios';
import { FaHeart, FaRegHeart } from 'react-icons/fa'; 
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';

const Suggestions = ({ count, query, page, favourites, setFavourites, favouriteRecipeIds, setFavouriteRecipeIds }) => {

    const [suggestions, setSuggestions] = useState([]);
    const [dishCount, setDishCount] = useState(6);

    const words = [
        "carrot", "broccoli", "asparagus", "cauliflower", "corn", "cucumber", "green pepper",
        "lettuce", "mushrooms", "onion", "potato", "pumpkin", "red pepper", "tomato", "beetroot",
        "brussel sprouts", "peas", "zucchini", "radish", "sweet potato", "artichoke", "leek",
        "cabbage", "celery", "chili", "garlic", "basil", "coriander", "parsley", "dill", "rosemary",
        "oregano", "cinnamon", "saffron", "green bean", "bean", "chickpea", "lentil", "apple",
        "apricot", "avocado", "banana", "blackberry", "blackcurrant", "blueberry", "boysenberry",
        "cherry", "coconut", "fig", "grape", "grapefruit", "kiwifruit", "lemon", "lime", "lychee",
        "mandarin", "mango", "melon", "nectarine", "orange", "papaya", "passion fruit", "peach",
        "pear", "pineapple", "plum", "pomegranate", "quince", "raspberry", "strawberry", "watermelon",
        "salad", "pizza", "pasta", "popcorn", "lobster", "steak", "bbq", "pudding", "hamburger", "pie",
        "cake", "sausage", "tacos", "kebab", "poutine", "seafood", "chips", "fries", "masala", "paella",
        "som tam", "chicken", "toast", "marzipan", "tofu", "ketchup", "hummus", "chili", "maple syrup",
        "parma ham", "fajitas", "champ", "lasagna", "poke", "chocolate", "croissant", "arepas", "bunny chow",
        "pierogi", "donuts", "rendang", "sushi", "ice cream", "duck", "curry", "beef", "goat", "lamb", "turkey",
        "pork", "fish", "crab", "bacon", "ham", "pepperoni", "salami", "ribs"
    ];

    // I used a different API because the one provided reached API call limit.
    useEffect(() => {
        setDishCount(count);

        if (page === 3 && query.length === 0) {
            setDishCount(100);
            setFavouriteRecipeIds(favouriteRecipeIds);
            setFavourites(favourites);
            setSuggestions(favourites);
        }
        else if (query.length > 0) {
            const fetchData = async () => {
                try {
                    const response = await axios.get("https://forkify-api.herokuapp.com/api/search?q=" + query);
                    setDishCount(100);
                    setSuggestions(response.data.recipes);
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            };
            fetchData();
        } else {
            const fetchData = async () => {
                try {
                    const randomIndex = Math.floor(Math.random() * words.length);
                    const response = await axios.get("https://forkify-api.herokuapp.com/api/search?q=" + words[randomIndex]);
                    setSuggestions(response.data.recipes);
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            };
            fetchData();
        }
    }, [query]);

    function toggleFavourite(item) {
        if (favouriteRecipeIds.includes(item.recipe_id)) {
            const updatedFavouriteRecipeIds = favouriteRecipeIds.filter((id) => id !== item.recipe_id);
            const updatedFavourites = favourites.filter((dish) => dish.recipe_id !== item.recipe_id);
            setFavouriteRecipeIds(updatedFavouriteRecipeIds);
            setFavourites(updatedFavourites);
        } else {
            setFavouriteRecipeIds([...favouriteRecipeIds, item.recipe_id]);
            setFavourites([...favourites, item]);
        }
    }

    return (
        <div style={{ 
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',  
            paddingBottom: '50px'  
        }}>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '15px',
                padding: '10px',
                flex: 1 
            }}>
                {suggestions.map((item, index) => {
                    if (index < dishCount) {
                        return (
                            <div key={index} style={{
                                border: '1px solid #ddd',
                                borderRadius: '10px',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                overflow: 'hidden'
                            }}>
                                <img src={item.image_url} alt={item.title} style={{
                                    width: '100%', 
                                    height: '200px', 
                                    objectFit: 'cover'
                                }} />
                                <div style={{
                                    padding: '10px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    height: '250px'
                                }}>
                                    <h5>{item.title}</h5>
                                    <p>Publisher: {item.publisher}</p>
                                    <p>Rating: {Number.parseInt(item.social_rank)}</p>
                                    
                                    <Button
                                        variant="link"
                                        onClick={() => toggleFavourite(item)}
                                        style={{
                                            fontSize: '24px',
                                            color: favouriteRecipeIds.includes(item.recipe_id) ? 'red' : 'grey',
                                            padding: '0',
                                            marginLeft: 'auto',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        {favouriteRecipeIds.includes(item.recipe_id) ? <FaHeart /> : <FaRegHeart />}
                                    </Button>

                                    <a href={item.source_url} target='_blank' rel="noopener noreferrer" className="btn btn-link">
                                        Check Source
                                    </a>
                                </div>
                            </div>
                        );
                    }
                })}
            </div>

            {/* Footer */}
            <footer style={{
                backgroundColor: "#f8f9fa",
                textAlign: 'center',
                padding: '20px',
                marginTop: 'auto' 
            }}>
                <p>&copy; {new Date().getFullYear()} Recipe App. All rights reserved.</p>
                <p>Made with ❤️ for food lovers!</p>
            </footer>
        </div>
    );
}

export default Suggestions;
