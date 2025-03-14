
import React, { useState } from 'react';
import { Form, Button, Card, InputGroup } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { Send, Mail } from 'lucide-react';

const EmailForm = ({ subject, setSubject, content, setContent }) => {
  const [recipient, setRecipient] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    
    if (!recipient.trim()) {
      toast.error('Please enter a recipient email address');
      return;
    }
    
    // In a real app, this would send the email to the recipient
    // For now, simulate sending and show success message
    toast.success(`Email sent to ${recipient}!`);
  };
  
  return (
    <Card className="shadow-sm border-0 h-100">
      <Card.Header className="bg-white border-0 p-4">
        <h3 className="fs-5 mb-0">Email Editor</h3>
      </Card.Header>
      
      <Card.Body className="p-4">
        <Form onSubmit={handleSend}>
          <Form.Group className="mb-4">
            <Form.Label>Subject</Form.Label>
            <Form.Control
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Enter email subject"
              className="py-2"
            />
          </Form.Group>
          
          <Form.Group className="mb-4">
            <Form.Label>Content</Form.Label>
            <div className="border rounded">
              <textarea
                className="form-control border-0"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={12}
                style={{ resize: 'vertical' }}
              />
            </div>
            <Form.Text className="text-muted">
              Use HTML formatting for rich text emails
            </Form.Text>
          </Form.Group>
          
          <Form.Group className="mb-4">
            <Form.Label>Send this email to</Form.Label>
            <InputGroup>
              <InputGroup.Text>
                <Mail size={16} />
              </InputGroup.Text>
              <Form.Control
                type="email"
                placeholder="recipient@example.com"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                required
              />
            </InputGroup>
          </Form.Group>
          
          <div className="d-flex">
            <Button 
              variant="primary" 
              type="submit" 
              className="px-4 py-2 d-flex align-items-center"
            >
              <Send size={16} className="me-2" />
              Send Email
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default EmailForm;
