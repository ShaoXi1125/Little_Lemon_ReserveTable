import React from 'react';
import "./styles/ReservationsContent.css";
import {useForm} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup";

const schema = yup.object({
    name: yup.string().required("Full name is a required field!"),
    email: yup.string().required("Email is a required field!").email("Email is not valid!"),
    telephone: yup.string().required("Telephone is a required field!").matches(/^(?:\+60[1-9][0-9]{1,2}\s?\d{3}\s?\d{4}|01[0-9]\s?\d{3}\s?\d{4})$/, "Phone number must match the format +60 1X XXX XXXX or 01X XXX XXXX"),
    guests: yup.number().min(1, "There must be at least 1 guest!").required("Please specify number of guests per table!"),
    date: yup.date()
    .min(new Date(), "Please select a date and time after now!") 
    .min(new Date(new Date().getTime() + 2 * 60 * 60 * 1000), "Please select a date and time at least 2 hours from now!")
    .required("Please select date and time!"),
});

function Form() {
    const { handleSubmit, register, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const formSubmit = async (data) => {
        console.table(data); // Log form data

        try {
            const response = await fetch('http://localhost:5000/api/reservations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();
            if (response.ok) {
                alert(result.message); // Success message
                // Optionally, clear the form or redirect the user
            } else {
                alert('Error: ' + result.message); // Handle errors
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
                    <input type="text" placeholder="John Doe" name="name" {...register("name")} />
                    <span className="error-message">{errors.name?.message}</span>
                </div>
                <div className="field">
                    <label htmlFor="email">Email</label>
                    <input type="text" placeholder="text@email.com" name="email" {...register("email")}/>
                    <span className="error-message">{errors.email?.message}</span>
                </div>
                <div className="field">
                    <label htmlFor="telephone">Telephone</label>
                    <input type="tel" placeholder="012 345 6789" name="telephone" {...register("telephone")}/>
                    <span className="error-message">{errors.telephone?.message}</span>
                </div>
                <div className="field">
                    <label htmlFor="Password">Password</label>
                    <input type="password" placeholder="Password" name="pass" {...register("pass")}/>
                    <span className="error-message">{errors.email?.message}</span>
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
