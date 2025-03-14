import { Link } from 'react-router-dom';
import Header from '../components/Header.jsx';
import TemplateCard from '../components/TemplateCard.jsx';
import { Search, Mail, ArrowRight, Filter } from 'lucide-react';
import { Container, Row, Col, Dropdown } from 'react-bootstrap';



const Index = () => {


  return (
    <div className="min-vh-100 bg-light">
      <Header />
      
      {/* Hero Section */}
      <section className="py-5 position-relative border-bottom" 
        style={{ 
          paddingTop: '7rem',
          background: 'linear-gradient(90deg, #f5f7fa 0%, #c3cfe2 100%)'
        }}>
        <Container className="position-relative py-5" style={{ zIndex: 1 }}>
          <div className="text-center mx-auto" style={{ maxWidth: '800px' }}>
            <div 
              className="d-inline-flex align-items-center py-1 px-3 rounded-pill fs-6 fw-medium mb-4"
              style={{
                background: 'linear-gradient(90deg, rgba(139,92,246,0.15) 0%, rgba(167,139,250,0.15) 100%)',
                color: '#7e22ce'
              }}
            >
              <Mail size={14} className="me-1" />
              Professional Email Templates
            </div>
            
            <h1 className="display-4 fw-bold mb-4 text-gradient">
              Elevate Your Communications
            </h1>
            
            <p className="fs-5 mb-5" style={{ color: '#4b5563' }}>
              Ready-to-use email templates designed specifically for educational contexts. 
              Save time and communicate professionally with professors, administrators, and peers.
            </p>
            
            
          </div>
        </Container>
      </section>
      
      
      
      {/* CTA Section */}
      <section className="py-5 border-top" style={{ 
        background: 'linear-gradient(90deg, #f5f7fa 0%, #c3cfe2 100%)'
      }}>
        <Container className="text-center" style={{ maxWidth: '800px' }}>
          <div 
            className="p-5 rounded-4 shadow-sm cta-card"
            style={{ 
              background: 'linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.9) 100%)',
              backdropFilter: 'blur(10px)',
              transition: 'all 0.3s ease',
            }}
          >
            <h2 className="fs-2 fw-bold mb-3 cta-title" style={{ transition: 'transform 0.3s ease' }}>
              Ready to streamline your communications?
            </h2>
            <p className="fs-5 text-muted mb-4 cta-text" style={{ transition: 'transform 0.3s ease' }}>
              Browse our collection of professionally designed email templates and start sending effective emails today.
            </p>
            <Link 
              to="/login" 
              className="btn btn-primary btn-lg d-inline-flex align-items-center shadow-sm"
              style={{
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <span style={{ 
                position: 'relative',
                zIndex: 2,
                display: 'flex',
                alignItems: 'center',
                transition: 'transform 0.3s ease'
              }}>
                Show Templates
                <ArrowRight size={16} className="ms-2 cta-arrow" style={{ transition: 'transform 0.3s ease' }} />
              </span>
            </Link>
          </div>
        </Container>

        <style jsx>{`
          .cta-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 20px 40px -20px rgba(0, 0, 0, 0.2) !important;
            background: linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,1) 100%) !important;
          }
          
          .cta-card:hover .cta-title {
            transform: translateY(-2px);
          }
          
          .cta-card:hover .cta-text {
            transform: translateY(-2px);
          }
          
          .cta-card:hover .btn-primary {
            transform: translateY(-2px);
            box-shadow: 0 10px 20px -10px rgba(var(--primary-color), 0.5) !important;
          }
          
          .cta-card:hover .cta-arrow {
            transform: translateX(5px);
          }
        `}</style>
      </section>

      {/* Footer with Updated Gradient */}
      <footer className="py-4 border-top" style={{ 
        background: 'linear-gradient(to top, #accbee 0%, #e7f0fd 100%)'
      }}>
        <Container>
          <div className="row align-items-center">
            <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
              <div className="d-inline-flex align-items-center text-primary">
                <Mail size={24} strokeWidth={1.5} className="me-2" />
                <span className="fw-medium fs-5">Mail Muse</span>
              </div>
            </div>
            <div className="col-md-6 text-center text-md-end">
              <div className="text-muted small">
                &copy; {new Date().getFullYear()} Mail Muse. All rights reserved.
              </div>
            </div>
          </div>
        </Container>
      </footer>
    </div>
  );
};

export default Index;
