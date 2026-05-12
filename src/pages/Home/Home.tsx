import "./Home.css";
import { Link } from "react-router-dom";
import ProjectOverviewCarousel from "./ProjectsOverviewCarousel/ProjectOverviewCarousel.tsx";
import FeaturedProjectsCarousel from "./FeaturedProjectsCarousel/FeaturedProjectsCarousel.tsx";
import ServicesDropdown from "./ServiceDropdown/ServicesDropdown.tsx";


export default function Home() {
  return (
    <>
      <div className="homepage-hero">
        <section className="hero-text font-urbanist">
          <h1>
            Digital solutions that unlock your
            <span className="yellow-gradient"> full potential.</span>
          </h1>
          <div className="hero-paragraph">
            <p>
              We deliver end-to-end solutions that enhance your operations,
              strengthen your platforms, and support long-term growth.
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

      <div className="featured-projects">
        <section className="featuredP-text font-urbanist">
          <h1 className="yellow-gradient">Featured Projects</h1>
          <p>
            Selected work that reflects our approach to solving real-world
            problems through digital experiences.
          </p>
        </section>
        <section className="featuredP-carousel">
          <FeaturedProjectsCarousel />
        </section>
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

      <div className="proven-process">
        <section className="proven-process-text font-urbanist">
          <h1 className="yellow-gradient">Our Proven Process</h1>
          <p>
            Discover how we approach each project to ensure success and exceed
            expectations.
          </p>
        </section>

        <section className="card-container font-urbanist">
          <div className="inner-cards">
            <img src="/icons/discovery_icon.png" alt="Discovery & Strategy Logo" className="cards-icon"/>
            <h1>Discovery & <br />Strategy</h1>
            <p>
              We dive deep into your brand goals, target audience, and project
              requirements to set a solid foundation for growth.
            </p>
          </div>
          <div className="inner-cards">
            <img src="/icons/design_icon.png" alt="Design & Prototyping Logo" className="cards-icon"/>
            <h1>Design & <br />Prototyping</h1>
            <p>
              We dive deep into your brand goals, target audience, and project
              requirements to set a solid foundation for growth.
            </p>
          </div>
          <div className="inner-cards">
            <img src="/icons/development_icon.png" alt="Development & Implementation Logo" className="cards-icon"/>
            <h1>Development & <br />Implementation</h1>
            <p>
              We dive deep into your brand goals, target audience, and project
              requirements to set a solid foundation for growth.
            </p>
          </div>
          <div className="inner-cards">
            <img src="/icons/launch_icon.png" alt="Launch & Support Logo" className="cards-icon"/>
            <h1>Launch & <br />Support</h1>
            <p>
              We dive deep into your brand goals, target audience, and project
              requirements to set a solid foundation for growth.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
