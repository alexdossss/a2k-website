export interface ProjectInfo {
  id: string;
  title: string;
  image: string;
  details: string;
  stack: string[];
  backgroundColor: string;
}

export const projectsInfo: ProjectInfo[] = [
  {
    id: "nova",
    title: "Nova Project",
    image: "",
    details: "A comprehensive landing page and digital presence for Nova.",
    stack: ["React", "TypeScript", "Vite"],
    backgroundColor:  "#1e3a8a"
  },
  {
    id: "sirlasa",
    title: "Sir Lasa Tech",
    image: "",
    details: "Gadgets that work. A modern e-commerce platform.",
    stack: ["Next.js", "Tailwind CSS", "Stripe"],
    backgroundColor: "#84cc16"
  },
  {
    id: "chisom",
    title: "Chisom Designs",
    image: "",
    details: "Turning bold visuals into lasting brands. From concept to execution.",
    stack: ["React", "Framer Motion", "Styled Components"],
    backgroundColor: "#0369a1"
  },
  {
    id: "ecosystema",
    title: "Eco Systema",
    image: "",
    details: "Creative ecosystem for emerging modern brands.",
    stack: ["Vue", "Nuxt", "SCSS"],
    backgroundColor: "#10b981"
  },
  {
    id: "graphics",
    title: "Graphics Design",
    image: "",
    details: "A comprehensive graphics design portfolio highlighting creative works.",
    stack: ["HTML", "CSS", "Vanilla JS"],
    backgroundColor: "#3b82f6"
  }
];
