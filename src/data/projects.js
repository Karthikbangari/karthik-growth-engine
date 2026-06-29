import { Cloud, GitBranch, Boxes, Activity } from "lucide-react";

export const PROJECTS = [
  {
    id: "infra-automation",
    title: "Cloud Infrastructure Automation",
    icon: Cloud,
    accent: "from-accent-blue to-accent-purple",
    description:
      "Provisioned AWS infrastructure using Terraform with reusable modules, remote state, and environment-based configuration.",
    tech: ["AWS", "Terraform", "S3 Backend", "DynamoDB Locking", "IAM", "VPC"],
    features: [
      "Automated infrastructure provisioning",
      "Secure IAM setup",
      "Multi-environment structure",
      "Version-controlled infrastructure",
    ],
  },
  {
    id: "cicd-modernization",
    title: "CI/CD Pipeline Modernization",
    icon: GitBranch,
    accent: "from-accent-purple to-accent-green",
    description:
      "Built automated CI/CD pipelines using Jenkins and GitHub Actions to reduce manual deployments and improve release reliability.",
    tech: ["Jenkins", "GitHub Actions", "Docker", "SonarQube", "Snyk"],
    features: [
      "Automated build and test",
      "Security scanning",
      "Docker image creation",
      "Approval-based deployment",
    ],
  },
  {
    id: "k8s-platform",
    title: "Kubernetes Deployment Platform",
    icon: Boxes,
    accent: "from-accent-green to-accent-blue",
    description:
      "Managed containerized applications on Kubernetes / EKS with Helm, ArgoCD, rolling updates, and monitoring.",
    tech: ["Kubernetes", "EKS", "Helm", "ArgoCD", "Prometheus", "Grafana"],
    features: [
      "GitOps deployments",
      "Zero-downtime rollout",
      "Health checks",
      "Monitoring dashboards",
    ],
  },
  {
    id: "monitoring-incident",
    title: "Monitoring & Incident Response",
    icon: Activity,
    accent: "from-accent-blue to-accent-green",
    description:
      "Created monitoring dashboards and alerts using Prometheus, Grafana, and CloudWatch to improve visibility and response time.",
    tech: ["Prometheus", "Grafana", "CloudWatch", "Alerts", "Logs"],
    features: [
      "Real-time dashboards",
      "Error and latency alerts",
      "Faster troubleshooting",
      "Incident documentation",
    ],
  },
];
