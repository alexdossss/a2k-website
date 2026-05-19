import { memo, useCallback, useEffect, useMemo, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { projectsInfo } from "../../info-ts/ProjectOverviewInfo";
import "./ProjectOverviewDetails.css";

const GAP_PX = 32;

const BackArrowSVG = memo(() => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
));

const PrevSVG = memo(() => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
));

const NextSVG = memo(() => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
));

interface ImageOrPlaceholderProps {
  src: string | undefined;
  alt: string;
  className: string;
}

const ImageOrPlaceholder = memo(({ src, alt, className }: ImageOrPlaceholderProps) => {
  if (src && src.trim() !== "") {
    return <img src={src} alt={alt} className={className} loading="lazy" decoding="async" />;
  }
  return <div className={`${className} image-placeholder`} title={alt}></div>;
});

function ProjectOverviewDetails() {
  const { id } = useParams<{ id: string }>();
  const trackRef = useRef<HTMLDivElement>(null);

  const project = useMemo(() => projectsInfo.find((p) => p.id === id), [id]);

  const galleryImages = useMemo(
    () => project?.images?.galleryImages ?? [],
    [project]
  );

  const displayImages = useMemo(() => {
    if (galleryImages.length === 0) return [];
    const sets = 50;
    const out: string[] = [];
    out.length = galleryImages.length * sets;
    for (let s = 0; s < sets; s++) {
      for (let i = 0; i < galleryImages.length; i++) {
        out[s * galleryImages.length + i] = galleryImages[i];
      }
    }
    return out;
  }, [galleryImages]);

  useEffect(() => {
    if (!trackRef.current || galleryImages.length === 0) return;
    const track = trackRef.current;
    requestAnimationFrame(() => {
      if (!track.firstElementChild) return;
      const itemWidth = (track.firstElementChild as HTMLElement).offsetWidth;
      const middleSetStart = Math.floor(50 / 2) * galleryImages.length;
      track.scrollLeft = middleSetStart * (itemWidth + GAP_PX);
    });
  }, [galleryImages]);

  const scrollLeft = useCallback(() => {
    if (!trackRef.current?.firstElementChild) return;
    const itemWidth = (trackRef.current.firstElementChild as HTMLElement).offsetWidth;
    trackRef.current.scrollBy({ left: -(itemWidth + GAP_PX), behavior: "smooth" });
  }, []);

  const scrollRight = useCallback(() => {
    if (!trackRef.current?.firstElementChild) return;
    const itemWidth = (trackRef.current.firstElementChild as HTMLElement).offsetWidth;
    trackRef.current.scrollBy({ left: itemWidth + GAP_PX, behavior: "smooth" });
  }, []);

  const subtitleStyle = useMemo(
    () => ({ color: project?.backgroundColor }),
    [project?.backgroundColor]
  );

  if (!project) {
    return (
      <div className="project-not-found">
        <h2>Project Not Found</h2>
        <Link to="/">Go Back Home</Link>
      </div>
    );
  }

  return (
    <div className="project-details-container font-inter">
      <section className="threed-comp"></section>

      <div className="project-content-wrapper">
        <Link to="/" className="back-link">
          <BackArrowSVG />
          <span style={{ marginLeft: "8px" }}>Back to Projects</span>
        </Link>

        <div className="project-hero">
          <div className="hero-content-side">
            <h3 className="case-study-label">CASE STUDY</h3>
            <div className="hero-subtitle-row">
              <ImageOrPlaceholder src={project.images?.iconImage} alt="Icon" className="project-icon" />
              <h2 className="project-subtitle" style={subtitleStyle}>{project.subtitle}</h2>
            </div>
            <p className="project-description">{project.description}</p>
          </div>
          <div className="hero-image-side">
            <ImageOrPlaceholder src={project.images?.coverImages?.[0]} alt="Cover" className="cover-image" />
          </div>
        </div>

        <div className="project-section">
          <h2 className="section-title">Problem Statement</h2>
          <p className="section-text">{project.problemStatement}</p>
        </div>

        <div className="project-section">
          <h2 className="section-title">Possible Solution</h2>
          <p className="section-text">{project.possibleSolution}</p>
          {project.possibleSolutionList?.length > 0 && (
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
                      <ImageOrPlaceholder src={tool.toolsUsedImages} alt={tool.toolsUsedText} className="tool-image" />
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
              <PrevSVG />
            </button>
            <div className="gallery-track" ref={trackRef}>
              {displayImages.map((imgSrc, index) => (
                <div key={index} className="gallery-image-wrapper">
                  <ImageOrPlaceholder
                    src={imgSrc}
                    alt={`Gallery ${(index % galleryImages.length) + 1}`}
                    className="gallery-image"
                  />
                </div>
              ))}
            </div>
            <button className="gallery-nav next-btn" onClick={scrollRight}>
              <NextSVG />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(ProjectOverviewDetails);
