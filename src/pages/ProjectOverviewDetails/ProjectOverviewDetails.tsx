import { useParams, Link } from "react-router-dom";
import { projectsInfo } from "../../info-ts/ProjectOverviewInfo";
import "./ProjectOverviewDetails.css";

export default function ProjectOverviewDetails() {
  const { id } = useParams<{ id: string }>();

  const project = projectsInfo.find((p) => p.id === id);

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

  return (
    <div className="project-details-container font-inter">
      <section className="3d-comp">
      </section>

      <div className="project-content-wrapper">
        <Link to="/" className="back-link">
          &larr; Back to Projects
        </Link>

        <div className="project-hero">
          <div className="hero-image-side">
             {renderImageOrPlaceholder(project.images?.coverImages?.[0], "Cover", "cover-image")}
          </div>
          <div className="hero-content-side">
            <h1 className="main-heading">Web Design Case Study</h1>
            <div className="hero-subtitle-row">
              {renderImageOrPlaceholder(project.images?.iconImage, "Icon", "project-icon")}
              <h2 className="project-subtitle" style={{ color: project.backgroundColor }}>{project.subtitle}</h2>
            </div>
            <p className="project-description">{project.description}</p>
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
          <h2 className="section-title text-center">Tools Used</h2>
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
            <h2 className="section-title">Design Process</h2>
          </div>
          <div className="design-process-content">
            <div className="design-process-image-side">
              {renderImageOrPlaceholder("", "Design Process App Mockup", "app-mockup-placeholder")}
            </div>
            <div className="design-process-steps-side">
              {project.designProcess?.map((step, index) => (
                <div key={index} className="process-step">
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
            {project.images?.galleryImages?.map((imgSrc, index) => (
              <div key={index} className="gallery-image-wrapper">
                {renderImageOrPlaceholder(imgSrc, `Gallery ${index + 1}`, "gallery-image")}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
