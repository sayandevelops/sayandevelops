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
  { name: "HTML5, CSS3, Tailwind", level: 90 },
  { name: "JavaScript (ES6+), TypeScript", level: 85 },
  { name: "React.js, Next.js", level: 90 },
  { name: "Node.js, Express.js", level: 75 },
  { name: "MongoDB, SQL Basics", level: 70 },
  { name: "Firebase (Auth, DB, Hosting)", level: 80 },
  { name: "Git, GitHub, Version Control", level: 85 },
  { name: "API Integration (REST, JSON)", level: 85 },
  { name: "Deployment (Vercel, Netlify, Render)", level: 80 },
  { name: "Responsive Design, Media Queries", level: 85 },
  { name: "Debugging, Chrome DevTools", level: 80 },
  { name: "GSAP, Framer Motion, Animations", level: 75 },
  { name: "UI/UX Principles, Figma", level: 70 },
  { name: "AI Integration (Chatbots, APIs), Model Training", level: 85 }
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
{
  title: "Custom AI Chatbot",
  description: "Engineered a fully customizable AI-powered chatbot from scratch, integrating both frontend and backend systems. Trained and fine-tuned language models for domain-specific performance, enabling personalized responses. Implemented smooth UI/UX with GSAP animations and ensured responsive, device-friendly design. Ideal for client-specific use cases including customer support, cooking assistants, and learning bots."
},
{
  title: "AI Solutions Developer",
  description: "Built advanced, production-ready AI systems involving custom model training, fine-tuning, and integration into real-world web applications. Specialized in creating scalable, domain-specific AI features such as chat interfaces, intelligent assistants, and dynamic content generators using custom-trained models and APIs. Ensured full-stack integration with responsive UIs, GSAP animations, and optimized deployment."
},
{
  title: "SEO Service Website",
  description: "Developed a modern, SEO-optimized website . Implemented server-side rendering (SSR), meta tags, and schema markup to enhance search engine visibility and performance."
},

];

export const projectsData: Project[] = [
 {
  id: "proj1",
  title: "FlavorAI",
  image: "https://placehold.co/600x400.png",
  dataAiHint: "AI Cooking Assistant",
  techStack: ["React", "Next.js", "Firebase", "Tailwind CSS"],
  description: "FlavorAI is an AI-powered cooking assistant chatbot built with React and Next.js. It helps users find recipes, cooking tips, and ingredient suggestions using AI integration. Features include real-time chat, smooth GSAP animations, responsive UI, and Firebase-based user authentication and hosting.",
  liveLink: "https://flavor-ai-pied.vercel.app/",
  
},

  {
    id: "proj2",
    title: "Affiliate - Business Website",
    image: "https://placehold.co/600x400.png",
    dataAiHint: "Affiliate Website",
    techStack: ["HTML", "CSS", "JS", "Typescript" , "Goolgle Form / HTML FORM" ,],
    description: "A collaborative task management tool to help teams organize and track their work efficiently.",
    liveLink: "#",
   
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
  {
    id: "proj4",
    title: "Portfolio Website",
    image: "https://placehold.co/600x400.png",
    dataAiHint: "personal website",
    techStack: ["Next.js", "Tailwind CSS", "Framer Motion"],
    description: "A sleek and modern personal portfolio to showcase projects and skills.",
    liveLink: "#",
  },
  {
    id: "proj5",
    title: "Portfolio Website",
    image: "https://placehold.co/600x400.png",
    dataAiHint: "personal website",
    techStack: ["Next.js", "Tailwind CSS", "Framer Motion"],
    description: "A sleek and modern personal portfolio to showcase projects and skills.",
    liveLink: "#",
  },
  {
    id: "proj6",
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
    name: "RX",
    avatar: "https://i.pravatar.cc/100?img=3",
    dataAiHint: "person portrait",
    rating: 5,
    text: "Sayan delivered an exceptional product on time and with great communication. Highly recommended!",
    company: "Tech Solutions Inc.",
  },
  {
    id: "rev2",
    name: "John",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    dataAiHint: "professional headshot",
    rating: 4,
    text: "Great to work with, very knowledgeable and brought our vision to life. Some minor delays but overall excellent.",
    company: "Creative Minds LLC",
  },
  {
    id: "rev3",
    name: "Ratnakar Halder ",
    avatar: "https://i.pravatar.cc/100?img=12",
    dataAiHint: "business person",
    rating: 5,
    text: "The UI/UX design Sayan provided was top-notch and significantly improved our user engagement.",
    company: "Mediatexpert",
  },
];
