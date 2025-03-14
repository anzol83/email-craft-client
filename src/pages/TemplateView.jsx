
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';
import Header from '../components/Header';
import EmailPreview from '../components/EmailPreview';
import TemplateHeader from '../components/TemplateHeader';
import HelpTips from '../components/HelpTips';
import EmailForm from '../components/EmailForm';

// This is the data for our email templates
// In a real app, this would come from an API or database
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
  },
  {
    id: '9',
    title: 'Happy Birthday Wishes',
    description: 'Send birthday wishes to students celebrating their special day.',
    category: 'Personal',
    previewImage: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?q=80&w=2070&auto=format&fit=crop',
    content: `
      <h1 style="color: #e91e63; font-size: 24px; margin-bottom: 16px;">Happy Birthday!</h1>
      <p>Dear [Student Name],</p>
      <p>On behalf of everyone at the university, we would like to wish you a very happy birthday! 🎂</p>
      <p>May your special day be filled with joy, laughter, and memorable moments. As you celebrate another year of achievements and growth, we're proud to have you as part of our university community.</p>
      <div style="background-color: #fce4ec; padding: 16px; border-radius: 8px; margin: 16px 0;">
        <p style="margin: 0; color: #e91e63; font-weight: bold; text-align: center;">Wishing you success and happiness in all your academic pursuits and beyond!</p>
      </div>
      <p>We hope this new year of your life brings exciting opportunities and memorable experiences on campus.</p>
      <p>Best wishes,<br>The Student Affairs Team</p>
    `
  },
  {
    id: '10',
    title: 'Congratulations on Your Achievement',
    description: 'Congratulate students on their academic or extracurricular achievements.',
    category: 'Recognition',
    previewImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop',
    content: `
      <h1 style="color: #2e7d32; font-size: 24px; margin-bottom: 16px;">Congratulations!</h1>
      <p>Dear [Student Name],</p>
      <p>We are delighted to congratulate you on your recent achievement: <strong>[Achievement Description]</strong>!</p>
      <p>Your hard work, dedication, and perseverance have truly paid off. This accomplishment is a testament to your commitment to excellence and your outstanding abilities.</p>
      <div style="background-color: #e8f5e9; padding: 16px; border-radius: 8px; margin: 16px 0; text-align: center;">
        <p style="margin: 0; color: #2e7d32; font-weight: bold;">Your success inspires everyone around you!</p>
      </div>
      <p>We are proud to have you as a member of our university community and look forward to celebrating your future accomplishments.</p>
      <p>Congratulations once again!</p>
      <p>Best regards,<br>The University Administration</p>
    `
  }
];

const TemplateView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [template, setTemplate] = useState(null);
  const [editedContent, setEditedContent] = useState('');
  const [subject, setSubject] = useState('');
  const [showHelpTips, setShowHelpTips] = useState(true);
  
  useEffect(() => {
    // Find the template by ID
    const foundTemplate = EMAIL_TEMPLATES.find(t => t.id === id);
    
    if (foundTemplate) {
      setTemplate(foundTemplate);
      setEditedContent(foundTemplate.content);
      setSubject(foundTemplate.title);
    } else {
      // Template not found, redirect to main page
      navigate('/');
      toast.error('Template not found');
    }
  }, [id, navigate]);
  
  // Show loading state while template is being fetched
  if (!template) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center">
        <div className="text-center">
          <div className="spinner-border text-primary mb-3" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="text-muted">Loading template...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-vh-100 bg-light">
      <Header />
      
      <main className="pt-4 pb-5">
        <Container className="mt-4">
          <Row className="g-4">
            {/* Left Column - Template Preview */}
            <Col md={6}>
              <TemplateHeader 
                title={template.title} 
                description={template.description} 
              />

              {showHelpTips && (
                <HelpTips onClose={() => setShowHelpTips(false)} />
              )}
              
              {/* Email Preview Component */}
              <EmailPreview 
                template={template} 
                content={editedContent} 
              />
            </Col>
            
            {/* Right Column - Send Form */}
            <Col md={6}>
              <EmailForm 
                subject={subject} 
                setSubject={setSubject} 
                content={editedContent} 
                setContent={setEditedContent} 
              />
            </Col>
          </Row>
        </Container>
      </main>
    </div>
  );
};

export default TemplateView;
