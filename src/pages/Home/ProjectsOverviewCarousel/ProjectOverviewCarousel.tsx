import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProjectOverviewCarousel.css';
import { projectsInfo, type ProjectInfo } from './ProjectOverviewInfo';

export default function ProjectOverviewCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  const handleCardClick = (index: number, project: ProjectInfo) => {
    if (index === currentIndex) {
      navigate(`/project/${project.id}`);
    } else {
      setCurrentIndex(index);
    }
  };

  const getCardStyle = (index: number) => {
    const total = projectsInfo.length;
    let diff = index - currentIndex;
    
    if (diff > Math.floor(total / 2)) {
      diff -= total;
    } else if (diff < -Math.floor(total / 2)) {
      diff += total;
    }

    const absDiff = Math.abs(diff);

    const translateX = diff * 200; 
    const scale = 1 - absDiff * 0.15; 
    const zIndex = 100 - absDiff;
    const opacity = absDiff > 2 ? 0 : 1; 

    return {
      transform: `translateX(${translateX}px) scale(${scale})`,
      zIndex: zIndex,
      opacity: opacity,
      transition: 'all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)'
    };
  };

  return (
    <div className="carousel-container font-inter">
      <div className="carousel-track">
        {projectsInfo.map((project, index) => {
          const style = getCardStyle(index);
          const isActive = index === currentIndex;
          
          return (
            <div 
              key={project.id}
              className={`carousel-card ${isActive ? 'active' : ''}`}
              style={{ ...style, background: project.backgroundColor }}
              onClick={() => handleCardClick(index, project)}
            >
            </div>
          );
        })}
      </div>
    </div>
  );
}
