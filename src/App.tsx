import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home.tsx';
import Services from './pages/Projects/Projects.tsx';
import Projects from './pages/Projects/Projects.tsx';;
import Contact from './pages/Contact/Contact.tsx';
import NavigationPanel from './components/Navigation/NavigationPanel.tsx';
import ProjectOverviewDetails from './pages/ProjectOverviewDetails/ProjectOverviewDetails.tsx';
import './App.css';
import FooterPanel from './components/Footer/FooterPanel.tsx';

function App() {
  return (
    <BrowserRouter>
      <NavigationPanel />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/project/:id" element={<ProjectOverviewDetails />} />
      </Routes>
      <FooterPanel />
    </BrowserRouter>
  );
}

export default App;
