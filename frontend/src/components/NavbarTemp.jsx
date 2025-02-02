import React from 'react';
import { Link } from 'react-router-dom';

function NavbarTemp() {
  return (
    <nav style={styles.navbar}>
      <div style={styles.container}>
        <a style={styles.brand} href="#">Quora Mern</a>
        <div className="navbar-nav" style={styles.navItems}>
          <Link to="/" style={styles.navLink}>Create Post</Link>
          <Link to="/all" style={styles.navLink}>Read Posts</Link>
        </div>
      </div>
    </nav>
  );
}

const styles = {
  navbar: {
    backgroundColor: '#282c34',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    padding: '10px 0',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  brand: {
    fontSize: '1.8rem',
    fontWeight: '700',
    color: '#61dafb',
    textDecoration: 'none',
  },
  navItems: {
    display: 'flex',
    justifyContent: 'flex-end', // Align the links to the right side
    alignItems: 'center',
  },
  navLink: {
    padding: '10px 15px',
    color: '#ffffff',
    textDecoration: 'none',
    fontSize: '1.1rem',
    fontWeight: '500',
    transition: 'background-color 0.3s ease, color 0.3s ease',
  },
  navLinkHover: {
    backgroundColor: '#333333',
    color: '#61dafb',
  }
};

export default NavbarTemp;
