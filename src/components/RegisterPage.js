import React from 'react';
import "./styles/ReservationsContent.css";
import RegisterForm from './RegisterForm';

function RegisterPage() {

  return (
    <div className="res-content-wrapper">
        <div className="res-content-container">
            <div className="text">
                <h2>Experience the perfect balance of tradition and luxury.</h2>
                <p>At Little Lemon, we take great pride in providing our customers with the greatest luxurious experience with a touch of <em>tradition</em>.</p>
                <p>Book a table with us to share in this experience.</p>
            </div>
            <div className="form">
                <h1>Register Form</h1>
                <p>Please fill in and submit form to Join a member at Little Lemon.</p>
                
                <RegisterForm />
                
            </div>
        </div>
    </div>
  )
}

export default RegisterPage