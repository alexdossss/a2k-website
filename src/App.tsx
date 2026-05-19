import { lazy, Suspense, memo } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavigationPanel from './components/Navigation/NavigationPanel.tsx';
import FooterPanel from './components/Footer/FooterPanel.tsx';
import './App.css';

const Home = lazy(() => import('./pages/Home/Home.tsx'));
const Projects = lazy(() => import('./pages/Projects/Projects.tsx'));
const Contact = lazy(() => import('./pages/Contact/Contact.tsx'));
const ProjectOverviewDetails = lazy(() => import('./pages/ProjectOverviewDetails/ProjectOverviewDetails.tsx'));

function App() {
  return (
    <BrowserRouter>
      <NavigationPanel />
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Projects />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/project/:id" element={<ProjectOverviewDetails />} />
        </Routes>
      </Suspense>
      <FooterPanel />
    </BrowserRouter>
  );
}

export default memo(App);
