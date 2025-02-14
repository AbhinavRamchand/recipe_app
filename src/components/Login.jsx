import React, { useEffect, useState } from 'react'
import { Button, Card, CardBody, CardFooter, CardHeader, Form, FormControl } from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router-dom';

const Login = () => {

    const [userEmail, setUserEmail] = useState("");
    const [userPass, setUserPass] = useState("");
    const [errorMessage, setErrorMessage] = useState("This error may have occurred if you have directly navigated to this page or something may have gone wrong.No need to worry navigate back and register again.");
    const [error, setError] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();

    const [user, setUser] = useState(location?.state?.user || {
        userName: "",
        userEmail: "",
        userPass: ""
    });

    useEffect(() => {
        if (user.userName === "" || user.userEmail === "" || user.userPass === "") {
            setError(true);
        }
    }, []);

    function handleSubmit(event) {
        event.preventDefault();
        if (userEmail === user.userEmail && userPass === user.userPass) {
            navigate("/d", {
                state: {
                    user: user
                }
            })
        } else {
            setErrorMessage("Credentials Incorrect!!");
            setError(true);
            setTimeout(() => {
                setError(false);
            }, 5000);
        }
    }

    return (
        <>
            {error ?
                <div 
                    className='container d-flex justify-content-center align-items-center' 
                    style={{
                        minHeight: '100vh',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <Card style={{ width: '350px' }}>
                        <CardHeader>
                            <h1>Error!!!</h1>
                        </CardHeader>
                        <CardBody>
                            {errorMessage}
                        </CardBody>
                        <CardFooter>
                            {errorMessage === "Credentials Incorrect!!" ? <></> : <Button onClick={() => navigate("/")}>Go Back</Button>}
                        </CardFooter>
                    </Card>
                </div> :
                <div 
                    className='container d-flex justify-content-center align-items-center' 
                    style={{
                        minHeight: '100vh',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <Card style={{ width: '350px' }}>
                        <CardHeader>
                            <h2 className='text-center'>Hi {user.userName}, Login Here</h2>
                        </CardHeader>
                        <Form method='post' onSubmit={handleSubmit}>
                            <CardBody>
                                <FormControl 
                                    type='email' 
                                    name='userEmail' 
                                    placeholder='Enter your email' 
                                    className='mb-3'
                                    onChange={(event) => setUserEmail(event.target.value)} value={userEmail} />
                                <FormControl 
                                    autoFocus
                                    type='password' 
                                    name='userPass' 
                                    placeholder='Enter your password'
                                    className='mb-3'
                                    onChange={(event) => setUserPass(event.target.value)} value={userPass} />
                            </CardBody>
                            <div className="card-footer">
                                <Button type="submit" className="w-100">
                                    <h6><i className="bi bi-door-open-fill"></i> Login</h6>
                                </Button>
                            </div>
                        </Form>
                    </Card>
                </div>
            }
        </>
    )
}

export default Login;
