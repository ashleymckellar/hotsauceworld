// import React, { useContext } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { Navbar, Container, Row, Col } from "react-bootstrap"
// import { UserContext } from '../context/UserProvider.js'




// function Header() {

//     const navigate = useNavigate(); 
//     const { token, logout } = useContext(UserContext)

//     return (
//         <>
//             <Navbar expand="md" className="navbar-color" variant="light">
//                 <Container>
            
//             <Navbar.Toggle aria-controls="responsive-navbar-nav " />
//                 <Navbar.Collapse id="responsive-navbar-nav justify-content-between ">
//                     <Row className="mx-auto flex-column flex-md-row">
//                         <Col className="text-center">
//                             <Link to="/" className="link">
//                                 Home
//                             </Link>
//                         </Col>
//                         <Col className="text-center">
//                             <Link to="/profile" className="link">
//                                 Profile
                        
//                             </Link>
//                         </Col>
                        
//                         <Col className="text-center">
//                             <Link to="/saucelist" className="link">
//                                 Sauce List
//                             </Link>
//                         </Col>
//                         <Col className="text-center">
//                             <Link to="/search" className="link">
//                                 Sauce Search
//                             </Link>
//                         </Col>
                    
                   
//                         <Col className="text-center">
//                     {token && <button type="submit" class="logout-btn" onClick={logout}>Logout</button>}
//                     </Col>
//                     </Row>
                   
//                 </Navbar.Collapse>
//             </Container>
//         </Navbar>
//         </>
//     )
// };

// export default Header;

import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from '../context/UserProvider.js';
import '../Header.css'; // Make sure to create this CSS file

function Header() {
    const navigate = useNavigate();
    const { token, logout } = useContext(UserContext);

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-links">
                    <Link to="/" className="link">Home</Link>
                    <Link to="/profile" className="link">Profile</Link>
                    <Link to="/saucelist" className="link">Sauce List</Link>
                    <Link to="/search" className="link">Sauce Search</Link>
                    {token && <button className="logout-btn" onClick={logout}>Logout</button>}
                </div>
            </div>
        </nav>
    );
};

export default Header;
