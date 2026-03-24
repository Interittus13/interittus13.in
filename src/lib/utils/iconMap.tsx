import {
  SiGmail,
  SiKubernetes,
  SiTypescript,
  SiTerraform,
  SiDocker,
  SiGrafana,
  SiSonarqube,
  SiAqua,
  SiPrometheus,
  SiAwslambda,
  SiAmazons3,
  SiAmazonec2,
  SiAmazonecs,
  SiAmazoneks,
  SiArgo,
  SiGithub,
  SiLinkedin,
  SiInstagram,
  SiX,
  SiFacebook,
} from "@icons-pack/react-simple-icons";

const ICON_MAP: Record<string, any> = {
  SiGithub,
  SiGmail,
  SiKubernetes,
  SiTypescript,
  SiTerraform,
  SiDocker,
  SiGrafana,
  SiSonarqube,
  SiAqua,
  SiPrometheus,
  SiAwslambda,
  SiAmazons3,
  SiAmazonec2,
  SiAmazonecs,
  SiAmazoneks,
  SiArgo,
  SiLinkedin,
  SiInstagram,
  SiX,
  SiFacebook,
};

export function getIconByName(name: string) {
  if (!name) return null;
  const normalized = name.toLowerCase();
  for (const key in ICON_MAP) {
    if (key.toLowerCase() === normalized) return ICON_MAP[key];
  }
  return null;
}
