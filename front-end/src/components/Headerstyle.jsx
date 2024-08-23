import React from 'react';
import styled from 'styled-components';

// Styled components
export const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #f5f5f5;
  padding: 0.5rem 1rem;
`;

export const Button = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`;

export const Title = styled.a`
  font-size: 1.25rem;
`;

// Navbar component
const Navbar = () => {
  return (
    <NavbarContainer>
      <div className="flex-none">
        <Button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block h-5 w-5 stroke-current">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </Button>
      </div>
      <div className="flex-1">
        <Title>daisyUI</Title>
      </div>
      <div className="flex-none">
        <Button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block h-5 w-5 stroke-current">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path>
          </svg>
        </Button>
      </div>
    </NavbarContainer>
  );
};

export default Navbar;
