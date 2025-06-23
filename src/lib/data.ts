
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
  description: string;
  techStack: string[];
  image: string;
  dataAiHint?: string;
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

export type ExperienceEntry = {
  id: string;
  role: string;
  company: string;
  companyLogo?: string;
  dataAiHintLogo?: string;
  duration: string;
  description: string;
  techStack: string[];
  companyLink?: string;
  icon?: React.ComponentType<{ className?: string }>;
};

export type CertificateEntry = {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  thumbnailUrl: string;
  dataAiHint?: string;
  certificateUrl?: string;
  icon?: React.ComponentType<{ className?: string }>;
};

export const skillsData: Skill[] = [
  { name: "HTML5, CSS3, Tailwind, Responsive Design", level: 90 },
  { name: "JavaScript (ES6+), TypeScript, Media Queries", level: 85 },
  { name: "React.js, Next.js, GSAP, Framer Motion", level: 90 },
  { name: "Node.js, Express.js, API (REST, JSON)", level: 80 },
  { name: "MongoDB, SQL Basics, Firebase (Auth, DB)", level: 75 },
  { name: "Git, GitHub, Version Control, DevTools", level: 85 },
  { name: "Deployment: Vercel, Netlify, Render", level: 80 },
  { name: "UI/UX Design, Figma, Animations", level: 75 },
  { name: "AI Integration, Chatbots, API  SaaS Tools Development", level: 65 },
  { name: "Python, TensorFlow, Model Training, Fine-tuning AI Automation & Workflow Bots", level: 80 }
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
    title: "Advanced AI System with LLM Integration",
    description: "Built advanced, production-ready AI systems involving custom model training, fine-tuning, and integration into real-world web applications. Specialized in creating scalable, domain-specific AI features such as chat interfaces, intelligent assistants, and dynamic content generators using custom-trained models and APIs. Ensured full-stack integration with responsive UIs, GSAP animations, and optimized deployment."
  },
  {
    title: "SEO Service Website",
    description: "Developed a modern, SEO-optimized website . Implemented server-side rendering (SSR), meta tags, and schema markup to enhance search engine visibility and performance."
  },
];

export const demoProjectData: Project[] = [
  {
    id: "proj1",
    title: "FlavorAI",
    image: "https://placehold.co/600x400.png",
    dataAiHint: "AI Cooking Assistant",
    techStack: ["HTML", "Javascript" ,"React", "Firebase", "Tailwind CSS","Python", "Tensorflow" , "Responsive Design"],
    description: "FlavorAI is an AI-powered cooking assistant chatbot built with React and Next.js. It helps users find recipes, cooking tips, and ingredient suggestions using AI integration. Features include real-time chat, smooth GSAP animations, responsive UI, and Firebase-based user authentication and hosting.",
    liveLink: "https://flavor-ai-pied.vercel.app/",
  },
  {
    id: "proj2",
    title: "Affiliate - Business Website",
    image: "https://placehold.co/600x400.png",
    dataAiHint: "Affiliate Website",
    techStack: ["HTML", "CSS", "JS", "Typescript", "Goolgle Form / HTML FORM" ,"Responsive Design",],
    description: "Developed a fully functional affiliate business website for a client within 1 month, using HTML, CSS, JavaScript, and TypeScript, integrated with Google/HTML forms for data collection.",
    liveLink: "https://www.mediatexpert.com/",
  },
  {
    id: "proj3",
    title: "Modern Developer Portfolio",
    image: "https://placehold.co/600x400.png",
    dataAiHint: "personal website",
    techStack: ["React.js", "Tailwind CSS", "Framer Motion", "Gsap", "Responsive Design" ,],
    description: "A visually engaging and fully responsive portfolio website built with Next.js and Tailwind CSS. Includes smooth animations using Framer Motion, showcasing projects, skills, and contact information to highlight personal branding.",
    liveLink: "/#hero",
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

export const demoExperienceData: ExperienceEntry[] = [
  {
    id: 'demo1',
    role: 'Full Stack Developer',
    company: 'Innovate Inc.',
    companyLogo: 'https://placehold.co/200x80.png',
    dataAiHintLogo: 'company logo',
    duration: 'Jan 2022 - Present',
    description: 'Developed and maintained web applications using Next.js, TypeScript, and Node.js. Collaborated with cross-functional teams to deliver high-quality products.',
    techStack: ['Next.js', 'TypeScript', 'Node.js', 'Firebase', 'Tailwind CSS'],
    companyLink: '#',
  },
  {
    id: 'demo2',
    role: 'Frontend Developer',
    company: 'Creative Solutions',
    companyLogo: 'https://placehold.co/200x80.png',
    dataAiHintLogo: 'company logo abstract',
    duration: 'Jun 2020 - Dec 2021',
    description: 'Built responsive and interactive user interfaces for client websites using React and modern CSS frameworks. Focused on creating pixel-perfect and accessible designs.',
    techStack: ['React', 'JavaScript', 'Sass', 'Figma', 'Storybook'],
    companyLink: '#',
  }
];


export const demoCertificatesData: CertificateEntry[] = [
  {
    id: "cert1",
    title: "Google Certified Professional Cloud Architect",
    issuer: "Google Cloud",
    issueDate: "Issued Mar 2023",
    thumbnailUrl: "https://placehold.co/600x400.png",
    dataAiHint: "certificate tech",
    certificateUrl: "#",
  },
  {
    id: "cert2",
    title: "Advanced JavaScript Ninja",
    issuer: "Udemy",
    issueDate: "Issued Nov 2022",
    thumbnailUrl: "https://placehold.co/600x400.png",
    dataAiHint: "coding award",
    certificateUrl: "#",
  },
  {
    id: "cert3",
    title: "Responsive Web Design",
    issuer: "freeCodeCamp",
    issueDate: "Issued May 2022",
    thumbnailUrl: "https://placehold.co/600x400.png",
    dataAiHint: "web design",
    certificateUrl: "#",
  },
  {
    id: "cert4",
    title: "Full-Stack Web Development with React",
    issuer: "Coursera",
    issueDate: "Issued Jan 2024",
    thumbnailUrl: "https://placehold.co/600x400.png",
    dataAiHint: "development course",
    certificateUrl: "#",
  }
];
