import React, { useEffect, useState } from 'react'
import Header from './Header'
import { Button, Card, CardBody, Form, FormControl } from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router-dom';
import Suggestions from './Suggestions';

const Favourites = () => {

    const location = useLocation();
    const [favourites, setFavourites] = useState(location?.state?.favourites ? location?.state?.favourites : []);
    const [favouriteRecipeIds, setFavouriteRecipeIds] = useState(location?.state?.favouriteRecipeIds ? location?.state?.favouriteRecipeIds : []);

    const [user, setUser] = useState(location?.state?.user || {
        userName: "",
        userEmail: "",
        userPass: ""
    });

    const [keyword, setKeyword] = useState("");
    const [query, setQuery] = useState("");

    useEffect(() => {
        console.log(favourites);
        console.log(favouriteRecipeIds);
    }, [favouriteRecipeIds]);

    function handleSearch(event) {
        event.preventDefault();
        setQuery(keyword);
    }

    return (
        <div>
            <Card>
                <Header user={user} page={3} favourites={favourites} favouriteRecipeIds={favouriteRecipeIds} />
                <CardBody style={{ height: "auto" }}>
                    <Form method='post' onSubmit={handleSearch} className='container w-50 mb-2 d-flex btn-group'>
                        <FormControl value={keyword} onChange={(event) => setKeyword(event.target.value)}
                            placeholder='Search your saved favrourite dishes' autoFocus className='btn' style={{ border: "1px solid black" }} />
                        <Button type='submit'><i className="bi bi-search"></i></Button>
                    </Form>
                    <Suggestions count={6} query={""} page={3}
                        favourites={favourites} setFavourites={setFavourites}
                        favouriteRecipeIds={favouriteRecipeIds} setFavouriteRecipeIds={setFavouriteRecipeIds}
                    />
                </CardBody>
            </Card>
        </div>
    )
}

export default Favourites;