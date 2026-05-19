export interface ProjectImages {
  coverImages: string[];
  galleryImages: string[];
  iconImage: string;
}

export interface ToolItem {
  toolsUsedImages: string;
  toolsUsedText: string;
}

export interface ToolCategory {
  categoryName: string;
  items: ToolItem[];
}

export interface DesignProcessStep {
  title: string;
  description: string;
}

export interface ProjectInfo {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  problemStatement: string;
  possibleSolution: string;
  possibleSolutionList: string[];
  toolsCategories: ToolCategory[];
  designProcess: DesignProcessStep[];
  images: ProjectImages;
  backgroundColor: string;
  thumbnailImage: string;
  projectCategory: string;
}

export const projectsInfo: ProjectInfo[] = [
  {
    id: "nova",
    title: "Nova Project",
    backgroundColor: "#1e3a8a",
    subtitle: "Project Case Study",
    description: "A comprehensive landing page and digital presence for Nova.",
    problemStatement:
      "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.",
    possibleSolution:
      "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.",
    possibleSolutionList: [
      "Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
      "Lorem ipsum dolor sit amet, consectetuer.",
      "Lorem ipsum dolor sit amet, consectetuer adipiscing.",
      "Lorem ipsum dolor.",
    ],
    toolsCategories: [
      {
        categoryName: "Development",
        items: [
          { toolsUsedImages: "", toolsUsedText: "TypeScript" },
          { toolsUsedImages: "", toolsUsedText: "React" },
          { toolsUsedImages: "", toolsUsedText: "Tailwind CSS" },
        ],
      },
      {
        categoryName: "Design",
        items: [{ toolsUsedImages: "", toolsUsedText: "Figma" }],
      },
      {
        categoryName: "Backend",
        items: [{ toolsUsedImages: "", toolsUsedText: "Supabase" }],
      },
    ],
    designProcess: [
      {
        title: "Discovery & Strategy",
        description:
          "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
      },
      {
        title: "Wireframe",
        description:
          "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
      },
      {
        title: "Visual Identity & Styling",
        description:
          "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
      },
    ],
    images: {
      coverImages: [""],
      galleryImages: ["", "", ""],
      iconImage: "",
    },
    thumbnailImage: "https://i.pinimg.com/736x/ef/21/c7/ef21c7413e887a3d6309e3c86eca0a35.jpg",
    projectCategory: "Web Design",
  },
  {
    id: "sirlasa",
    title: "Sir Lasa Tech",
    backgroundColor: "#84cc16",
    subtitle: "E-Commerce Solution",
    description: "Gadgets that work. A modern e-commerce platform.",
    problemStatement:
      "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.",
    possibleSolution:
      "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.",
    possibleSolutionList: [
      "Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
      "Lorem ipsum dolor sit amet, consectetuer.",
      "Lorem ipsum dolor sit amet, consectetuer adipiscing.",
      "Lorem ipsum dolor.",
    ],
    toolsCategories: [
      {
        categoryName: "Development",
        items: [
          { toolsUsedImages: "", toolsUsedText: "TypeScript" },
          { toolsUsedImages: "", toolsUsedText: "React" },
          { toolsUsedImages: "", toolsUsedText: "Tailwind CSS" },
        ],
      },
      {
        categoryName: "Design",
        items: [{ toolsUsedImages: "", toolsUsedText: "Figma" }],
      },
    ],
    designProcess: [
      {
        title: "Discovery & Strategy",
        description:
          "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
      },
      {
        title: "Wireframe",
        description:
          "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
      },
      {
        title: "Visual Identity & Styling",
        description:
          "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
      },
    ],
    images: {
      coverImages: [""],
      galleryImages: ["", "", ""],
      iconImage: "",
    },
    thumbnailImage: "https://i.pinimg.com/736x/01/bf/9d/01bf9d27dc6b6b44cbfe096a60c30ea3.jpg",
    projectCategory: "UI/UX",
  },
  {
    id: "chisom",
    title: "Chisom Designs",
    backgroundColor: "#0369a1",
    subtitle: "Project Case Study",
    description:
      "Turning bold visuals into lasting brands. From concept to execution.",
    problemStatement:
      "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.",
    possibleSolution:
      "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.",
    possibleSolutionList: [
      "Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
      "Lorem ipsum dolor sit amet, consectetuer.",
      "Lorem ipsum dolor sit amet, consectetuer adipiscing.",
      "Lorem ipsum dolor.",
    ],
    toolsCategories: [
      {
        categoryName: "Development",
        items: [
          { toolsUsedImages: "", toolsUsedText: "TypeScript" },
          { toolsUsedImages: "", toolsUsedText: "React" },
          { toolsUsedImages: "", toolsUsedText: "Tailwind CSS" },
        ],
      },
      {
        categoryName: "Design",
        items: [{ toolsUsedImages: "", toolsUsedText: "Figma" }],
      },
    ],
    designProcess: [
      {
        title: "Discovery & Strategy",
        description:
          "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
      },
      {
        title: "Wireframe",
        description:
          "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
      },
      {
        title: "Visual Identity & Styling",
        description:
          "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
      },
    ],
    images: {
      coverImages: [""],
      galleryImages: ["", "", ""],
      iconImage: "",
    },
    thumbnailImage: "https://i.pinimg.com/736x/84/78/60/8478603ee4d79e893712229910a259bf.jpg",
    projectCategory: "Branding",
  },
  {
    id: "ecosystema",
    title: "Eco Systema",
    backgroundColor: "#10b981",
    subtitle: "Project Case Study",
    description: "Creative ecosystem for emerging modern brands.",
    problemStatement:
      "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.",
    possibleSolution:
      "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.",
    possibleSolutionList: [
      "Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
      "Lorem ipsum dolor sit amet, consectetuer.",
      "Lorem ipsum dolor sit amet, consectetuer adipiscing.",
      "Lorem ipsum dolor.",
    ],
    toolsCategories: [
      {
        categoryName: "Development",
        items: [
          { toolsUsedImages: "", toolsUsedText: "TypeScript" },
          { toolsUsedImages: "", toolsUsedText: "React" },
          { toolsUsedImages: "", toolsUsedText: "Tailwind CSS" },
        ],
      },
      {
        categoryName: "Design",
        items: [{ toolsUsedImages: "", toolsUsedText: "Figma" }],
      },
    ],
    designProcess: [
      {
        title: "Discovery & Strategy",
        description:
          "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
      },
      {
        title: "Wireframe",
        description:
          "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
      },
      {
        title: "Visual Identity & Styling",
        description:
          "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
      },
    ],
    images: {
      coverImages: [""],
      galleryImages: ["", "", ""],
      iconImage: "",
    },
    thumbnailImage: "https://i1-e.pinimg.com/736x/01/77/8f/01778fbe1ca58fc4ab0824845273f8cf.jpg",
    projectCategory: "Web Design",
  },
  {
    id: "graphics",
    title: "Graphics Design",
    backgroundColor: "#3b82f6",
    subtitle: "Project Case Study",
    description:
      "A comprehensive graphics design portfolio highlighting creative works.",
    problemStatement:
      "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.",
    possibleSolution:
      "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.",
    possibleSolutionList: [
      "Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
      "Lorem ipsum dolor sit amet, consectetuer.",
      "Lorem ipsum dolor sit amet, consectetuer adipiscing.",
      "Lorem ipsum dolor.",
    ],
    toolsCategories: [
      {
        categoryName: "Development",
        items: [
          { toolsUsedImages: "", toolsUsedText: "TypeScript" },
          { toolsUsedImages: "", toolsUsedText: "React" },
          { toolsUsedImages: "", toolsUsedText: "Tailwind CSS" },
        ],
      },
      {
        categoryName: "Design",
        items: [{ toolsUsedImages: "", toolsUsedText: "Figma" }],
      },
    ],
    designProcess: [
      {
        title: "Discovery & Strategy",
        description:
          "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
      },
      {
        title: "Wireframe",
        description:
          "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
      },
      {
        title: "Visual Identity & Styling",
        description:
          "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
      },
    ],
    images: {
      coverImages: [""],
      galleryImages: ["", "", ""],
      iconImage: "",
    },
    thumbnailImage: "https://i.pinimg.com/736x/84/78/60/8478603ee4d79e893712229910a259bf.jpg",
    projectCategory: "Video",
  },
];
