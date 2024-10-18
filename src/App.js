import React from "react";
import Home from "./routes/Home";
import Menu from "./routes/Menu";
import Reservations from "./routes/Reservations";
import OrderOnline from "./routes/OrderOnline";
import Login from "./routes/Login";


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
      </Routes>
    </>
  );
}

export default App;
