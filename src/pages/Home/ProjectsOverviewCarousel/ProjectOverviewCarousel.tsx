import { memo, useCallback, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./ProjectOverviewCarousel.css";
import { projectsInfo } from "../../../info-ts/ProjectOverviewInfo";

const CATEGORIES = ["All", "Video", "Web Design", "Branding", "UI/UX"];

interface CategoryButtonProps {
  category: string;
  isActive: boolean;
  onSelect: (category: string) => void;
}

const CategoryButton = memo(({ category, isActive, onSelect }: CategoryButtonProps) => {
  const handleClick = useCallback(() => onSelect(category), [category, onSelect]);
  return (
    <button
      className={`filter-btn${isActive ? " active" : ""}`}
      onClick={handleClick}
    >
      {category}
    </button>
  );
});

interface ProjectCardProps {
  id: string;
  thumbnailImage: string;
  title: string;
  projectCategory: string;
  description: string;
}

const ProjectCard = memo(({ id, thumbnailImage, title, projectCategory, description }: ProjectCardProps) => (
  <Link to={`/project/${id}`} className="carousel-card-item">
    <img src={thumbnailImage} alt={title} className="card-bg-img" loading="lazy" decoding="async" />
    <div className="card-overlay">
      <span className="card-badge">{projectCategory}</span>
      <div className="card-text-content">
        <h4 className="card-title-text">{title}</h4>
        <p className="card-subtitle-text">{description}</p>
      </div>
    </div>
  </Link>
));

const NavLeftSVG = memo(() => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12"></line>
    <polyline points="12 19 5 12 12 5"></polyline>
  </svg>
));

const NavRightSVG = memo(() => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"></line>
    <polyline points="12 5 19 12 12 19"></polyline>
  </svg>
));

function ProjectOverviewCarousel() {
  const [activeCategory, setActiveCategory] = useState("All");
  const trackRef = useRef<HTMLDivElement>(null);

  const filteredProjects = useMemo(
    () =>
      activeCategory === "All"
        ? projectsInfo
        : projectsInfo.filter((p) => p.projectCategory === activeCategory),
    [activeCategory]
  );

  const projectPages = useMemo(() => {
    const pages = [];
    for (let i = 0; i < filteredProjects.length; i += 8) {
      pages.push(filteredProjects.slice(i, i + 8));
    }
    return pages;
  }, [filteredProjects]);

  const scrollLeft = useCallback(() => {
    if (trackRef.current) {
      trackRef.current.scrollBy({ left: -trackRef.current.clientWidth, behavior: "smooth" });
    }
  }, []);

  const scrollRight = useCallback(() => {
    if (trackRef.current) {
      trackRef.current.scrollBy({ left: trackRef.current.clientWidth, behavior: "smooth" });
    }
  }, []);

  return (
    <div className="carousel-wrapper font-inter">
      <div className="filters-container">
        {CATEGORIES.map((category) => (
          <CategoryButton
            key={category}
            category={category}
            isActive={activeCategory === category}
            onSelect={setActiveCategory}
          />
        ))}
      </div>

      <div className="carousel-grid-container font-urbanist">
        <div className="carousel-grid" ref={trackRef}>
          {projectPages.map((page, pageIndex) => (
            <div key={pageIndex} className="carousel-page">
              {page.map((project) => (
                <ProjectCard
                  key={project.id}
                  id={project.id}
                  thumbnailImage={project.thumbnailImage}
                  title={project.title}
                  projectCategory={project.projectCategory}
                  description={project.description}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="carousel-nav-controls">
        <button className="nav-btn" onClick={scrollLeft}>
          <NavLeftSVG />
        </button>
        <button className="nav-btn" onClick={scrollRight}>
          <NavRightSVG />
        </button>
      </div>
    </div>
  );
}

export default memo(ProjectOverviewCarousel);
