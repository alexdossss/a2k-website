import { memo } from "react";
import "./Projects.css";

function Projects() {
  return (
    <>
      <div className="projectpage-hero">
        <section className="hero-text font-urbanist">
          <h1>Projects that make <span className="yellow-gradient">Impact.</span></h1>
          <div className="hero-paragraph">
            <p>
              Discover the intersection of strategy and imagination by exploring
              our latest projects and technical explorations.
            </p>
          </div>
        </section>

        <section className="carousel-projects"></section>
      </div>

      <div className="meetTeam-section">

      </div>
      
      <div className="workflow-3d">

      </div>
    </>
  );
}

export default memo(Projects);
