import React, { useState } from 'react';
import Link from 'next/link';
import ImageForm from './components/imageform';

const HomePage: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    backgroundColor: '#f5f5f5',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    flexWrap: 'wrap'
  };

  const linkContainerStyle = {
    display: isOpen ? 'block' : 'none',
    width: '100%',
    backgroundColor: '#f9f9f9',
    textAlign: 'right', // Updated line
    paddingTop: '10px',
    paddingBottom: '10px',
  };

  const linkStyle = {
    color: '#333',
    marginRight: '15px',
    marginBottom: '10px',
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center'
  };

  const iconStyle = {
    fontSize: '1.2rem',
    marginRight: '5px'
  };

  const titleStyle = {
    fontSize: '1.2rem'
  };

  const handleOpenMenu = () => {
    setIsOpen(!isOpen);
  }

  return (
    <>
      <nav style={navStyle}>
        <Link href="/">
          <a style={linkStyle}>
            <span style={iconStyle}>⭐</span>
            <span style={titleStyle}>GALAI</span>
          </a>
        </Link>
        <div onClick={handleOpenMenu} style={{ cursor: 'pointer' }}>
          {isOpen ? '❌' : '☰'}
        </div>
        <div style={linkContainerStyle}>
          <Link href="/lab">
            <a style={linkStyle}>
              <span style={iconStyle}>🔬</span>
              LAB
            </a>
          </Link>
          <Link href="/collection">
  <a style={linkStyle}>
    <span style={iconStyle}>🎨</span>
    Collection
  </a>
</Link>
          <Link href="/recharge-credits">
            <a style={linkStyle}>
              <span style={iconStyle}>💲</span>
              Recharge Credits
            </a>
          </Link>
          <Link href="/login">
            <a style={linkStyle}>
              <span style={iconStyle}>👤</span>
              Sign In
            </a>
          </Link>
          <Link href="/account">
            <a style={linkStyle}>Account</a>
          </Link>
        </div>
      </nav>
      <ImageForm />
    </>
  );
}

export default HomePage;