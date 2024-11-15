import React from 'react';
import "./styles/ReservationsContent.css";
import LoginForm from './LoginForm';



function LoginPage() {

  return (
    <div className="res-content-wrapper">
        <div className="res-content-container">
            <div className="text">
                <h2>Experience the perfect balance of tradition and luxury.</h2>
                <p>At Little Lemon, we take great pride in providing our customers with the greatest luxurious experience with a touch of <em>tradition</em>.</p>
                <p>Book a table with us to share in this experience.</p>
            </div>
            <div className="form">
                <h1>Login</h1>
                <p>Please Login and submit form to book your reservation at Little Lemon.</p>
                
                <LoginForm />
                
            </div>
        </div>
    </div>
  )
}

export default LoginPage