# Bytebot Easypanel Template

This directory contains the Easypanel deployment template for Bytebot, an open-source AI Desktop Agent.

## About This Template

This template allows users to deploy Bytebot on Easypanel with a one-click installation. The template deploys four services:

1. **bytebot-ui** - Web interface for task management (port 9992, public)
2. **bytebot-agent** - Task orchestration and AI coordination (port 9991, private)
3. **bytebot-desktop** - Virtual Ubuntu desktop with XFCE (port 9990, private)
4. **postgres** - PostgreSQL database for persistence (private)

## Files

- **meta.yaml** - Template metadata, description, schema for user inputs, and documentation
- **index.ts** - Service generation function that creates the Docker service configurations
- **assets/logo.png** - Bytebot logo for the Easypanel marketplace
- **meta.ts** - Auto-generated TypeScript types (not included in repo, generated during build)

## Template Structure

### meta.yaml

Defines:
- Template name and description
- JSON Schema for user input fields (project name, AI provider, API keys, database password)
- Benefits, features, and tags for categorization
- Installation instructions
- Links to documentation and community resources
- Change log and contributors

### index.ts

The `generate()` function creates four services:
- PostgreSQL database with configurable password
- Bytebot Desktop with shared memory and privileged mode for desktop environment
- Bytebot Agent with database connection and AI provider API keys
- Bytebot UI with domain configuration and environment variables

All services use official pre-built Docker images from `ghcr.io/bytebot-ai`.

## Submitting to Easypanel

To make this template available in the Easypanel marketplace:

1. Fork the [easypanel-io/templates](https://github.com/easypanel-io/templates) repository
2. Copy this template directory to the `templates/` folder as `templates/bytebot/`
3. Ensure you have:
   - A square logo (logo.png or logo.svg) in the assets folder
   - A screenshot (screenshot.png) showing Bytebot in action
4. Test the template:
   ```bash
   npm install
   npm run build
   npm run prettier
   ```
5. Submit a pull request to the Easypanel templates repository

## Testing Locally

To test this template on your Easypanel instance:

1. Build the template to generate the schema JSON
2. Import the generated JSON into your Easypanel instance
3. Deploy and verify all services start correctly
4. Test the web UI and task creation functionality

## User Requirements

Users deploying Bytebot via this template need:
- An Easypanel instance (self-hosted or cloud)
- At least one AI provider API key:
  - Anthropic API key (for Claude) - https://console.anthropic.com/
  - OpenAI API key (for GPT) - https://platform.openai.com/api-keys
  - Google Gemini API key - https://aistudio.google.com/app/apikey

## Environment Variables

The template configures these environment variables:

### bytebot-agent
- `DATABASE_URL` - PostgreSQL connection string
- `BYTEBOT_DESKTOP_BASE_URL` - URL to desktop service
- `ANTHROPIC_API_KEY` - Anthropic API key (optional)
- `OPENAI_API_KEY` - OpenAI API key (optional)
- `GEMINI_API_KEY` - Google Gemini API key (optional)

### bytebot-ui
- `NODE_ENV` - Set to production
- `BYTEBOT_AGENT_BASE_URL` - URL to agent service
- `BYTEBOT_DESKTOP_VNC_URL` - URL to desktop VNC websocket

### bytebot-desktop
- `DISPLAY` - X11 display number (set to :0)

## Support

For issues or questions:
- **Documentation**: https://docs.bytebot.ai
- **GitHub**: https://github.com/bytebot-ai/bytebot
- **Discord**: https://discord.com/invite/d9ewZkWPTP

## License

This template is part of the Bytebot project and is licensed under Apache 2.0.
