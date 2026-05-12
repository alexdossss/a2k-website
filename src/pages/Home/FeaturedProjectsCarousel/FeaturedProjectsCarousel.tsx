import { useRef, useState, useEffect } from 'react';
import './FeaturedProjectsCarousel.css';
import { featuredProjectsInfo } from './FeaturedProjectsInfo';

export default function FeaturedProjectsCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragged, setDragged] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const displayProjects = [
    ...featuredProjectsInfo,
    ...featuredProjectsInfo,
    ...featuredProjectsInfo,
    ...featuredProjectsInfo
  ];

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    
    const singleSetWidth = scrollWidth / 4;

    if (scrollLeft <= 0) {
      scrollRef.current.scrollLeft = singleSetWidth;
    } else if (scrollLeft >= scrollWidth - clientWidth - 2) {
      scrollRef.current.scrollLeft = scrollLeft - singleSetWidth;
    }
  };

  const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setDragged(false);
    const clientX = 'touches' in e ? e.touches[0].clientX : e.pageX;
    setStartX(clientX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseLeaveOrUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    setDragged(true);
    const clientX = 'touches' in e ? e.touches[0].clientX : e.pageX;
    const x = clientX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleNext = () => {
    if (!scrollRef.current) return;
    const cardWidthWithGap = 280 + 24;
    scrollRef.current.scrollBy({ left: cardWidthWithGap, behavior: 'smooth' });
  };

  const handlePrev = () => {
    if (!scrollRef.current) return;
    const cardWidthWithGap = 280 + 24;
    scrollRef.current.scrollBy({ left: -cardWidthWithGap, behavior: 'smooth' });
  };

  useEffect(() => {
    if (scrollRef.current) {
      const singleSetWidth = scrollRef.current.scrollWidth / 4;
      scrollRef.current.scrollLeft = singleSetWidth;
    }
    
    const track = scrollRef.current;
    if (track) {
      track.addEventListener('scroll', handleScroll);
      return () => track.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <div className="featured-carousel-container font-inter">
      <div 
        className="featured-track" 
        ref={scrollRef} 
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeaveOrUp}
        onMouseUp={handleMouseLeaveOrUp}
        onMouseMove={handleMouseMove}
        onTouchStart={handleMouseDown}
        onTouchEnd={handleMouseLeaveOrUp}
        onTouchMove={handleMouseMove}
        style={{ 
          cursor: isDragging ? 'grabbing' : 'grab',
          scrollSnapType: isDragging ? 'none' : 'x mandatory'
        }}
      >
        {displayProjects.map((project, index) => (
          <a 
            key={`${project.id}-${index}`} 
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="featured-card"
            style={{ backgroundColor: project.backgroundColor }}
            onClick={(e) => {
              if (dragged) {
                e.preventDefault();
              }
            }}
          >
            <div className="featured-card-overlay">
              <h3 className="featured-card-title">{project.title}</h3>
            </div>
          </a>
        ))}
      </div>
      
      <div className="featured-controls">
        <button className="featured-arrow" onClick={handlePrev}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
        <button className="featured-arrow" onClick={handleNext}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>
    </div>
  );
}
