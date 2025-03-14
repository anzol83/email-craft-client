
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';
import Header from '../components/Header';
import { Home } from 'lucide-react';

const NotFound = () => {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate('/');
  };

  return (
    <div className="min-vh-100 bg-light">
      <Header />
      
      <Container className="py-5 my-5 text-center">
        <div className="py-5">
          <h1 className="display-1 fw-bold text-primary mb-3">404</h1>
          <h2 className="mb-4">Page Not Found</h2>
          <p className="text-muted mb-5">
            The page you are looking for doesn't exist or has been moved.
          </p>
          <Button 
            variant="primary" 
            className="d-inline-flex align-items-center px-4 py-2"
            onClick={handleHomeClick}
          >
            <Home size={18} className="me-2" />
            Back to Home
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default NotFound;
