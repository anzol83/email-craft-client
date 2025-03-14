import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Copy, Smartphone, Monitor } from 'lucide-react';

const EmailPreview = ({ template, content }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isCopied, setIsCopied] = useState(false);
  const [viewMode, setViewMode] = useState('desktop'); // 'desktop' or 'mobile'
  
  // Use provided content or fall back to template content
  const emailContent = content || (template ? template.content : '');

  useEffect(() => {
    // Short loading delay for better UX
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [template, content]);

  const handleCopy = () => {
    navigator.clipboard.writeText(emailContent);
    setIsCopied(true);
    toast.success('Email content copied!');
    
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  if (!template && !content) {
    return <div className="text-center p-4">No content to preview</div>;
  }

  return (
    <div className="bg-white rounded shadow-sm w-100">
      {/* Preview Header */}
      <div className="p-3 border-bottom d-flex justify-content-between align-items-center">
        <h3 className="fw-bold fs-5 mb-0" style={{ color: '#4a5568' }}>
          Email Preview
        </h3>
        
        <div className="d-flex gap-2">
          {/* View Toggles */}
          <div className="btn-group me-2">
            <button
              className={`btn btn-sm ${viewMode === 'desktop' ? 'btn-primary' : 'btn-outline-secondary'}`}
              onClick={() => setViewMode('desktop')}
              title="Desktop view"
            >
              <Monitor size={16} />
            </button>
            <button
              className={`btn btn-sm ${viewMode === 'mobile' ? 'btn-primary' : 'btn-outline-secondary'}`}
              onClick={() => setViewMode('mobile')}
              title="Mobile view"
            >
              <Smartphone size={16} />
            </button>
          </div>
          
          {/* Copy Button */}
          <button
            className="btn btn-sm btn-outline-primary d-flex align-items-center"
            onClick={handleCopy}
            title="Copy content"
          >
            <Copy size={16} className="me-1" />
            {isCopied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      </div>
      
      {/* Preview Content */}
      <div 
        className="p-4 email-preview-container" 
        style={{ 
          minHeight: '400px',
          maxHeight: '500px',
          overflowY: 'auto',
          backgroundColor: '#fff',
          width: viewMode === 'mobile' ? '380px' : '100%',
          margin: viewMode === 'mobile' ? '0 auto' : '0',
          border: viewMode === 'mobile' ? '8px solid #e2e8f0' : 'none',
          borderRadius: viewMode === 'mobile' ? '20px' : '0 0 4px 4px',
          transition: 'width 0.3s ease'
        }}
      >
        {isLoading ? (
          <div className="d-flex align-items-center justify-content-center h-100 w-100">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <div className="email-content" dangerouslySetInnerHTML={{ __html: emailContent }} />
        )}
      </div>
    </div>
  );
};

export default EmailPreview;
