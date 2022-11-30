import React, { useState, useContext } from 'react';
import { ThemeContext } from '../../lib/context/DarkThemeContext';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import logoImg from '../../assets/images/grit-white.webp';
import styles from './navbar.module.css';
// eslint-disable-next-line import/no-unresolved
import useMediaQuery from '@mui/material/useMediaQuery';
// eslint-disable-next-line import/no-unresolved
import { Drawer } from '@mui/material';
import { FaMoon } from 'react-icons/fa';
import { BsSunFill } from 'react-icons/bs';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('Home');
  


  const navigate = useNavigate();

  const context = useContext(ThemeContext);
  localStorage.setItem('theme', context.theme);
  const toggleDarkMode = () => {
      context.toggle();
  }
  const light = context.theme === 'light';


  const isTabletOrMobile = useMediaQuery('(max-width: 1000px)');
  const ismobile = useMediaQuery('(max-width: 700px)');

  return (
    <header className={styles._header} nav-theme={context.theme}>
      <button className={styles._nvlogo} onClick={() => navigate('/home')}>
        <img src={logoImg} alt="gritty" />
      </button>
      <button className={`${styles._themeswitch} ${light ? 'bg-[#493f72]' : 'bg-[#f5f4f7]'} `} onClick={toggleDarkMode}>
        {light ? <FaMoon /> : <BsSunFill className="text-[#ff9100] transition-all" />}
      </button>

      <div className={styles._nvmenu}>
        {!isTabletOrMobile && (
          <div className={styles._nvnav}>
            {[
              { title: 'Home', to: '/home' },
              { title: 'Converse', to: '/converse' },
              { title: 'About', to: '/about' },
              { title: 'Blog', to: '/blog' },
              { title: 'Contact', to: '/contact' },
              // { title: 'Log in', to: '/signin' },
            ].map((item) => (
              <NavLink
                to={item.to}
                key={item.title}
                onClick={(e) => setActiveNav(e.target.innerText)}
                className={`${activeNav === item.title ? 'font-bold ' : ''} `}
              >
                {item.title}
              </NavLink>
            ))}
          </div>
        )}
      </div>
      <div className={styles._nvstarted}>
        {isTabletOrMobile && (
          <Link to="#/" className={styles._mobilenav} onClick={() => setOpen(true)}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M16.4 9H3.6c-.552 0-.6.447-.6 1 0 .553.048 1 .6 1h12.8c.552 0 .6-.447.6-1 0-.553-.048-1-.6-1zm0 4H3.6c-.552 0-.6.447-.6 1 0 .553.048 1 .6 1h12.8c.552 0 .6-.447.6-1 0-.553-.048-1-.6-1zM3.6 7h12.8c.552 0 .6-.447.6-1 0-.553-.048-1-.6-1H3.6c-.552 0-.6.447-.6 1 0 .553.048 1 .6 1z" />
            </svg>
          </Link>
        )}
        {!ismobile && <button onClick={() => navigate('/signup')}>Get started</button>}
        <Drawer open={open} onClose={() => setOpen(false)} className={styles.DrawerNav}>
          <div className={styles._nvnav}>
            {[
              { title: 'Home', to: '/home' },
              { title: 'Converse', to: '/converse' },
              { title: 'About', to: '/about' },
              { title: 'Blog', to: '/blog' },
              { title: 'Contact', to: '/contact' },
              { title: 'Log in', to: '/signin' },
              // { title: 'Sign Up', to: '/signup' },
            ].map((item) => (
              <NavLink
                to={item.to}
                key={item.title}
                onClick={(e) => setActiveNav(e.target.innerText)}
                className={`${activeNav === item.title ? 'font-bold ' : ''} `}
              >
                {item.title}
              </NavLink>
            ))}
          </div>
        </Drawer>
      </div>
    </header>
  );
};

export default Navbar;
