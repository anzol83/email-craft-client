
import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import { ArrowRight } from 'lucide-react';

const TemplateCard = ({ template, index }) => {
  // Create a normalized category name for CSS classes
  const normalizedCategory = template.category.toLowerCase().replace(/\s+/g, '');
  
  // Define category color map
  const categoryColors = {
    'onboarding': '#4299e1',
    'academic': '#ed8936',
    'events': '#805ad5',
    'financial': '#48bb78',
    'administrative': '#3182ce',
    'campus life': '#0d9488',
    'career': '#d53f8c',
    'recognition': '#38a169',
    'personal': '#e53e3e'
  };
  
  // Get color based on normalized category or use a default
  const categoryColor = categoryColors[normalizedCategory] || '#4299e1';
  
  // Delay animation based on index
  const animationDelay = `${index * 0.1}s`;
  
  return (
    <Card 
      className="h-100 border-0 shadow-sm template-card hover-shadow transition"
      style={{ 
        animationDelay,
        transition: 'all 0.3s ease',
        transformOrigin: 'center',
        transform: 'translateY(0) scale(1)',
      }}
    >
      <div 
        className="card-img-top position-relative overflow-hidden" 
        style={{ 
          height: '140px', 
          backgroundColor: categoryColor,
          backgroundImage: `linear-gradient(45deg, ${categoryColor}, ${categoryColor}cc)`,
          borderBottom: '1px solid rgba(0,0,0,0.05)',
          transition: 'all 0.3s ease',
        }}
      >
        <div 
          className="p-3 h-100 w-100 d-flex align-items-start"
          style={{
            position: 'relative',
            zIndex: 2,
          }}
        >
          <span 
            className="badge bg-white bg-opacity-25 text-white"
            style={{
              transition: 'all 0.3s ease',
            }}
          >
            {template.category}
          </span>
        </div>
        <div 
          className="position-absolute top-0 left-0 w-100 h-100"
          style={{
            background: `linear-gradient(135deg, ${categoryColor}33, ${categoryColor}66)`,
            opacity: 0,
            transition: 'all 0.3s ease',
            transform: 'scale(1.2)',
          }}
        />
      </div>
      
      <Card.Body className="p-3 position-relative">
        <h5 
          className="card-title fs-5 fw-semibold mb-2"
          style={{
            transition: 'all 0.3s ease',
          }}
        >
          {template.title}
        </h5>
        <p 
          className="card-text text-muted small mb-0" 
          style={{ 
            minHeight: '50px',
            transition: 'all 0.3s ease',
          }}
        >
          {template.description}
        </p>
      </Card.Body>
      
      <Card.Footer className="bg-white border-0 p-3 pt-0">
        <Link 
          to={`/template/${template.id}`} 
          className="btn btn-outline-primary w-100 d-flex align-items-center justify-content-center"
          style={{
            transition: 'all 0.3s ease',
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          <span 
            style={{
              position: 'relative',
              zIndex: 2,
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            Use Template
            <ArrowRight 
              size={16} 
              className="ms-1"
              style={{
                transition: 'transform 0.3s ease',
              }}
            />
          </span>
        </Link>
      </Card.Footer>

      <style jsx>{`
        .template-card:hover {
          transform: translateY(-10px) scale(1.02);
          box-shadow: 0 15px 30px -10px rgba(0, 0, 0, 0.15) !important;
        }
        
        .template-card:hover .card-img-top {
          transform: translateY(-5px);
        }
        
        .template-card:hover .card-img-top .position-absolute {
          opacity: 1;
          transform: scale(1);
        }
        
        .template-card:hover .card-title {
          color: var(--primary-color);
        }
        
        .template-card:hover .btn-outline-primary {
          background-color: var(--primary-color);
          border-color: var(--primary-color);
          color: white;
        }
        
        .template-card:hover .btn-outline-primary svg {
          transform: translateX(3px);
        }
        
        .template-card:hover .badge {
          background-color: rgba(255, 255, 255, 0.4) !important;
          transform: translateY(2px);
        }
      `}</style>
    </Card>
  );
};

export default TemplateCard;
