import React from "react";
import Home from "./routes/Home";
import Menu from "./routes/Menu";
import Reservations from "./routes/Reservations";
import OrderOnline from "./routes/OrderOnline";
import Login from "./routes/Login";
import Register from "./routes/Register";


//import 'bootstrap/dist/css/bootstrap.min.css';
import {Route, Routes} from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path = "/" element = {<Home />}/>
        <Route path = "/Menu" element = {<Menu />}/>
        <Route path = "/reservations" element = {<Reservations />}/>
        <Route path = "/OrderOnline" element = {<OrderOnline />}/>
        <Route path = "/login" element = {<Login />}/>
        <Route path = "/register" element = {<Register />}/>
      </Routes>
    </>
  );
}

export default App;
