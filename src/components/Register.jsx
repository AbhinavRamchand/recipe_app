import React, { useState } from 'react'
import { Button, Form, FormControl } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';

const Register = () => {

    const [user, setUser] = useState({
        userName: "",
        userEmail: "",
        userPass: ""
    });

    function handleChange(event) {
        setUser({ ...user, [event.target.name]: event.target.value });
    }

    const navigate = useNavigate();

    function handleSubmit(event) {
        event.preventDefault();
        navigate(
            "/l", {
            state: {
                user: user
            }
        }
        );
    }
    return (
        <div className='container w-50 mt-5'>
            <div className="card">
                <div className="card-header">
                    <h2 className='text-center'>Register</h2>
                </div>
                <Form method='post' onSubmit={handleSubmit}>
                    <div className="card-body">
                        <FormControl 
                            autoFocus
                            type='text' 
                            name='userName'
                            placeholder='Enter your name' 
                            className='mb-2' required
                            onChange={handleChange} value={user.userName} />

                        <FormControl 
                            type='email' 
                            name='userEmail' required
                            placeholder='Enter your email' 
                            className='mb-2'
                            onChange={handleChange} value={user.userEmail} />
                            
                        <FormControl 
                            type='password' 
                            name='userPass' 
                            required
                            placeholder='Enter your password'
                            onChange={handleChange} value={user.userPass} />
                    </div>
                    <div className="card-footer">
                        <h6><Button type='submit'><i class="bi bi-person-plus"></i> Register</Button></h6>
                    </div>
                </Form>
            </div>
        </div>
    )
}

export default Register;