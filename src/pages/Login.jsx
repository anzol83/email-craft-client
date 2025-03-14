import React, { useState } from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Header from '../components/Header';
import { Mail, Lock, ArrowLeft } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }
    
    // Simulate login
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Login successful!');
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
                  <h2 className="fw-bold">Welcome back</h2>
                  <p className="text-muted">
                    Don't have an account yet?{' '}
                    <Link to="/signup" className="text-primary text-decoration-none fw-bold">
                      Sign up here
                    </Link>
                  </p>
                </div>
                
                <Form onSubmit={handleSubmit}>
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
                  
                  <Form.Group className="mb-4">
                    <div className="d-flex justify-content-between align-items-center">
                      <Form.Label>Password</Form.Label>
                      <Link to="/forgot-password" className="text-decoration-none small">
                        Forgot password?
                      </Link>
                    </div>
                    <div className="input-group">
                      <span className="input-group-text">
                        <Lock size={18} className="text-muted" />
                      </span>
                      <Form.Control
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                  </Form.Group>
                  
                  <Button 
                    variant="primary" 
                    type="submit" 
                    className="w-100 py-2 mb-4"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Signing in...' : 'Sign In'}
                  </Button>
                  
                  <div className="text-center border-top pt-4">
                    <p className="text-muted mb-0">New to EmailCraft?</p>
                    <Link to="/signup" className="btn btn-outline-primary mt-2 w-100">
                      Create an account
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

export default Login;
