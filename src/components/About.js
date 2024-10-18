import React from 'react';
import Restaurant from "../components/assets/restaurant.13306fcaa4576f20fd42.jpg"
import Chef from "../components/assets/Mario and Adrian b.6ba0e06bfa9c1ea75109.jpg"
import './styles/About.css'; // Create this CSS file to style your component

const AboutUs = () => {
  return (
    <div  className="about-us-container">
      <div className="about-us-content">
        <h1 className="about-us-title">Little Lemon</h1>
        <h2 className="about-us-location">Chicago</h2>
        <p className="about-us-description">
          Lorem ipsum dolor sit amet, consectetur adipiscing <br/>
          elit. Integer at ex leo. Maecenas enim sem, laoreet at <br/>
          nulla ac, luctus scelerisque massa. Praesent ut<br/>
          molestie nisi. Aliquam arcu lorem, auctor<br/> 
          condimentum blandit id, lobortis in nisi. Ut diam justo,<br/>
          euismod in accumsan id, vehicula sit amet tellus.
        </p>
      </div>
      <div className="about-us-images">  
  <img  
    src={Restaurant}  
    alt="Restaurant ambiance"  
    className="about-us-image restaurant-image"   
  />   
  <img  
    src={Chef}  
    alt="Restaurant chefs"  
    className="about-us-image chef-image"   
  />   
</div>  
    </div>
  );
};

export default AboutUs;
