import React from 'react';
import "./styles/ReservationsContent.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
    name: yup.string().required("Full name is a required field!"),
    email: yup.string().required("Email is a required field!").email("Email is not valid!"),
    telephone: yup.string()
        .required("Telephone is a required field!")
        .matches(/^(?:\+60[1-9][0-9]{1,2}\s?\d{3}\s?\d{4}|01[0-9]\s?\d{3}\s?\d{4})$/, "Phone number must match the format +60 1X XXX XXXX or 01X XXX XXXX"),
    pass: yup.string()
        .required("Password is required!")
        .min(6, "Password must be at least 6 characters"),
});

function Form() {
    const { handleSubmit, register, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const formSubmit = async (data) => {
        console.table(data);

        try {
            const response = await fetch('http://localhost:5000/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            const result = await response.json();
            if (response.ok) {
                alert(result.message);
            } else {
                alert('Error: ' + result.message);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while submitting the form.');
        }
    };

    return (
        <form onSubmit={handleSubmit(formSubmit)}>
            <fieldset>
                <div className="field">
                    <label htmlFor="name">Full Name</label>
                    <input type="text" placeholder="John Doe" {...register("name")} />
                    <span className="error-message">{errors.name?.message}</span>
                </div>
                <div className="field">
                    <label htmlFor="email">Email</label>
                    <input type="email" placeholder="text@email.com" {...register("email")} />
                    <span className="error-message">{errors.email?.message}</span>
                </div>
                <div className="field">
                    <label htmlFor="telephone">Telephone</label>
                    <input type="tel" placeholder="012 345 6789" {...register("telephone")} />
                    <span className="error-message">{errors.telephone?.message}</span>
                </div>
                <div className="field">
                    <label htmlFor="pass">Password</label>
                    <input type="password" placeholder="Password" {...register("pass")} />
                    <span className="error-message">{errors.pass?.message}</span>
                </div>
                <button className="reserve-btn" type="submit">Sign Up</button>
            </fieldset>
            <div>
                Have an account? <a href="/login">Login</a>
            </div>
        </form>
    );
}

export default Form;
