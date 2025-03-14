import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header.jsx';
import TemplateCard from '../components/TemplateCard.jsx';
import { Search, Mail, ArrowRight, Filter } from 'lucide-react';
import { Container, Row, Col, Dropdown } from 'react-bootstrap';

// Template data
const EMAIL_TEMPLATES = [
  {
    id: '1',
    title: 'Welcome to the University',
    description: 'A warm welcome message for new students joining the university.',
    category: 'Onboarding',
    previewImage: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2071&auto=format&fit=crop',
    content: `
      <h1 style="color: #1a56db; font-size: 24px; margin-bottom: 16px;">Welcome to University!</h1>
      <p>Dear [Student Name],</p>
      <p>We're thrilled to welcome you to our university community! Your journey with us begins now, and we're excited to see you grow academically and personally during your time here.</p>
      <p>Please take some time to explore our campus resources:</p>
      <ul>
        <li>Student Portal: Access your schedule, grades, and resources</li>
        <li>Campus Map: Find your way around our facilities</li>
        <li>Student Services: Support for all your academic needs</li>
      </ul>
      <p>If you have any questions, don't hesitate to reach out to your academic advisor.</p>
      <p>Best regards,<br>The Administration Team</p>
    `
  },
  {
    id: '2',
    title: 'Assignment Deadline Reminder',
    description: 'A friendly reminder about upcoming assignment deadlines.',
    category: 'Academic',
    previewImage: 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?q=80&w=2070&auto=format&fit=crop',
    content: `
      <h1 style="color: #e3742f; font-size: 24px; margin-bottom: 16px;">Assignment Deadline Reminder</h1>
      <p>Dear [Student Name],</p>
      <p>This is a friendly reminder that your <strong>[Assignment Name]</strong> for <strong>[Course Name]</strong> is due on <strong>[Date]</strong> at <strong>[Time]</strong>.</p>
      <p>Please ensure your assignment is submitted through the online portal before the deadline to avoid any late penalties.</p>
      <p>If you're experiencing any difficulties with the assignment, please reach out to your instructor during office hours or via email.</p>
      <p>Good luck with your submission!</p>
      <p>Best regards,<br>[Professor Name]</p>
    `
  },
  {
    id: '3',
    title: 'Event Invitation: Guest Lecture',
    description: 'Invitation to a special guest lecture by industry professionals.',
    category: 'Events',
    previewImage: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop',
    content: `
      <h1 style="color: #7e22ce; font-size: 24px; margin-bottom: 16px;">Special Guest Lecture Invitation</h1>
      <p>Dear [Student Name],</p>
      <p>We're excited to invite you to an exclusive guest lecture featuring <strong>[Speaker Name]</strong>, a leading expert in <strong>[Field]</strong> from <strong>[Organization]</strong>.</p>
      <div style="background-color: #f3f4f6; padding: 16px; border-radius: 8px; margin: 16px 0;">
        <p style="margin: 0;"><strong>Date:</strong> [Event Date]</p>
        <p style="margin: 8px 0;"><strong>Time:</strong> [Event Time]</p>
        <p style="margin: 0;"><strong>Location:</strong> [Event Location]</p>
      </div>
      <p>This is a valuable opportunity to gain industry insights and network with professionals in your field of study.</p>
      <p>Please RSVP by clicking the button below:</p>
      <a href="#" style="display: inline-block; background-color: #7e22ce; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px; margin-top: 8px;">RSVP Now</a>
      <p>We look forward to seeing you there!</p>
      <p>Best regards,<br>The Events Team</p>
    `
  },
  {
    id: '4',
    title: 'Scholarship Opportunity Announcement',
    description: 'Information about a new scholarship program available to students.',
    category: 'Financial',
    previewImage: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=2070&auto=format&fit=crop',
    content: `
      <h1 style="color: #16a34a; font-size: 24px; margin-bottom: 16px;">New Scholarship Opportunity</h1>
      <p>Dear [Student Name],</p>
      <p>We're pleased to announce a new scholarship opportunity that you may be eligible for: <strong>[Scholarship Name]</strong>.</p>
      <p>This scholarship offers:</p>
      <ul>
        <li>$[Amount] towards your tuition fees</li>
        <li>Eligibility for students in [Specific Programs/Years]</li>
        <li>Application deadline: [Date]</li>
      </ul>
      <p>To apply, please submit the following documents to the Financial Aid Office:</p>
      <ol>
        <li>Completed application form</li>
        <li>Current academic transcript</li>
        <li>Letter of recommendation</li>
        <li>Personal statement</li>
      </ol>
      <p>Don't miss this opportunity to support your academic journey!</p>
      <p>Best regards,<br>Financial Aid Office</p>
    `
  },
  {
    id: '5',
    title: 'Course Registration Open',
    description: 'Notification that course registration for the next semester is now open.',
    category: 'Administrative',
    previewImage: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop',
    content: `
      <h1 style="color: #2563eb; font-size: 24px; margin-bottom: 16px;">Course Registration Now Open</h1>
      <p>Dear [Student Name],</p>
      <p>We're writing to inform you that course registration for the [Season] [Year] semester is now open. Registration will remain open until [End Date].</p>
      <p>Important dates to remember:</p>
      <div style="background-color: #f3f4f6; padding: 16px; border-radius: 8px; margin: 16px 0;">
        <p style="margin: 0;"><strong>Registration Opens:</strong> [Start Date]</p>
        <p style="margin: 8px 0;"><strong>Registration Closes:</strong> [End Date]</p>
        <p style="margin: 8px 0;"><strong>Add/Drop Period:</strong> [Period Dates]</p>
        <p style="margin: 0;"><strong>Classes Begin:</strong> [First Day of Classes]</p>
      </div>
      <p>Please note that some courses fill up quickly, so we encourage you to register as early as possible to secure your preferred schedule.</p>
      <p>You can access the registration portal through your student account at [Website Link].</p>
      <p>If you need assistance with registration, please contact your academic advisor.</p>
      <p>Best regards,<br>Registrar's Office</p>
    `
  },
  {
    id: '6',
    title: 'Campus Facilities Update',
    description: 'Updates about changes to campus facilities and operating hours.',
    category: 'Campus Life',
    previewImage: 'https://images.unsplash.com/photo-1607013407627-6848710191ad?q=80&w=1939&auto=format&fit=crop',
    content: `
      <h1 style="color: #0891b2; font-size: 24px; margin-bottom: 16px;">Campus Facilities Update</h1>
      <p>Dear Students,</p>
      <p>We'd like to inform you about some important updates to our campus facilities and their operating hours:</p>
      <h2 style="color: #0891b2; font-size: 18px; margin-top: 20px;">Library Hours Extended</h2>
      <p>The main library will now be open until midnight Sunday through Thursday to accommodate study needs during the exam period.</p>
      <h2 style="color: #0891b2; font-size: 18px; margin-top: 20px;">Fitness Center Renovation</h2>
      <p>The campus fitness center will be closed for renovations from [Start Date] to [End Date]. During this time, students can use the athletic complex facilities with their student ID.</p>
      <h2 style="color: #0891b2; font-size: 18px; margin-top: 20px;">New Study Spaces</h2>
      <p>We've added new 24-hour study spaces in the following locations:</p>
      <ul>
        <li>Student Union Building (2nd floor)</li>
        <li>Science Complex (Room 103)</li>
        <li>Arts Building (East Wing)</li>
      </ul>
      <p>Thank you for your attention to these updates. We're committed to providing you with the best campus experience possible.</p>
      <p>Best regards,<br>Campus Management</p>
    `
  },
  {
    id: '7',
    title: 'Internship Opportunity',
    description: 'Information about a new internship program with industry partners.',
    category: 'Career',
    previewImage: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=2070&auto=format&fit=crop',
    content: `
      <h1 style="color: #be185d; font-size: 24px; margin-bottom: 16px;">Exclusive Internship Opportunity</h1>
      <p>Dear [Student Name],</p>
      <p>We're excited to share an exclusive internship opportunity with [Company Name], a leading organization in the [Industry] sector.</p>
      <div style="background-color: #f3f4f6; padding: 16px; border-radius: 8px; margin: 16px 0;">
        <p style="margin: 0;"><strong>Position:</strong> [Internship Title]</p>
        <p style="margin: 8px 0;"><strong>Duration:</strong> [Time Period]</p>
        <p style="margin: 8px 0;"><strong>Compensation:</strong> [Paid/Unpaid] + [Benefits if any]</p>
        <p style="margin: 0;"><strong>Application Deadline:</strong> [Date]</p>
      </div>
      <p>This internship is ideal for students majoring in [Relevant Programs] and offers valuable hands-on experience in [Skills/Areas].</p>
      <p>To apply, please submit your resume and cover letter through the Career Services portal by the deadline mentioned above.</p>
      <p>A representative from [Company Name] will be on campus for an information session on [Date] at [Time] in [Location].</p>
      <p>Don't miss this opportunity to gain practical experience and build your professional network!</p>
      <p>Best regards,<br>Career Services Team</p>
    `
  },
  {
    id: '8',
    title: 'Exam Schedule Announcement',
    description: 'Final examination schedule and important information for students.',
    category: 'Academic',
    previewImage: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop',
    content: `
      <h1 style="color: #dc2626; font-size: 24px; margin-bottom: 16px;">Final Examination Schedule</h1>
      <p>Dear [Student Name],</p>
      <p>The final examination schedule for the current semester has been released. Please review your exam dates, times, and locations carefully.</p>
      <p>Your personal exam schedule is as follows:</p>
      <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
        <tr style="background-color: #f3f4f6;">
          <th style="border: 1px solid #d1d5db; padding: 8px; text-align: left;">Course</th>
          <th style="border: 1px solid #d1d5db; padding: 8px; text-align: left;">Date</th>
          <th style="border: 1px solid #d1d5db; padding: 8px; text-align: left;">Time</th>
          <th style="border: 1px solid #d1d5db; padding: 8px; text-align: left;">Location</th>
        </tr>
        <tr>
          <td style="border: 1px solid #d1d5db; padding: 8px;">[Course 1]</td>
          <td style="border: 1px solid #d1d5db; padding: 8px;">[Date 1]</td>
          <td style="border: 1px solid #d1d5db; padding: 8px;">[Time 1]</td>
          <td style="border: 1px solid #d1d5db; padding: 8px;">[Location 1]</td>
        </tr>
        <tr style="background-color: #f3f4f6;">
          <td style="border: 1px solid #d1d5db; padding: 8px;">[Course 2]</td>
          <td style="border: 1px solid #d1d5db; padding: 8px;">[Date 2]</td>
          <td style="border: 1px solid #d1d5db; padding: 8px;">[Time 2]</td>
          <td style="border: 1px solid #d1d5db; padding: 8px;">[Location 2]</td>
        </tr>
      </table>
      <p>Important exam policies to remember:</p>
      <ul>
        <li>Arrive at least 15 minutes before your scheduled exam time</li>
        <li>Bring your student ID and necessary stationary</li>
        <li>Electronic devices are not permitted unless specifically authorized</li>
        <li>If you have an exam conflict, contact the Registrar's Office immediately</li>
      </ul>
      <p>Study resources are available at the Learning Center, including tutoring sessions and review workshops.</p>
      <p>Good luck with your examinations!</p>
      <p>Best regards,<br>Office of Academic Affairs</p>
    `
  }
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTemplates, setFilteredTemplates] = useState(EMAIL_TEMPLATES);
  const [selectedCategory, setSelectedCategory] = useState(null);
  
  const categories = Array.from(new Set(EMAIL_TEMPLATES.map(template => template.category)));
  
  useEffect(() => {
    let results = EMAIL_TEMPLATES;
    
    if (searchQuery) {
      results = results.filter(template => 
        template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (selectedCategory) {
      results = results.filter(template => 
        template.category === selectedCategory
      );
    }
    
    setFilteredTemplates(results);
  }, [searchQuery, selectedCategory]);

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
            
            {/* Search Bar with Improved Design */}
            <div className="position-relative mx-auto mb-5" style={{ maxWidth: '600px' }}>
              <div className="input-group shadow-sm">
                <span className="input-group-text bg-white border-end-0">
                  <Search size={18} className="text-muted" />
                </span>
                <input
                  type="text"
                  className="form-control border-start-0 py-2"
                  placeholder="Search templates by name or description..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                
                {/* Filter Dropdown */}
                <Dropdown>
                  <Dropdown.Toggle variant="outline-secondary" id="dropdown-basic" className="border-start-0">
                    <Filter size={18} />
                  </Dropdown.Toggle>

                  <Dropdown.Menu align="end" className="shadow-sm">
                    <Dropdown.Item 
                      active={!selectedCategory}
                      onClick={() => setSelectedCategory(null)}
                    >
                      All Categories
                    </Dropdown.Item>
                    {categories.map((category) => (
                      <Dropdown.Item 
                        key={category}
                        active={selectedCategory === category}
                        onClick={() => setSelectedCategory(category)}
                      >
                        {category}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
          </div>
        </Container>
      </section>
      
      {/* Templates Grid  */}
      <section className="py-5" style={{ background: 'linear-gradient(to top, #e6e9f0 0%, #eef1f5 100%)' }}>
        {selectedCategory && (
          <div className="d-flex align-items-center justify-content-between mb-4">
            <h2 className="fs-4 fw-medium">
              Category: <span className="text-primary">{selectedCategory}</span>
            </h2>
            <button 
              className="btn btn-sm btn-link text-decoration-none text-muted"
              onClick={() => setSelectedCategory(null)}
            >
              Clear Filter
            </button>
          </div>
        )}
        
        {filteredTemplates.length > 0 ? (
          <Row xs={1} sm={2} md={3} lg={4} className="g-4">
            {filteredTemplates.map((template, index) => (
              <Col key={template.id} className="fade-in" style={{ animationDelay: `${index * 0.05}s` }}>
                <TemplateCard 
                  template={template} 
                  index={index}
                />
              </Col>
            ))}
          </Row>
        ) : (
          <div className="text-center py-5">
            <h3 className="fs-4 fw-medium mb-2">No templates found</h3>
            <p className="text-muted mb-4">
              Try adjusting your search or filter criteria
            </p>
            <button 
              className="btn btn-primary"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory(null);
              }}
            >
              Show All Templates
            </button>
          </div>
        )}
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
                Get Started 
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
