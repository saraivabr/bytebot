import { Output, randomPassword, Services } from "~templates-utils";
import { Input } from "./meta";

export function generate(input: Input): Output {
  const services: Services = [];

  // PostgreSQL Database Service
  services.push({
    type: "postgres",
    data: {
      projectName: input.projectName,
      serviceName: "postgres",
      password: input.postgresPassword || randomPassword(),
    },
  });

  // Bytebot Desktop Service (Virtual Ubuntu with XFCE)
  services.push({
    type: "app",
    data: {
      projectName: input.projectName,
      serviceName: "bytebot-desktop",
      source: {
        type: "image",
        image: "ghcr.io/bytebot-ai/bytebot-desktop:edge",
      },
      domains: [],
      env: [
        "DISPLAY=:0",
      ].join("\n"),
      mounts: [],
      deploy: {
        shm_size: "2g",
        privileged: true,
      },
    },
  });

  // Bytebot Agent Service (Task orchestration & AI coordination)
  const envVars = [
    `DATABASE_URL=postgresql://postgres:${input.postgresPassword || randomPassword()}@$(PROJECT_NAME)_postgres:5432/$(PROJECT_NAME)`,
    "BYTEBOT_DESKTOP_BASE_URL=http://$(PROJECT_NAME)_bytebot-desktop:9990",
  ];

  // Add API keys based on provider selection
  if (input.anthropicApiKey) {
    envVars.push(`ANTHROPIC_API_KEY=${input.anthropicApiKey}`);
  }
  if (input.openaiApiKey) {
    envVars.push(`OPENAI_API_KEY=${input.openaiApiKey}`);
  }
  if (input.geminiApiKey) {
    envVars.push(`GEMINI_API_KEY=${input.geminiApiKey}`);
  }

  services.push({
    type: "app",
    data: {
      projectName: input.projectName,
      serviceName: "bytebot-agent",
      source: {
        type: "image",
        image: "ghcr.io/bytebot-ai/bytebot-agent:edge",
      },
      domains: [],
      env: envVars.join("\n"),
      mounts: [],
    },
  });

  // Bytebot UI Service (Web interface)
  services.push({
    type: "app",
    data: {
      projectName: input.projectName,
      serviceName: "bytebot-ui",
      source: {
        type: "image",
        image: "ghcr.io/bytebot-ai/bytebot-ui:edge",
      },
      domains: [
        {
          host: "$(EASYPANEL_DOMAIN)",
          port: 9992,
        },
      ],
      env: [
        "NODE_ENV=production",
        "BYTEBOT_AGENT_BASE_URL=http://$(PROJECT_NAME)_bytebot-agent:9991",
        "BYTEBOT_DESKTOP_VNC_URL=http://$(PROJECT_NAME)_bytebot-desktop:9990/websockify",
      ].join("\n"),
      mounts: [],
    },
  });

  return { services };
}
