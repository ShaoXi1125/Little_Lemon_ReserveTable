import React from 'react';
import { motion } from "framer-motion";
import { NavLink } from 'react-router-dom';


const NavLinks = (props) => {
  const animateFrom = {opacity: 0, y: -40}
  const animateTo = {opacity: 1, y: 0}
  return (
    <motion.ul className="menu-items" initial={animateFrom} animate={animateTo} transition={{delay: 0.05}}>
            <motion.li
              initial={animateFrom}
              animate={animateTo}
              transition={{delay: 0.05}}
              onClick={() => props.isMobile && props.closeMobileMenu()}
              >
                <NavLink to="/" className="active-links">Home</NavLink>
              </motion.li>
            {/* <motion.li
            initial={animateFrom}
            animate={animateTo}
            transition={{delay: 0.10}}
            onClick={() => {
              props.isMobile && props.closeMobileMenu();
              props.scrollToAbout();  // 点击 About 时调用 scrollToAbout 滚动到 About 部分
            }}
            >
              <NavLink to="#">About</NavLink>
            </motion.li> */}
            <motion.li
            initial={animateFrom}
            animate={animateTo}
            transition={{delay: 0.15}}
            onClick={() => props.isMobile && props.closeMobileMenu()}
            >
              <NavLink to="/menu">Menu</NavLink>
            </motion.li>
            <motion.li
            initial={animateFrom}
            animate={animateTo}
            transition={{delay: 0.20}}
            onClick={() => props.isMobile && props.closeMobileMenu()}
            >
              <NavLink to="/reservations" className="active-links">Reservations</NavLink>
            </motion.li>
            <motion.li
            initial={animateFrom}
            animate={animateTo}
            transition={{delay: 0.25}}
            onClick={() => props.isMobile && props.closeMobileMenu()}
            >
              <NavLink to="/orderonline">Order Online</NavLink>
            </motion.li>
            <motion.li
            initial={animateFrom}
            animate={animateTo}
            transition={{delay: 0.30}}
            onClick={() => props.isMobile && props.closeMobileMenu()}
            >
              <NavLink to="/login"  className="active-links">Login</NavLink>
            </motion.li>
            <motion.li
            initial={animateFrom}
            animate={animateTo}
            transition={{delay: 0.35}}
            onClick={() => props.isMobile && props.closeMobileMenu()}
            >
            </motion.li>
        </motion.ul>
  )
}

export default NavLinks