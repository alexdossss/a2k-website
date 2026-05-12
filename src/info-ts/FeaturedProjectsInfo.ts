export interface FeaturedProjectInfo {
  id: string;
  title: string;
  image: string;
  url: string;
  backgroundColor: string;
}

export const featuredProjectsInfo: FeaturedProjectInfo[] = [
  {
    id: "fp1",
    title: "Corteza",
    image: "",
    url: "https://example.com/corteza",
    backgroundColor: "#1c1c1c"
  },
  {
    id: "fp2",
    title: "LAUNCHPAD",
    image: "",
    url: "https://example.com/launchpad",
    backgroundColor: "#2d3748"
  },
  {
    id: "fp3",
    title: "Project Sith(eta?)",
    image: "",
    url: "https://example.com/sith",
    backgroundColor: "#4a5568"
  },
  {
    id: "fp4",
    title: "Corteza",
    image: "",
    url: "https://example.com/corteza2",
    backgroundColor: "#718096"
  },
  {
    id: "fp5",
    title: "Future Project",
    image: "",
    url: "https://example.com/future",
    backgroundColor: "#2f855a"
  }
];
