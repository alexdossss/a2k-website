import { useParams, Link } from 'react-router-dom';
import { projectsInfo } from '../../info-ts/ProjectOverviewInfo';
import './ProjectOverviewDetails.css';

export default function ProjectOverviewDetails() {
  const { id } = useParams<{ id: string }>();
  
  const project = projectsInfo.find(p => p.id === id);

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
      <div 
        className="project-hero"
        style={{ background: project.backgroundColor }}
      >
        <div className="hero-content">
          <h1 className="project-title">{project.title}</h1>
          <p className="project-subtitle">{project.details}</p>
        </div>
      </div>
      
      <div className="project-info-section">
        <div className="info-card">
          <h3>About The Project</h3>
          <p>{project.details}</p>
        </div>
        
        <div className="info-card">
          <h3>Technologies Used</h3>
          <ul className="tech-stack-list">
            {project.stack.map((tech, index) => (
              <li key={index} className="tech-badge">{tech}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="back-link-container">
        <Link to="/" className="back-link">
          &larr; Back to Projects
        </Link>
      </div>
    </div>
  );
}
