import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Container, Row, Col } from "react-bootstrap"
import { UserContext } from '../context/UserProvider.js'




function Header() {

    const navigate = useNavigate(); 
    const { token, logout } = useContext(UserContext)

    return (
        <>
            <Navbar expand="md" className="navbar-color" variant="light">
                <Container>
            
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Row className="mx-auto flex-column flex-md-row">
                        <Col className="text-center">
                            <Link to="/" className="link">
                                Home
                            </Link>
                        </Col>
                        <Col className="text-center">
                            <Link to="/profile" className="link">
                                Profile
                        
                            </Link>
                        </Col>
                        
                        <Col className="text-center">
                            <Link to="/saucelist" className="link">
                                Sauce List
                            </Link>
                        </Col>
                        <Col className="text-center">
                            <Link to="/search" className="link">
                                Sauce Search
                            </Link>
                        </Col>
                    
                   
                        <Col className="text-center">
                    {token && <button type="submit" class="btn btn-danger" onClick={logout}>Logout</button>}
                    </Col>
                    </Row>
                   
                </Navbar.Collapse>
            </Container>
        </Navbar>
        </>
    )
};

export default Header;