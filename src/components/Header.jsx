
import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Mail, FilePlus, HelpCircle } from 'lucide-react';

const Header = () => {
  return (
    <Navbar bg="white" expand="lg" className="shadow-sm py-3 fixed-top">
      <Container>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <Mail size={24} className="text-primary me-2" />
          <span className="fw-bold">Mail Muse / Email Craft</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/create-template" className="d-flex align-items-center mx-2">
              <FilePlus size={18} className="me-1" />
              Create Template
            </Nav.Link>
            <Nav.Link as={Link} to="/help" className="d-flex align-items-center mx-2">
              <HelpCircle size={18} className="me-1" />
              Help
            </Nav.Link>
          </Nav>
          <Nav className="d-flex gap-2">
            <Link to="/login" className="btn btn-outline-primary rounded-pill px-4">
              Sign In
            </Link>
            <Link to="/signup" className="btn btn-primary rounded-pill px-4">
              Sign Up
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
