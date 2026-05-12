import { useState } from 'react';
import './ServicesDropdown.css';

export default function ServicesDropdown() {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (id: number) => {
    setOpenItems(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="services-dropdown-container font-urbanist">

      <div className={`service-accordion-item ${openItems.includes(1) ? 'open' : ''}`}>
        <div className="service-accordion-header" onClick={() => toggleItem(1)}>
          <h2>Service 1</h2>
          <div className={`service-chevron ${openItems.includes(1) ? 'open' : ''}`}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
        </div>
        <div className={`service-accordion-content ${openItems.includes(1) ? 'open' : ''}`}>
          <div className="service-content-inner">
            <div className="service-text-col font-inter">
              <p>We build reliable, scalable software solutions tailored to your business needs.</p>
              <p>From planning to deployment, we develop custom systems and applications that streamline operations, improve efficiency, and support long-term growth.</p>
              <div className="service-link-container">
                <a href="#" className="service-avail-link">
                  <span className="font-urbanist">Avail Our Service</span>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </a>
              </div>
            </div>
            <div className="service-image-col">
              <div className="service-image-placeholder"></div>
            </div>
          </div>
        </div>
      </div>

      <div className={`service-accordion-item ${openItems.includes(2) ? 'open' : ''}`}>
        <div className="service-accordion-header" onClick={() => toggleItem(2)}>
          <h2>Service 2</h2>
          <div className={`service-chevron ${openItems.includes(2) ? 'open' : ''}`}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
        </div>
        <div className={`service-accordion-content ${openItems.includes(2) ? 'open' : ''}`}>
          <div className="service-content-inner">
            <div className="service-text-col font-inter">
              <p>We build reliable, scalable software solutions tailored to your business needs.</p>
              <p>From planning to deployment, we develop custom systems and applications that streamline operations, improve efficiency, and support long-term growth.</p>
              <div className="service-link-container">
                <a href="#" className="service-avail-link">
                  <span className="font-urbanist">Avail Our Service</span>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </a>
              </div>
            </div>
            <div className="service-image-col">
              <div className="service-image-placeholder"></div>
            </div>
          </div>
        </div>
      </div>

      <div className={`service-accordion-item ${openItems.includes(3) ? 'open' : ''}`}>
        <div className="service-accordion-header" onClick={() => toggleItem(3)}>
          <h2>Service 3</h2>
          <div className={`service-chevron ${openItems.includes(3) ? 'open' : ''}`}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
        </div>
        <div className={`service-accordion-content ${openItems.includes(3) ? 'open' : ''}`}>
          <div className="service-content-inner">
            <div className="service-text-col font-inter">
              <p>We build reliable, scalable software solutions tailored to your business needs.</p>
              <p>From planning to deployment, we develop custom systems and applications that streamline operations, improve efficiency, and support long-term growth.</p>
              <div className="service-link-container">
                <a href="#" className="service-avail-link">
                  <span className="font-urbanist">Avail Our Service</span>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </a>
              </div>
            </div>
            <div className="service-image-col">
              <div className="service-image-placeholder"></div>
            </div>
          </div>
        </div>
      </div>

      <div className={`service-accordion-item ${openItems.includes(4) ? 'open' : ''}`}>
        <div className="service-accordion-header" onClick={() => toggleItem(4)}>
          <h2>Service 4</h2>
          <div className={`service-chevron ${openItems.includes(4) ? 'open' : ''}`}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
        </div>
        <div className={`service-accordion-content ${openItems.includes(4) ? 'open' : ''}`}>
          <div className="service-content-inner">
            <div className="service-text-col font-inter">
              <p>We build reliable, scalable software solutions tailored to your business needs.</p>
              <p>From planning to deployment, we develop custom systems and applications that streamline operations, improve efficiency, and support long-term growth.</p>
              <div className="service-link-container">
                <a href="#" className="service-avail-link">
                  <span className="font-urbanist">Avail Our Service</span>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </a>
              </div>
            </div>
            <div className="service-image-col">
              <div className="service-image-placeholder"></div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
