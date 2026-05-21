import { useParams, Link } from "react-router-dom";
import { projectsInfo } from "../../info-ts/ProjectOverviewInfo";
import { useRef, useEffect } from "react";
import MacBook3D from "../../components/MacBook3D/MacBook3D";
import "./ProjectOverviewDetails.css";

export default function ProjectOverviewDetails() {
  const { id } = useParams<{ id: string }>();
  const trackRef = useRef<HTMLDivElement>(null);

  const project = projectsInfo.find((p) => p.id === id);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [id]);

  useEffect(() => {
    if (trackRef.current && project?.images?.galleryImages?.length) {
      const track = trackRef.current;
      requestAnimationFrame(() => {
        if (track && track.firstElementChild) {
          const itemWidth = (track.firstElementChild as HTMLElement).offsetWidth;
          const gap = 32;
          const itemsPerSet = project.images!.galleryImages!.length;
          const sets = 50;
          const middleSetStartIndex = Math.floor(sets / 2) * itemsPerSet;
          track.scrollLeft = middleSetStartIndex * (itemWidth + gap);
        }
      });
    }
  }, [project?.id, project?.images?.galleryImages?.length]);

  if (!project) {
    return (
      <div className="project-not-found">
        <h2>Project Not Found</h2>
        <Link to="/">Go Back Home</Link>
      </div>
    );
  }

  const renderImageOrPlaceholder = (src: string | undefined, alt: string, className: string) => {
    if (src && src.trim() !== "") {
      return <img src={src} alt={alt} className={className} />;
    }
    return <div className={`${className} image-placeholder`} title={alt}></div>;
  };

  const scrollLeft = () => {
    if (trackRef.current && trackRef.current.firstElementChild) {
      const itemWidth = (trackRef.current.firstElementChild as HTMLElement).offsetWidth;
      trackRef.current.scrollBy({ left: -(itemWidth + 32), behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (trackRef.current && trackRef.current.firstElementChild) {
      const itemWidth = (trackRef.current.firstElementChild as HTMLElement).offsetWidth;
      trackRef.current.scrollBy({ left: itemWidth + 32, behavior: "smooth" });
    }
  };

  const galleryImages = project.images?.galleryImages || [];
  const displayImages = galleryImages.length > 0 ? Array(50).fill(galleryImages).flat() : [];

  return (
    <div className="project-details-container font-urbanist">
      <div className="project-content-wrapper">
        <Link to="/" className="back-link">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span style={{ marginLeft: "8px" }}>Back to Projects</span>
        </Link>

        <div className="project-hero">
          <div className="hero-content-side">
            <h3 className="case-study-label">CASE STUDY</h3>
            <div className="hero-subtitle-row">
              {renderImageOrPlaceholder(project.images?.iconImage, "Icon", "project-icon")}
              <h2 className="project-subtitle" style={{ color: project.backgroundColor }}>
                {project.subtitle}
              </h2>
            </div>
            <p className="project-description">{project.description}</p>
          </div>

          <div className="hero-image-side">
            <div className="hero-circle-bg" />
            <MacBook3D />
          </div>
        </div>

        <div className="project-section">
          <h2 className="section-title">Problem Statement</h2>
          <p className="section-text">{project.problemStatement}</p>
        </div>

        <div className="project-section">
          <h2 className="section-title">Possible Solution</h2>
          <p className="section-text">{project.possibleSolution}</p>
          {project.possibleSolutionList && project.possibleSolutionList.length > 0 && (
            <ul className="solution-list section-text">
              {project.possibleSolutionList.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          )}
        </div>

        <div className="project-section tools-section">
          <h2 className="section-title">Tools Used</h2>
          <div className="tools-categories-container">
            {project.toolsCategories?.map((category, index) => (
              <div key={index} className="tool-category-card">
                <h3 className="category-title">{category.categoryName}</h3>
                <div className="tools-grid">
                  {category.items.map((tool, i) => (
                    <div key={i} className="tool-item">
                      {renderImageOrPlaceholder(tool.toolsUsedImages, tool.toolsUsedText, "tool-image")}
                      <span className="tool-name">{tool.toolsUsedText}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="project-section design-process-section">
          <div className="design-process-header">
            <h2 className="section-title text-center">Design Process</h2>
          </div>
          <div className="design-process-content">
            <div className="design-process-steps-side">
              {project.designProcess?.map((step, index) => (
                <div key={index} className="process-step">
                  <div className="step-number">{(index + 1).toString().padStart(2, "0")}</div>
                  <h4 className="step-title">{step.title}</h4>
                  <p className="step-desc">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="project-section final-output-section">
          <h2 className="section-title text-center">Final Output</h2>
          <div className="gallery-container">
            <button className="gallery-nav prev-btn" onClick={scrollLeft}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <div className="gallery-track" ref={trackRef}>
              {displayImages.map((imgSrc, index) => (
                <div key={index} className="gallery-image-wrapper">
                  {renderImageOrPlaceholder(imgSrc, `Gallery ${index + 1}`, "gallery-image")}
                </div>
              ))}
            </div>
            <button className="gallery-nav next-btn" onClick={scrollRight}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
