
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { ArrowLeft } from 'lucide-react';

const TemplateHeader = ({ title, description }) => {
  const navigate = useNavigate();
  
  const handleBackClick = () => {
    navigate('/');
  };
  
  return (
    <div className="mb-4">
      <Button 
        variant="link" 
        className="text-decoration-none p-0 mb-3 text-muted d-flex align-items-center"
        onClick={handleBackClick}
      >
        <ArrowLeft size={16} className="me-1" />
        Back to Templates
      </Button>
      
      <h1 className="fs-3 fw-bold mb-2">{title}</h1>
      <p className="text-muted mb-0">{description}</p>
    </div>
  );
};

export default TemplateHeader;
