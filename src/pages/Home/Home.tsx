import "./Home.css";
import { Link } from "react-router-dom";
import ProjectOverviewCarousel from "./ProjectsOverviewCarousel/ProjectOverviewCarousel.tsx";
import ServicesDropdown from "./ServiceDropdown/ServicesDropdown.tsx";
import { developers } from "../../info-ts/Developers.ts";

export default function Home() {
  return (
    <>
      <div className="homepage-hero">
        <section className="main-dev-images-container">
          {developers.map((dev) => (
            <div className="dev-container" key={dev.id}>
              <img className="dev-image" src={dev.image} alt={dev.name} />
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
            <div className="workflow-text"></div>
            <div className="workflow-3d"></div>
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

          <section className="dev-team-members-carousel"></section>
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
