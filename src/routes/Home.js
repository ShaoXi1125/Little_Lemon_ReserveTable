import React, { useRef } from 'react';
import HeaderElement from '../components/HeaderElement';
import HeroSection from '../components/HeroSection';
import Specials from '../components/Specials';
import About from '../components/About';
import Footer from '../components/Footer';

const Home = () => {
  const aboutRef = useRef(null);

  const scrollToAbout = () => {
    aboutRef.current.scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <>
      <HeaderElement scrollToAbout={scrollToAbout} />
      <HeroSection />
      <Specials />
      <About  ref={aboutRef} />
      <Footer />
    </>
  )
}

export default Home
