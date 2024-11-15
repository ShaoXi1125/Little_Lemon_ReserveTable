import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';

const NavLinks = (props) => {
  const [userName, setUserName] = useState(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  // 在组件加载时获取用户名
  useEffect(() => {
    const storedUserName = localStorage.getItem('userName');
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);

  const handleLogout = () => {
    // 清除用户信息
    localStorage.removeItem('userName');
    setUserName(null);
    // 可以做重定向到登录页
    window.location.href = '/login'; // 或使用 React Router 进行跳转
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const animateFrom = { opacity: 0, y: -40 };
  const animateTo = { opacity: 1, y: 0 };

  return (
    <motion.ul className="menu-items" initial={animateFrom} animate={animateTo} transition={{ delay: 0.05 }}>
      <motion.li initial={animateFrom} animate={animateTo} transition={{ delay: 0.05 }}>
        <NavLink to="/" className="active-links">Home</NavLink>
      </motion.li>
      <motion.li initial={animateFrom} animate={animateTo} transition={{ delay: 0.15 }}>
        <NavLink to="/menu">Menu</NavLink>
      </motion.li>
      <motion.li initial={animateFrom} animate={animateTo} transition={{ delay: 0.20 }}>
        <NavLink to="/reservations" className="active-links">Reservations</NavLink>
      </motion.li>
      <motion.li initial={animateFrom} animate={animateTo} transition={{ delay: 0.25 }}>
        <NavLink to="/orderonline">Order Online</NavLink>
      </motion.li>
      {userName ? (
        <motion.li
          initial={animateFrom}
          animate={animateTo}
          transition={{ delay: 0.30 }}
          onClick={() => props.isMobile && props.closeMobileMenu()}
        >
          <div class='dropdown'>
            <span className="dropdown-toggle" onClick={toggleDropdown}>{userName}</span>
            {dropdownVisible && (
              <div className="dropdown-content">
                <a onClick={handleLogout}>Logout</a>
              </div>
            )}
          </div>
        </motion.li>
      ) : (
        <motion.li
          initial={animateFrom}
          animate={animateTo}
          transition={{ delay: 0.35 }}
          onClick={() => props.isMobile && props.closeMobileMenu()}
        >
          <NavLink to="/login" className="active-links">Login</NavLink>
        </motion.li>
      )}
    </motion.ul>
  );
};

export default NavLinks;