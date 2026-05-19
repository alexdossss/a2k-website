import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import './ProjectOverviewCarousel.css';
import { projectsInfo } from '../../../info-ts/ProjectOverviewInfo';

const CATEGORIES = ["All", "Video", "Web Design", "Branding", "UI/UX"];

export default function ProjectOverviewCarousel() {
  const [activeCategory, setActiveCategory] = useState("All");
  const trackRef = useRef<HTMLDivElement>(null);

  const filteredProjects = projectsInfo.filter(project => {
    if (activeCategory === "All") return true;
    return project.projectCategory === activeCategory;
  });

  // Chunk into pages of 8 (4 columns * 2 rows)
  const projectPages = [];
  for (let i = 0; i < filteredProjects.length; i += 8) {
    projectPages.push(filteredProjects.slice(i, i + 8));
  }

  const scrollLeft = () => {
    if (trackRef.current) {
      trackRef.current.scrollBy({ left: -trackRef.current.clientWidth, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (trackRef.current) {
      trackRef.current.scrollBy({ left: trackRef.current.clientWidth, behavior: 'smooth' });
    }
  };

  return (
    <div className="carousel-wrapper font-inter">
      <div className="filters-container">
        {CATEGORIES.map(category => (
          <button
            key={category}
            className={`filter-btn ${activeCategory === category ? 'active' : ''}`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="carousel-grid-container font-urbanist">
        <div className="carousel-grid" ref={trackRef}>
          {projectPages.map((page, pageIndex) => (
            <div key={pageIndex} className="carousel-page">
              {page.map(project => (
                <Link to={`/project/${project.id}`} key={project.id} className="carousel-card-item">
                  <img src={project.thumbnailImage} alt={project.title} className="card-bg-img" />
                  <div className="card-overlay">
                    <span className="card-badge">{project.projectCategory}</span>
                    <div className="card-text-content">
                      <h4 className="card-title-text">{project.title}</h4>
                      <p className="card-subtitle-text">{project.description}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="carousel-nav-controls">
        <button className="nav-btn" onClick={scrollLeft}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
        </button>
        <button className="nav-btn" onClick={scrollRight}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </button>
      </div>
    </div>
  );
}
