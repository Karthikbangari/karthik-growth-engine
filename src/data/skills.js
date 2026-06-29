import { Cloud, Cog, Boxes, Activity, ShieldCheck } from "lucide-react";

// Each category renders as a tab + a glass card of skills.
export const SKILLS = [
  {
    id: "cloud",
    label: "Cloud",
    icon: Cloud,
    items: ["AWS", "Azure (basics)", "EC2", "S3", "RDS", "VPC", "IAM", "CloudWatch"],
  },
  {
    id: "devops",
    label: "DevOps",
    icon: Cog,
    items: ["Jenkins", "GitHub Actions", "Docker", "Kubernetes", "ArgoCD", "Helm", "GitOps", "CI/CD"],
  },
  {
    id: "iac",
    label: "Infrastructure as Code",
    icon: Boxes,
    items: ["Terraform", "Ansible", "Remote Backend", "State Locking"],
  },
  {
    id: "monitoring",
    label: "Monitoring",
    icon: Activity,
    items: ["Prometheus", "Grafana", "CloudWatch", "Logs", "Alerts"],
  },
  {
    id: "security",
    label: "Security",
    icon: ShieldCheck,
    items: ["IAM Roles", "Secrets Manager", "KMS", "Snyk", "Security Scanning", "Least Privilege"],
  },
];
