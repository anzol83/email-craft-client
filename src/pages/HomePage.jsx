import React, { useState, useEffect } from 'react';
import { Container } from "react-bootstrap"

    


    // Template data
    const EMAIL_TEMPLATES = [
        {
            id: '1',
            title: 'Welcome to the University',
            description: 'A warm welcome message for new students joining the university.',
            category: 'Onboarding',
            previewImage: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2071&auto=format&fit=crop',
        },
        {
            id: '2',
            title: 'Assignment Deadline Reminder',
            description: 'A friendly reminder about upcoming assignment deadlines.',
            category: 'Academic',
            previewImage: 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?q=80&w=2070&auto=format&fit=crop',
        },
        {
            id: '3',
            title: 'Event Invitation: Guest Lecture',
            description: 'Invitation to a special guest lecture by industry professionals.',
            category: 'Events',
            previewImage: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop',
            
        },
        {
            id: '4',
            title: 'Scholarship Opportunity Announcement',
            description: 'Information about a new scholarship program available to students.',
            category: 'Financial',
            previewImage: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=2070&auto=format&fit=crop',
        },
        {
            id: '5',
            title: 'Course Registration Open',
            description: 'Notification that course registration for the next semester is now open.',
            category: 'Administrative',
            previewImage: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop',
        },
        {
            id: '6',
            title: 'Campus Facilities Update',
            description: 'Updates about changes to campus facilities and operating hours.',
            category: 'Campus Life',
            previewImage: 'https://images.unsplash.com/photo-1607013407627-6848710191ad?q=80&w=1939&auto=format&fit=crop',
        },
        {
            id: '7',
            title: 'Internship Opportunity',
            description: 'Information about a new internship program with industry partners.',
            category: 'Career',
            previewImage: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=2070&auto=format&fit=crop',
        },
        {
            id: '8',
            title: 'Exam Schedule Announcement',
            description: 'Final examination schedule and important information for students.',
            category: 'Academic',
            previewImage: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop'
        }
    ];

  

const HomePage =()=>{
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


    return(
        <Container>
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
        </Container>
    )
}

export default HomePage