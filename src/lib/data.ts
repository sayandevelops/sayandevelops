export type Skill = {
  name: string;
  level: number; // Percentage 0-100
  icon?: React.ComponentType<{ className?: string }>;
};

export type Service = {
  title: string;
  description: string;
  icon?: React.ComponentType<{ className?: string }>;
};

export type Project = {
  id: string;
  title: string;
  image: string;
  dataAiHint?: string;
  techStack: string[];
  description: string;
  liveLink?: string;
  githubLink?: string;
};

export type Review = {
  id: string;
  name: string;
  avatar: string;
  dataAiHint?: string;
  rating: number; // 1-5
  text: string;
  company?: string;
};

export const skillsData: Skill[] = [
  { name: "HTML5", level: 95 },
  { name: "CSS3 & Tailwind", level: 90 },
  { name: "JavaScript (ES6+)", level: 85 },
  { name: "React & Next.js", level: 90 },
  { name: "Firebase", level: 80 },
  { name: "Node.js & Express", level: 75 },
  { name: "Git & GitHub", level: 85 },
  { name: "UI/UX Principles", level: 70 },
];

export const servicesData: Service[] = [
  {
    title: "Web Development",
    description: "Building responsive, high-performance websites and web applications using modern technologies.",
  },
  {
    title: "UI/UX Design",
    description: "Crafting intuitive and engaging user interfaces with a focus on user experience and accessibility.",
  },
  {
    title: "API Integration",
    description: "Seamlessly integrating third-party APIs or developing custom APIs to extend functionality.",
  },
   {
    title: "Firebase Solutions",
    description: "Leveraging Firebase for backend services, authentication, real-time databases, and hosting.",
  },
];

export const projectsData: Project[] = [
  {
    id: "proj1",
    title: "E-commerce Platform",
    image: "https://placehold.co/600x400.png",
    dataAiHint: "online store",
    techStack: ["React", "Next.js", "Firebase", "Tailwind CSS"],
    description: "A full-featured e-commerce website with product listings, cart functionality, and user authentication.",
    liveLink: "#",
    githubLink: "#",
  },
  {
    id: "proj2",
    title: "Task Management App",
    image: "https://placehold.co/600x400.png",
    dataAiHint: "productivity app",
    techStack: ["React", "Firebase Auth", "Firestore", "Chakra UI"],
    description: "A collaborative task management tool to help teams organize and track their work efficiently.",
    liveLink: "#",
    githubLink: "#",
  },
  {
    id: "proj3",
    title: "Portfolio Website",
    image: "https://placehold.co/600x400.png",
    dataAiHint: "personal website",
    techStack: ["Next.js", "Tailwind CSS", "Framer Motion"],
    description: "A sleek and modern personal portfolio to showcase projects and skills.",
    liveLink: "#",
  },
];

export const reviewsData: Review[] = [
  {
    id: "rev1",
    name: "Jane Doe",
    avatar: "https://placehold.co/100x100.png",
    dataAiHint: "person portrait",
    rating: 5,
    text: "Sayan delivered an exceptional product on time and with great communication. Highly recommended!",
    company: "Tech Solutions Inc.",
  },
  {
    id: "rev2",
    name: "John Smith",
    avatar: "https://placehold.co/100x100.png",
    dataAiHint: "professional headshot",
    rating: 4,
    text: "Great to work with, very knowledgeable and brought our vision to life. Some minor delays but overall excellent.",
    company: "Creative Minds LLC",
  },
  {
    id: "rev3",
    name: "Alice Brown",
    avatar: "https://placehold.co/100x100.png",
    dataAiHint: "business person",
    rating: 5,
    text: "The UI/UX design Sayan provided was top-notch and significantly improved our user engagement.",
    company: "Innovate Hub",
  },
];
