# CI/CD Pipeline Documentation

This project uses GitHub Actions to automate testing, building, and deployment. This document explains the workflows and how to use them.

## Continuous Integration (CI)

The CI workflow runs on every push to the `main` branch and on every pull request targeting `main`. It includes the following checks:

- **Linting**: Ensures code style consistency using ESLint
- **Type Checking**: Verifies TypeScript types are correct
- **Building**: Confirms the project can build successfully
- **Security Audit**: Checks for vulnerable dependencies (runs but doesn't fail the build)

### Configuration File
The CI workflow is defined in `.github/workflows/ci.yml`.

## Continuous Deployment (CD)

The CD workflow automatically deploys the application to Cloudflare Pages when pushes are made to the `main` branch. It performs the following steps:

1. Checks out the code
2. Sets up Node.js
3. Installs dependencies
4. Builds the project
5. Deploys to Cloudflare Pages

### Configuration File
The deployment workflow is defined in `.github/workflows/deploy.yml`.

### Required Secrets

To use the deployment workflow, you need to add the following secrets to your GitHub repository:

- `CLOUDFLARE_API_TOKEN`: An API token with Cloudflare Pages deployment permissions
- `CLOUDFLARE_ACCOUNT_ID`: Your Cloudflare account ID

#### How to Add Secrets

1. In your GitHub repository, go to Settings > Secrets and variables > Actions
2. Click "New repository secret"
3. Add each of the required secrets with their respective values

## Dependabot

This project uses Dependabot to automatically keep dependencies up to date. Dependabot will:

- Check for updates weekly
- Create pull requests for outdated dependencies
- Label these PRs with the "dependencies" label

### Configuration File
Dependabot is configured in `.github/dependabot.yml`.

## Manual Deployment

You can also trigger a deployment manually:

1. Go to the "Actions" tab in your GitHub repository
2. Select the "Deploy to Cloudflare Pages" workflow
3. Click "Run workflow"
4. Select the branch to deploy from
5. Click "Run workflow" 