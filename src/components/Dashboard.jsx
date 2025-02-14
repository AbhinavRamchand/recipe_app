import React, { useEffect, useState } from 'react'
import { Card, CardBody, CardHeader } from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router-dom';
import Header from './Header';
import Suggestions from './Suggestions';

const Dashboard = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const [favourites, setFavourites] = useState(location?.state?.favourites ? location?.state?.favourites : []);
    const [favouriteRecipeIds, setFavouriteRecipeIds] = useState(location?.state?.favouriteRecipeIds ? location?.state?.favouriteRecipeIds : []);

    const [user, setUser] = useState(location?.state?.user || {
        userName: "",
        userEmail: "",
        userPass: ""
    });

    useEffect(() => {
        console.log(favourites);
        console.log(favouriteRecipeIds);
    }, [favouriteRecipeIds]);

    return (
        <>
        <style>{`
            /* Base Style */
            .navbar-brand {
              font-size: 24px;
              font-weight: bold;
              color: #333;
            }
    
            /* Animation for the username */
            .highlight {
              color: #ff6347; /* Initial color */
              display: inline-block;
              animation: bounceIn 1s ease, colorChange 2s infinite alternate;
            }
    
            /* Bounce animation */
            @keyframes bounceIn {
              0% {
                transform: translateY(-20px);
                opacity: 0;
              }
              50% {
                transform: translateY(10px);
                opacity: 1;
              }
              100% {
                transform: translateY(0);
                opacity: 1;
              }
            }
    
            /* Color change animation */
            @keyframes colorChange {
              0% {
                color: #ff6347;
              }
              50% {
                color: #3b82f6;
              }
              100% {
                color: #34d399;
              }
            }
          `}</style>
        <Card>
            <Header user={user} page={1} favourites={favourites} favouriteRecipeIds={favouriteRecipeIds} />
            <CardBody style={{ height: "auto" }}>
             <h3 classname = "navbar-brand">
                Hi <span className="highlight">{user.userName || 'Guest'}</span>, Welcome to the App!</h3> 
                <div className='px-4 pt-1'>
                    <h4 className='mb-2'>Suggestions</h4>
                    <Suggestions count={5} query={""} page={1}
                        favourites={favourites} setFavourites={setFavourites}
                        favouriteRecipeIds={favouriteRecipeIds} setFavouriteRecipeIds={setFavouriteRecipeIds}
                    />
                </div>
            </CardBody>
        </Card>
        </>
    )
}

export default Dashboard;