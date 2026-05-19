export interface WorkflowStepInfo {
  id: number;
  title: string;
  description: string;
}

export const workflowInfo: WorkflowStepInfo[] = [
  {
    id: 0,
    title: "Research",
    description: "We dive deep into understanding your audience, market trends, and core objectives to lay a solid foundation for the project. By gathering data and insights, we ensure that every decision is backed by solid reasoning."
  },
  {
    id: 1,
    title: "Ideation",
    description: "Brainstorming and conceptualizing innovative solutions. We explore multiple creative directions, wireframes, and user journeys to find the most effective and engaging approach to solve your unique challenges."
  },
  {
    id: 2,
    title: "Design",
    description: "Translating concepts into beautiful, functional interfaces. Our design process focuses on aesthetics, user experience, and brand consistency to create a polished product that looks great and feels intuitive."
  },
  {
    id: 3,
    title: "Deployment",
    description: "Turning designs into robust, scalable code. We utilize modern technologies and best practices to build a fast, secure, and fully functional application, thoroughly testing it across different environments."
  },
  {
    id: 4,
    title: "Launch",
    description: "Bringing your product to the world. We handle the final checks, optimize for performance, and seamlessly deploy your project to production, ensuring a smooth and successful launch day."
  }
];
