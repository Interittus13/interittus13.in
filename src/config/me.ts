import { links } from "../config/links";

export const me = {
  metadata: {
    title: 'About Me | Arpit Gupta',
    description: 'DevOps Engineer & Cloud Architect. Turning infrastructure into code. Turning complexity into scale.',
  },
  site: "https://www.interittus.in",
  name: "Arpit Gupta",
  nickname: "interittus13",
  image: "/static/images/portrait.png",
  email: "mailto:arpit.gupta.0121@gmail.com",
  location: {
    name: "Indore, India",
  },
  bio: "Turning infrastructure into code. Turning complexity into scale.",
  intro: {
    line1: "Building scalable cloud infrastructure on ",
    highlight: "Azure & AWS",
    line2: " with Kubernetes, Terraform, and CI/CD pipelines.",
  },
  titles: {
    about: "About Me",
    portfolio: "Portfolio",
    projects: "Featured Projects",
    journeyHeader: "Journey",
    journeyTitle: "Education & Career",
    spotlightHeader: "Spotlight",
    spotlightTitle: "Professional Work",
    openSourceHeader: "Contributions",
    openSourceTitle: "Open Source",
    freelancerHeader: "Freelance",
    freelancerTitle: "Independent Work",
    otherHeader: "Experiments",
    otherTitle: "Other Works",
  },
  roles: ['DevOps Engineer', 'Cloud Architect', 'SRE'],
  social: [
    ...links,
    {
      url: "mailto:arpit.gupta.0121@gmail.com",
      icon: 'SiGmail',
      fill: "fill-[#DB4437]",
      border: "border-[#DB4437]",
      shadow: "shadow-pink-300",
      text: "text-[#DB4437]",
      color: "from-bg-[#DB4437] to-bg-[#DB4437]",
      name: "Gmail",
    },
  ],
  overview: [],
  education: [
    {
      name: "Empower Solutions",
      time: "2024-2025",
      degree: "DevOps Engineer",
      color: "red",
    },
    {
      name: "Mantec Consultants",
      time: "2022-2024",
      degree: "DevOps Engineer",
      color: "yellow",
    },
    {
      name: "Subharti University",
      time: "2019-2022",
      degree: "BS, Computer Science",
      color: "blue",
    },
  ],
  projects: {
    employee: [],
    freelancer: [],
    openSource: [],
    other: [],
  },
  skills: [
    {
      title: "Cloud Infrastructure",
      items: [
        { name: "Azure", color: "bg-[#06B6D4]", icon: 'SiMicrosoftazure' },
        { name: "Kubernetes", color: "bg-[#326CE5]", icon: 'SiKubernetes' },
        { name: "Azure DevOps", color: "bg-[#339933]", icon: 'SiAzuredevops' },
        { name: "Azure Pipelines", color: "bg-[#F7931E]", icon: 'SiAzurepipelines' },
        { name: "Azure Function", color: "bg-[#007396]", icon: 'SiAzurefunctions' },
        { name: "AWS ECS", color: "bg-[#FF9900]", icon: 'SiAmazonecs' },
        { name: "Terraform", color: "bg-[#844FBA]", icon: 'SiTerraform' },
      ],
    },
    {
      title: "DevOps & Monitoring",
      items: [
        { name: "AWS EC2", color: "bg-[#FF9900]", icon: 'SiAmazonec2' },
        { name: "AWS Lambda", color: "bg-[#FF9900]", icon: 'SiAwslambda' },
        { name: "AWS S3 Bucket", color: "bg-[#569A31]", icon: 'SiAmazons3' },
        { name: "AWS EKS", color: "bg-[#FF9900]", icon: 'SiAmazoneks' },
        { name: "Grafana", color: "bg-[#F46800]", icon: 'SiGrafana' },
      ],
    },
    {
      title: "Security & Tools",
      items: [
        { name: "Trivy", color: "bg-[#1904DA]", icon: 'SiAqua' },
        { name: "Argo CD", color: "bg-[#EF7B4D]", icon: 'SiArgo' },
        { name: "Prometheus", color: "bg-[#E6522C]", icon: 'SiPrometheus' },
        { name: "Docker", color: "bg-[#0AA6D8]", icon: 'SiDocker' },
        { name: "Sonar Qube", color: "bg-[#4E9BCD]", icon: 'SiSonarqube' },
        { name: "Typescript", color: "bg-[#3178C6]", icon: 'SiTypescript' },
      ],
    },
  ],
};
