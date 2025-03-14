import React from 'react';
import { Card } from 'react-bootstrap';
import { X, Info } from 'lucide-react';

const HelpTips = ({ onClose }) => {
  return (
    <Card className="mb-4 border-0 shadow-sm bg-light">
      <Card.Body className="p-4">
        <div className="d-flex justify-content-between align-items-start mb-3">
          <div className="d-flex align-items-center">
            <Info size={18} className="text-primary me-2" />
            <h5 className="mb-0">Tips for using templates</h5>
          </div>
          <button 
            onClick={onClose} 
            className="btn btn-sm btn-light rounded-circle p-1"
            aria-label="Close tips"
          >
            <X size={18} />
          </button>
        </div>
        
        <ul className="mb-0 ps-3">
          <li className="mb-2">Edit the template content to personalize your message</li>
          <li className="mb-2">Replace placeholder text like [Student Name] with real information</li>
          <li className="mb-2">Preview your email before sending to check formatting</li>
          <li>Use the copy feature to paste into your email client</li>
        </ul>
      </Card.Body>
    </Card>
  );
};

export default HelpTips;
