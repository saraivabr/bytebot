# Contributing the Bytebot Template to Easypanel

This guide explains how to submit the Bytebot template to the official Easypanel templates repository.

## Prerequisites

- GitHub account
- Node.js and npm installed
- Familiarity with Git and pull requests

## Submission Steps

### 1. Fork the Easypanel Templates Repository

1. Go to https://github.com/easypanel-io/templates
2. Click "Fork" to create your own copy of the repository
3. Clone your fork locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/templates.git
   cd templates
   ```

### 2. Copy the Template Files

Copy the Bytebot template from this repository to the Easypanel templates repository:

```bash
# From the Bytebot repository
cp -r easypanel-template /path/to/templates/templates/bytebot
```

Ensure the following files are in place:
- `templates/bytebot/meta.yaml` - Template metadata and schema
- `templates/bytebot/index.ts` - Service generation function
- `templates/bytebot/assets/logo.png` - Bytebot logo (square format)
- `templates/bytebot/assets/screenshot.png` - Screenshot of Bytebot UI (to be added)

### 3. Add a Screenshot

Take a high-quality screenshot of Bytebot in action:
- Show the UI with a task being executed
- Ensure the desktop stream is visible
- Resolution should be at least 1920x1080
- Save as `templates/bytebot/assets/screenshot.png`

### 4. Validate the Template

Before submitting, test the template:

```bash
cd /path/to/templates

# Install dependencies
npm install

# Build the template (generates meta.ts and validates schema)
npm run build

# Format code
npm run prettier

# Check for any errors
npm test  # if tests exist
```

Fix any errors that appear during the build process.

### 5. Test in Easypanel (Optional but Recommended)

If you have access to an Easypanel instance:

1. Export the generated template JSON
2. Import it into your Easypanel instance via the UI
3. Deploy Bytebot using the template
4. Verify all services start correctly
5. Test basic functionality (create a task, view desktop)

### 6. Create a Pull Request

Once everything is working:

```bash
# Create a new branch
git checkout -b add-bytebot-template

# Stage your changes
git add templates/bytebot

# Commit with a clear message
git commit -m "Add Bytebot AI Desktop Agent template"

# Push to your fork
git push origin add-bytebot-template
```

Then:
1. Go to your fork on GitHub
2. Click "Pull Request"
3. Fill out the PR template with:
   - Description of Bytebot
   - What the template includes (4 services)
   - Any special requirements (privileged mode, shm_size)
   - Links to documentation

### 7. PR Description Template

Use this template for your pull request:

```markdown
## New Template: Bytebot AI Desktop Agent

### Description
Bytebot is an open-source AI Desktop Agent that gives AI its own computer to complete tasks autonomously. This template deploys a complete stack with virtual desktop environment, AI agent, web UI, and database.

### Services Included
- **bytebot-ui**: Web interface for task management (port 9992)
- **bytebot-agent**: Task orchestration with AI coordination (port 9991)
- **bytebot-desktop**: Virtual Ubuntu desktop with XFCE (port 9990)
- **postgres**: PostgreSQL database for persistence

### Features
- Natural language task creation
- Live desktop streaming
- File upload support
- Multiple AI provider support (Anthropic, OpenAI, Google)
- REST API for programmatic control
- Persistent desktop environment

### Special Requirements
- Desktop service requires `privileged: true` for proper X11 operation
- Desktop service requires `shm_size: 2g` for browser performance

### Testing
- [x] Template builds without errors
- [x] Code is formatted with prettier
- [x] All images use official tags
- [x] Environment variables are properly configured
- [x] Documentation is complete and accurate
- [x] Logo is square format
- [x] Screenshot shows app in action

### Links
- Website: https://bytebot.ai
- Documentation: https://docs.bytebot.ai
- GitHub: https://github.com/bytebot-ai/bytebot
- Discord: https://discord.com/invite/d9ewZkWPTP

### Notes
The template uses pre-built Docker images from GitHub Container Registry (ghcr.io/bytebot-ai). Users need at least one AI provider API key (Anthropic, OpenAI, or Google) to use the agent.
```

## Review Process

After submitting your PR:

1. **Automated Checks**: GitHub Actions will run checks on your PR
2. **Code Review**: Easypanel maintainers will review the template
3. **Feedback**: Address any feedback or requested changes
4. **Approval**: Once approved, your PR will be merged

## Post-Merge

After your template is merged:

1. It will appear in the Easypanel templates marketplace
2. Users can deploy Bytebot with one click
3. Monitor the template repository for any issues or updates
4. Update the template if new Bytebot versions require configuration changes

## Template Maintenance

As a template contributor, you may need to:

- Update Docker image versions when new releases are available
- Fix bugs in the template configuration
- Update documentation to reflect changes
- Respond to issues related to the template

## Getting Help

If you need help with the submission:

- **Easypanel Discord**: Join their community for template development questions
- **GitHub Issues**: Open an issue in the templates repository for specific problems
- **Bytebot Discord**: Get help from the Bytebot community

## Checklist Before Submission

- [ ] Template files copied to correct location
- [ ] meta.yaml is complete with all required fields
- [ ] index.ts generates services correctly
- [ ] Logo is square format (PNG or SVG)
- [ ] Screenshot shows app in action (not empty state)
- [ ] Template builds without errors (`npm run build`)
- [ ] Code is formatted (`npm run prettier`)
- [ ] All Docker images use specific version tags or stable tags like `edge`
- [ ] Environment variables are documented
- [ ] Special requirements are noted (privileged, shm_size)
- [ ] Links to documentation are included
- [ ] PR description is complete and clear

## Common Issues and Solutions

### Build Errors

**Issue**: TypeScript errors in index.ts
- **Solution**: Ensure you're using the correct types from `~templates-utils` and `./meta`

**Issue**: YAML parsing errors
- **Solution**: Validate YAML syntax, check indentation (2 spaces)

### Schema Validation

**Issue**: Invalid JSON Schema
- **Solution**: Use JSON Schema Draft 7, validate at https://www.jsonschemavalidator.net/

### Image Issues

**Issue**: Logo not displaying
- **Solution**: Ensure logo.png is square format, reasonable file size (<1MB)

**Issue**: Screenshot too large
- **Solution**: Compress screenshot, aim for <500KB

## Resources

- [Easypanel Templates Documentation](https://deepwiki.com/easypanel-io/templates)
- [Easypanel Template Examples](https://github.com/easypanel-io/templates/tree/main/templates)
- [JSON Schema Guide](https://json-schema.org/learn/getting-started-step-by-step)
- [TypeScript Template Utils Reference](https://github.com/easypanel-io/templates/blob/main/packages/templates-utils/src/index.ts)

## Questions?

Feel free to reach out to the Bytebot team or Easypanel community if you have questions about this submission process.
