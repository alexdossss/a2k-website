export interface Developer {
  id: number;
  name: string;
  role: string;
  image: string;
  desc: string;
  stack: string[];
}

export const developers: Developer[] = [
  {
    id: 1,
    name: "Alex Manabat",
    role: "Frontend Developer",
    image:
      "https://i1-e.pinimg.com/1200x/bb/84/e8/bb84e8891c5b8aea249381b5d7c936e5.jpg",
    desc: "",
    stack: ["React", "TypeScript"],
  },
  {
    id: 2,
    name: "Sophia",
    role: "Backend Developer",
    image:
      "https://i1-e.pinimg.com/1200x/bb/84/e8/bb84e8891c5b8aea249381b5d7c936e5.jpg",
    desc: "",
    stack: ["React", "TypeScript"],
  },
  {
    id: 3,
    name: "Daniel",
    role: "UI/UX Designer",
    image:
      "https://i1-e.pinimg.com/1200x/bb/84/e8/bb84e8891c5b8aea249381b5d7c936e5.jpg",
    desc: "",
    stack: ["React", "TypeScript"],
  },
  {
    id: 4,
    name: "Miguel",
    role: "Full Stack Developer",
    image:
      "https://i1-e.pinimg.com/736x/ee/40/fd/ee40fdfdcd59ce323a0d69265efcab91.jpg",
    desc: "",
    stack: ["React", "TypeScript"],
  },
  {
    id: 5,
    name: "Carla",
    role: "Full Stack Developer",
    image:
      "https://i1-e.pinimg.com/1200x/bb/84/e8/bb84e8891c5b8aea249381b5d7c936e5.jpg",
    desc: "",
    stack: ["React", "Node.js", "Figma"],
  },
];
