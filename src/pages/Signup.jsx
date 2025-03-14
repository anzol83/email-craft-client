
import React, { useState } from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Header from '../components/Header.jsx';
import { Mail, Lock, User, ArrowLeft } from 'lucide-react';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!name || !email || !password || !confirmPassword) {
      toast.error('Please fill in all fields');
      return;
    }
    
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    
    // Simulate signup
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Account created successfully!');
      // In a real app, would redirect or set auth state here
    }, 1500);
  };
  
  return (
    <div className="min-vh-100 bg-light">
      <Header />
      
      <Container className="py-5 mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <Link to="/" className="btn btn-outline-primary mb-3 d-inline-flex align-items-center">
              <ArrowLeft size={16} className="me-1" />
              Back to Home
            </Link>
            
            <Card className="shadow-sm">
              <Card.Body className="p-4">
                <div className="text-center mb-4">
                  <Mail size={40} className="text-primary mb-2" />
                  <h2 className="fw-bold">Create an account</h2>
                  <p className="text-muted">Join EmailCraft to access all features</p>
                </div>
                
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Full Name</Form.Label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <User size={18} className="text-muted" />
                      </span>
                      <Form.Control
                        type="text"
                        placeholder="Enter your full name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                  </Form.Group>
                  
                  <Form.Group className="mb-3">
                    <Form.Label>Email address</Form.Label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <Mail size={18} className="text-muted" />
                      </span>
                      <Form.Control
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </Form.Group>
                  
                  <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <Lock size={18} className="text-muted" />
                      </span>
                      <Form.Control
                        type="password"
                        placeholder="Create a password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                  </Form.Group>
                  
                  <Form.Group className="mb-4">
                    <Form.Label>Confirm Password</Form.Label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <Lock size={18} className="text-muted" />
                      </span>
                      <Form.Control
                        type="password"
                        placeholder="Confirm your password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </div>
                  </Form.Group>
                  
                  <Button 
                    variant="primary" 
                    type="submit" 
                    className="w-100 py-2 mb-3"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Creating account...' : 'Sign Up'}
                  </Button>
                  
                  <div className="text-center">
                    <span className="text-muted">Already have an account? </span>
                    <Link to="/login" className="text-decoration-none">
                      Sign in
                    </Link>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Signup;
