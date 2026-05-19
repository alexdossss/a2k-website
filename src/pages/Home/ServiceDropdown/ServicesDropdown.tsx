import { memo, useCallback, useState } from "react";
import "./ServicesDropdown.css";

const SERVICES = [
  { id: 1, title: "Service 1" },
  { id: 2, title: "Service 2" },
  { id: 3, title: "Service 3" },
  { id: 4, title: "Service 4" },
];

const CONTENT_TEXT_1 = "We build reliable, scalable software solutions tailored to your business needs.";
const CONTENT_TEXT_2 = "From planning to deployment, we develop custom systems and applications that streamline operations, improve efficiency, and support long-term growth.";

const ChevronSVG = memo(() => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
));

const LinkArrowSVG = memo(() => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"></line>
    <polyline points="12 5 19 12 12 19"></polyline>
  </svg>
));

interface AccordionItemProps {
  id: number;
  title: string;
  isOpen: boolean;
  onToggle: (id: number) => void;
}

const AccordionItem = memo(({ id, title, isOpen, onToggle }: AccordionItemProps) => {
  const handleToggle = useCallback(() => onToggle(id), [id, onToggle]);

  return (
    <div className={`service-accordion-item${isOpen ? " open" : ""}`}>
      <div className="service-accordion-header" onClick={handleToggle}>
        <h2>{title}</h2>
        <div className={`service-chevron${isOpen ? " open" : ""}`}>
          <ChevronSVG />
        </div>
      </div>
      <div className={`service-accordion-content${isOpen ? " open" : ""}`}>
        <div className="service-content-inner">
          <div className="service-text-col font-inter">
            <p>{CONTENT_TEXT_1}</p>
            <p>{CONTENT_TEXT_2}</p>
            <div className="service-link-container">
              <a href="#" className="service-avail-link">
                <span className="font-urbanist">Avail Our Service</span>
                <LinkArrowSVG />
              </a>
            </div>
          </div>
          <div className="service-image-col">
            <div className="service-image-placeholder"></div>
          </div>
        </div>
      </div>
    </div>
  );
});

function ServicesDropdown() {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());

  const toggleItem = useCallback((id: number) => {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  return (
    <div className="services-dropdown-container font-urbanist">
      {SERVICES.map(({ id, title }) => (
        <AccordionItem
          key={id}
          id={id}
          title={title}
          isOpen={openItems.has(id)}
          onToggle={toggleItem}
        />
      ))}
    </div>
  );
}

export default memo(ServicesDropdown);
