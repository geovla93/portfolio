export type Project = {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
};

export const projects = [
  {
    title: "E-Commerce Platform",
    description:
      "A full-featured e-commerce platform with real-time inventory management, payment processing, and admin dashboard.",
    image: "/placeholder.svg",
    technologies: ["Next.js", "TypeScript", "Stripe", "Prisma", "PostgreSQL"],
    liveUrl: "https://ecommerce-demo.com",
    githubUrl: "https://github.com/username/ecommerce",
  },
  {
    title: "AI Task Manager",
    description:
      "Smart task management app that uses AI to categorize, prioritize, and suggest optimal task scheduling.",
    image: "/placeholder.svg",
    technologies: ["React", "Python", "TensorFlow", "FastAPI", "MongoDB"],
    liveUrl: "https://ai-taskmanager.com",
    githubUrl: "https://github.com/username/ai-taskmanager",
  },
  {
    title: "Real-time Chat Application",
    description:
      "Feature-rich chat application with real-time messaging, file sharing, and video calls.",
    image: "/placeholder.svg",
    technologies: ["React", "Socket.io", "WebRTC", "Node.js", "Redis"],
    liveUrl: "https://chatapp-demo.com",
    githubUrl: "https://github.com/username/chat-app",
  },
  {
    title: "AI Image Generator",
    description:
      "An AI image generator that uses a model to generate images based on a prompt.",
    image: "/placeholder.svg",
    technologies: ["React", "Next.js", "Tailwind CSS", "Shadcn UI"],
    liveUrl: "https://ai-image-generator.com",
    githubUrl: "https://github.com/username/ai-image-generator",
  },
] as const satisfies Project[];
