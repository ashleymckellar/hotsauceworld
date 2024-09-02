// import React, { useContext } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { UserContext } from '../context/UserProvider.js';
// import '../Header.css'; 

// const Header = () => {
//     const navigate = useNavigate();
//     const { token, logout } = useContext(UserContext);

//     return (
//         <nav className="navbar">
//             <div className="navbar-links">
//                 <Link to="/" className="link">
//                     Home
//                 </Link>
//                 <Link to="/profile" className="link">
//                     Profile
//                 </Link>
//                 <Link to="/saucelist" className="link">
//                     Sauce List
//                 </Link>
//                 <Link to="/search" className="link">
//                     Sauce Search
//                 </Link>
//                 <Link to="/random" className="link">
//                     Random Sauce
//                 </Link>
//                 <div className="logout-btn-div">
//                     {token && (
//                         <button className="logout-btn" onClick={logout}>
//                             Logout
//                         </button>
//                     )}
//                 </div>
//             </div>
//         </nav>
//     );
// };

// export default Header;


import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserProvider.js';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';


const Header = () => {
    const navigate = useNavigate();
    const { token, logout } = useContext(UserContext);

    return (
        <Navbar variant="dark" expand="lg" className='nav-flex'>
            <Navbar.Brand as={Link} to="/" className='navbar-brand home-link'>Hot Sauce World</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" className="custom-toggler" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto nav-links">
                    <Nav.Link as={Link} to="/profile" className='nav-links'>Profile</Nav.Link>
                    <Nav.Link as={Link} to="/saucelist" className='nav-links'>Sauce List</Nav.Link>
                    <Nav.Link as={Link} to="/search" className='nav-links'>Sauce Search</Nav.Link>
                    <Nav.Link as={Link} to="/random" className='nav-links'>Random Sauce</Nav.Link>
                </Nav>
                <Nav className="ml-auto logout-btn-div">
                    {token && (
                        <Nav.Link onClick={logout} className='logout-btn'>Logout</Nav.Link>
                    )}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default Header;

