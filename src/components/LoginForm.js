import React from 'react';
import "./styles/ReservationsContent.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
    email: yup.string().required("Email is a required field!").email("Email is not valid!"),
    pass: yup.string().required("Password is a required field!"),
});

function LoginForm() {
    const { handleSubmit, register, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const formSubmit = async (data) => {
        try {
            const response = await fetch('http://localhost:5000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
    
            const result = await response.json();
            if (response.ok) {
                localStorage.setItem('userName', result.userName);
                alert(result.message); // Success message
                window.location.href = '/'; 
            } else {
                alert('Error: ' + result.message); 
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while logging in.');
        }
    };

    
    

    return (
        <form onSubmit={handleSubmit(formSubmit)}>
            <fieldset>
                <div className="field">
                    <label htmlFor="email">Email</label>
                    <input type="text" placeholder="text@email.com" name="email" {...register("email")}/>
                    <span className="error-message">{errors.email?.message}</span>
                </div>
                <div className="field">
                    <label htmlFor="pass">Password</label>
                    <input type="password" placeholder="Password" name="pass" {...register("pass")}/>
                    <span className="error-message">{errors.pass?.message}</span>
                </div>
                <button className="reserve-btn" type="submit">Login</button>
            </fieldset>

            <div>
                New User? <a href="/register">Register</a>
            </div>
        </form>
    );
}

export default LoginForm;