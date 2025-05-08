import { links } from "../config/links";
import {
  SiGmail,
  SiKubernetes,
  SiTypescript,
  SiAzuredevops,
  SiTerraform,
  SiDocker,
  SiGrafana,
  SiSonarqube,
  SiAqua,
  SiAzurepipelines,
  SiAzurefunctions,
  SiMicrosoftazure,
  SiPrometheus,
  SiAmazonaws,
  SiAwslambda,
  SiAmazons3,
  SiAmazonec2,
  SiAmazonecs,
  SiAmazoneks,
  SiArgo,
} from "@icons-pack/react-simple-icons";

export const me = {
  site: "https://www.interittus.in",
  name: "Arpit Gupta",
  nickname: "interittus13",
  image: "/static/images/portrait.png",
  email: "mailto:morethanmin.dev@gmail.com",
  location: {
    name: "Indore, India",
    light: "/static/images/map_light.png",
    dark: "/static/images/map_dark.png",
  },
  bio: "💻 🎨 🎮 ⚡️",
  social: [
    ...links,
    {
      url: "mailto:morethanmin.dev@gmail.com",
      icon: SiGmail,
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
      name: "Myongji University",
      time: "2019-2022",
      degree: "BS, Computer Science",
      color: "blue",
      logo: "/static/images/njupt.png",
    },
    {
      name: "Mantec Consultants",
      time: "2022-2024",
      degree: "DevOps Engineer",
      color: "yellow",
      logo: "/static/images/neu.png",
    },
    {
      name: "Empower Solutions",
      time: "2024",
      degree: "DevOps Engineer",
      color: "red",
      logo: "/static/images/nyit.png",
    },
  ],
  openSources: [
    {
      title: "morethan-log",
      description: "A static blog using notion database 😎",
      website: "",
      link: "https://github.com/morethanmin/morethan-log",
      tags: [
        {
          name: "⭐ 600+",
          color: "yellow",
        },
        {
          name: "🍴 300+",
          color: "blue",
        },
        {
          name: "Next.js",
          color: "red",
        },
        {
          name: "Blog Template",
          color: "orange",
        },
        {
          name: "Notion API",
          color: "green",
        },
      ],
    },
    {
      title: "Azure Cost Tracker - ACT",
      description:
        "A Python tool for tracking Azure subscription costs, generating reports, and sending automated email notifications.",
      website: "",
      link: "https://github.com/interittus13/AzureCostTracker",
      tags: [
        {
          name: "React",
          color: "gray",
        },
        {
          name: "Library",
          color: "pink",
        },
        {
          name: "Component",
          color: "brown",
        },
      ],
    },
  ],
  projects: [
    {
      name: "BoomerangFx",
      description:
        "BoomerangFX is a cloud-based SaaS platform designed for aesthetic medicine, cosmetic surgery, and wellness clinics.",
      tip: "Coming Soon on App Store",
      link: "https://www.boomerangfx.com",
      images: [],
      image: "/static/images/coquality/view.svg",
      icon: "/static/images/coquality-logo.svg",
      logo: {
        light: "/static/images/boomerangfx/logo_dark.svg",
        dark: "/static/images/boomerangfx/logo_dark.svg",
      },
    },
    {
      name: "PlanOmatic",
      description:
        "PlanOmatic provides property insights, 3D tours, floor plans, and photography services for real estate professionals.",
      tag: ["Web App", "Database Design", "Recommendation algorithm"],
      link: "https://www.planomatic.com/",
      video: "/static/videos/highlight.mov",
      icon: "/static/images/highlight.svg",
      logo: {
        light: "/static/images/planomatic/logo_light.svg",
        dark: "/static/images/planomatic/logo_light.svg",
      },
    },
  ],
  skills: [
    [
      { name: "Azure", color: "bg-[#06B6D4]", icon: SiMicrosoftazure },
      { name: "Kubernetes", color: "bg-[#326CE5]", icon: SiKubernetes },
      { name: "Azure DevOps", color: "bg-[#339933]", icon: SiAzuredevops },
      {
        name: "Azure Pipelines",
        color: "bg-[#F7931E]",
        icon: SiAzurepipelines,
      },
      { name: "Azure Function", color: "bg-[#007396]", icon: SiAzurefunctions },
      { name: "AWS ECS", color: "bg-[#FF9900]", icon: SiAmazonecs },
      { name: "Terraform", color: "bg-[#844FBA]", icon: SiTerraform },
    ],
    [
      { name: "AWS EC2", color: "bg-[#FF9900]", icon: SiAmazonec2 },
      { name: "Amazon Web Service", color: "bg-[#232F3E]", icon: SiAmazonaws },
      { name: "AWS Lambda", color: "bg-[#FF9900]", icon: SiAwslambda },
      { name: "AWS S3 Bucket", color: "bg-[#569A31]", icon: SiAmazons3 },
      { name: "AWS EKS", color: "bg-[#FF9900]", icon: SiAmazoneks },
      { name: "Grafana", color: "bg-[#F46800]", icon: SiGrafana },
    ],
    [
      { name: "Trivy", color: "bg-[#1904DA]", icon: SiAqua },
      { name: "Argo CD", color: "bg-[#EF7B4D]", icon: SiArgo },
      { name: "Prometheus", color: "bg-[#E6522C]", icon: SiPrometheus },
      { name: "Docker", color: "bg-[#0AA6D8]", icon: SiDocker },
      { name: "Sonar Qube", color: "bg-[#4E9BCD]", icon: SiSonarqube },
      { name: "Typescript", color: "bg-[#3178C6]", icon: SiTypescript },
    ],
  ],
};
