export interface Developer {
  id: number;
  name: string;
  nickname: string;
  role: string;
  image: string;
  desc: string;
  stack: string[];
  glb: string;
}

export const developers: Developer[] = [
  {
    id: 1,
    name: "Alex Manabat",
    nickname: "Alex",
    role: "Frontend Developer",
    image:
      "https://i.pinimg.com/736x/01/23/11/012311511dd3405969d66535a4436527.jpg",
    desc: "",
    stack: ["React", "TypeScript"],
    glb: "",
  },
  {
    id: 2,
    name: "Sophia",
    nickname: "Soph",
    role: "Backend Developer",
    image:
      "https://i.pinimg.com/736x/52/e0/7c/52e07cc440d6bc964d46224d0a885e7e.jpg",
    desc: "",
    stack: ["React", "TypeScript"],
    glb: "",
  },
  {
    id: 3,
    name: "Daniel",
    nickname: "Dan",
    role: "UI/UX Designer",
    image:
      "https://i1-e.pinimg.com/1200x/3b/56/94/3b56942b343062c5d6c6a830129aabdc.jpg",
    desc: "",
    stack: ["React", "TypeScript"],
    glb: "",
  },
  {
    id: 4,
    name: "Miguel",
    nickname: "Miggy",
    role: "Full Stack Developer",
    image:
      "https://i1-e.pinimg.com/736x/ee/40/fd/ee40fdfdcd59ce323a0d69265efcab91.jpg",
    desc: "",
    stack: ["React", "TypeScript"],
    glb: "",
  },
  {
    id: 5,
    name: "Carla",
    nickname: "Carls",
    role: "Full Stack Developer",
    image:
      "https://i1-e.pinimg.com/736x/84/1d/56/841d566aec327b063984f91574fff6e8.jpg",
    desc: "",
    stack: ["React", "Node.js", "Figma"],
    glb: "",
  },
];
