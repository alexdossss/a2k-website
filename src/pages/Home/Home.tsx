import "./Home.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import ProjectOverviewCarousel from "./ProjectsOverviewCarousel/ProjectOverviewCarousel.tsx";
import ServicesDropdown from "./ServiceDropdown/ServicesDropdown.tsx";
import WorkflowCanvas from "./WorkflowCanvas/WorkflowCanvas.tsx";
import { developers } from "../../info-ts/Developers.ts";
import { workflowInfo } from "../../info-ts/WorkflowInfo.ts";

export default function Home() {
  const [activeWorkflowLayer, setActiveWorkflowLayer] = useState(0);
  const [hoveredWorkflowLayer, setHoveredWorkflowLayer] = useState(-1);
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());

  const toggleCard = (id: number) => {
    setFlippedCards((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <>
      <div className="homepage-hero">
        <section className="main-dev-images-container">
          {developers.map((dev) => (
            <div className="dev-container" key={dev.id}>
              <img className="dev-image" src={dev.image} alt={dev.name} />
              <div className="dev-nickname font-urbanist">{dev.nickname}</div>
            </div>
          ))}
        </section>
        <section className="hero-text font-urbanist">
          <h1>
            Projects that make <span className="yellow-gradient">Impact.</span>
          </h1>
          <div className="hero-paragraph">
            <p>
              Discover the intersection of strategy and imagination by exploring
              our latest projects and technical explorations.
            </p>
          </div>
        </section>
        <section className="cta-contactpage">
          <Link to="/contact" className="build-project-btn font-urbanist">
            Build Your Project
            <svg
              className="arrow-icon"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </Link>
        </section>
      </div>

      <div className="project-overview">
        <ProjectOverviewCarousel />
      </div>

      <div className="services">
        <section className="services-text font-urbanist">
          <h1 className="yellow-gradient">What We Can DO For You</h1>
          <p>
            From strategy to execution, we offer digital solutions designed to
            support your growth.
          </p>
        </section>

        <section className="services-dropdown">
          <ServicesDropdown />
        </section>
      </div>

      <div className="three-d-workflow">
        <section className="container-text-threeD">
          <section className="header-text font-urbanist">
            <p>Our Workflow</p>
            <h1>The Art Of Making</h1>
          </section>

          <section className="textN3d">
            <div className="workflow-text flex-col font-urbanist">
              {workflowInfo.map((step, i) => {
                const isActive = i === activeWorkflowLayer;
                const isHovered = i === hoveredWorkflowLayer;

                return (
                  <div
                    key={step.id}
                    className={`workflow-item ${isActive ? "active" : ""} ${isHovered ? "hovered" : ""}`}
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveWorkflowLayer(isActive ? -1 : i);
                    }}
                    onMouseEnter={() => setHoveredWorkflowLayer(i)}
                    onMouseLeave={() =>
                      setHoveredWorkflowLayer((prev) =>
                        prev === i ? -1 : prev,
                      )
                    }
                  >
                    <div className="workflow-item-header">
                      <div className="workflow-icon">
                        {isActive ? (
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                          </svg>
                        ) : (
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <line x1="12" y1="5" x2="12" y2="19"></line>
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                          </svg>
                        )}
                      </div>
                      <h3>{step.title}</h3>
                    </div>
                    <div
                      className={`workflow-item-content-wrapper ${isActive ? "active" : ""}`}
                    >
                      <div className="workflow-item-content font-inter">
                        <p>{step.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="workflow-3d">
              <WorkflowCanvas
                activeIndex={activeWorkflowLayer}
                hoveredIndex={hoveredWorkflowLayer}
                onLayerClick={setActiveWorkflowLayer}
                onLayerHover={setHoveredWorkflowLayer}
              />
            </div>
          </section>
        </section>
      </div>

      <div className="dev-team">
        <section className="container-dev-team">
          <section className="header-text font-urbanist">
            <h1>Meet Our Team</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam
              hendrerit nisi sed sollicitudin.
            </p>
          </section>

          <section className="dev-team-members-carousel">
            {developers.map((dev) => {
              const isFlipped = flippedCards.has(dev.id);
              return (
                <div
                  key={dev.id}
                  className={`dev-card font-urbanist ${isFlipped ? "dev-card--flipped" : ""}`}
                  onClick={() => toggleCard(dev.id)}
                >
                  <div className="dev-card-inner">
                    <div className="dev-card-front">
                      <div className="dev-card-front-info">
                        <h3 className="dev-card-name">{dev.nickname}</h3>
                        <p className="dev-card-role">{dev.role}</p>
                      </div>
                      <img className="dev-card-image" src={dev.image} alt={dev.name} />
                    </div>
                    <div className="dev-card-back">
                      <h3 className="dev-card-name dev-card-name--gold">{dev.nickname}</h3>
                      <p className="dev-card-role">{dev.role}</p>
                      <p className="dev-card-desc">
                        {dev.desc || "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus."}
                      </p>
                      <div className="dev-card-stack">
                        {dev.stack.map((s) => (
                          <span key={s}>{s}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </section>
        </section>
      </div>

      <div className="design-academy">
        <section className="container-design-academy">
          <section className="header-text font-urbanist">
            <h1>Design Academy</h1>
            <p>Coming Soon</p>
            <p>
              Learn design, strategy, and real-world workflows. Be one of the
              first to access exclusive contents.
            </p>
            <input type="email" placeholder="Enter your email" />
            <button>Join Waitlist</button>
          </section>

          <section className="design-academy-images">
            <img
              className="image-academy"
              src="https://i1-e.pinimg.com/736x/82/a3/3a/82a33a43be59e913b58efbdfd64e281e.jpg"
              alt=""
            />
            <img
              className="image-academy"
              src="https://i1-e.pinimg.com/736x/82/a3/3a/82a33a43be59e913b58efbdfd64e281e.jpg"
              alt=""
            />
            <img
              className="image-academy"
              src="https://i1-e.pinimg.com/736x/82/a3/3a/82a33a43be59e913b58efbdfd64e281e.jpg"
              alt=""
            />
          </section>
        </section>
      </div>
    </>
  );
}
