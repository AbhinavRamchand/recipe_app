import React, { useEffect } from 'react';
import { CardHeader } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Header = ({ user, page, favourites, favouriteRecipeIds }) => {

    const navigate = useNavigate();

    function goToMenu() {
        navigate("/m", {
            state: {
                user: user,
                favourites: favourites,
                favouriteRecipeIds: favouriteRecipeIds
            }
        });
    }

    function goToDashBoard() {
        navigate("/d", {
            state: {
                user: user,
                favourites: favourites,
                favouriteRecipeIds: favouriteRecipeIds
            }
        });
    }

    function goToFavourites() {
        navigate("/f", {
            state: {
                user: user,
                favourites: favourites,
                favouriteRecipeIds: favouriteRecipeIds
            }
        });
    }
        function handleLogout() {
        navigate("/");
    }

    return (
        <div>
            <CardHeader className='d-flex justify-content-between text-black'>
                <h3 onClick={goToDashBoard}>
                    <i className="bi bi-egg-fried"></i> Recipe App</h3>

                <div className='d-flex align-items-center'>
                    <h5 onClick={goToMenu}>
                        <i className="bi bi-three-dots-vertical">
                            </i>Menu{page === 2 && 
                            <i className="bi bi-feather"></i>}</h5>

                    <h5 className='mx-5' onClick={goToFavourites}>
                        <i className="bi bi-heart">
                            </i> Favourites{page === 3 && 
                            <i className="bi bi-feather"></i>}</h5>

                    <h5 onClick={handleLogout}><i className="bi bi-door-closed-fill"></i> Logout</h5>
                </div>
            </CardHeader>
        </div>
    );
};

export default Header;
