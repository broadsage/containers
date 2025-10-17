# Contributing Guide

Thank you for considering contributing to Container Directory!

## 🚀 Getting Started

1. **Fork the repository**
2. **Clone your fork**
   ```bash
   git clone https://github.com/your-username/container-directory.git
   cd container-directory
   ```
3. **Install dependencies**
   ```bash
   yarn install
   cd apps/api && pip install -r requirements.txt
   ```
4. **Create a branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

## 📋 Development Workflow

### Code Style

We use ESLint and TypeScript for code quality:

```bash
# Lint all code
yarn lint

# Type check
yarn type-check
```

### Making Changes

1. Make your changes in a feature branch
2. Test your changes thoroughly
3. Ensure all lints pass
4. Write clear commit messages

### Commit Messages

Follow conventional commits:

### Commit Messages

We use [Conventional Commits](https://conventionalcommits.org/) for automated release management. Please follow this format:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

#### Types

- **feat**: A new feature (triggers minor release)
- **fix**: A bug fix (triggers patch release)
- **docs**: Documentation only changes (triggers patch release)
- **style**: Changes that do not affect the meaning of the code
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **perf**: A code change that improves performance (triggers patch release)
- **test**: Adding missing tests or correcting existing tests
- **build**: Changes that affect the build system or external dependencies (triggers patch release)
- **ci**: Changes to our CI configuration files and scripts (triggers patch release)
- **chore**: Other changes that don't modify src or test files

#### Breaking Changes

Add `BREAKING CHANGE:` in the footer or `!` after the type to trigger a major release:

```
feat!: remove deprecated API endpoint

BREAKING CHANGE: The /api/v1/old-endpoint has been removed. Use /api/v2/new-endpoint instead.
```

#### Examples

```
feat(web): add image vulnerability dashboard
fix(api): resolve memory leak in image processing
docs: update API documentation for new endpoints
refactor(core): optimize database queries
perf(web): improve page load times by 30%
ci: add semantic-release workflow
```

### Testing

```bash
# Run tests
yarn test

# Test specific app
cd apps/web && yarn test
```

## 📝 Pull Request Process

1. **Update documentation** if needed
2. **Ensure all checks pass**
3. **Write a clear PR description**
   - What changes were made?
   - Why were they made?
   - How to test?
4. **Link related issues**
5. **Request review**

## 🎯 Areas to Contribute

- **Features**: New functionality
- **Bug fixes**: Resolve issues
- **Documentation**: Improve docs
- **Performance**: Optimize code
- **Tests**: Add test coverage
- **UI/UX**: Enhance design

## 📁 Project Structure

```
apps/
├── web/          # Next.js frontend
└── api/          # FastAPI backend

packages/
├── ui/           # Shared components
├── typescript-config/
├── eslint-config/
└── tailwind-config/
```

## 🔧 Development Guidelines

### TypeScript

- Use strict mode
- Define proper types
- Avoid `any` type
- Use type inference when possible

### React

- Use functional components
- Use hooks for state management
- Keep components small and focused
- Extract reusable logic to hooks

### Styling

- Use Tailwind CSS utilities
- Follow existing design patterns
- Ensure responsive design
- Test across browsers

### API

- Follow REST conventions
- Validate input with Pydantic
- Handle errors properly
- Document endpoints

## 🐛 Reporting Bugs

Create an issue with:
- Clear title
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable
- Environment details

## 💡 Suggesting Features

Create an issue with:
- Clear description
- Use case/motivation
- Proposed solution
- Alternative solutions

## ❓ Questions

- Check existing documentation
- Search existing issues
- Create a new issue with the "question" label

## 📄 License

By contributing, you agree that your contributions will be licensed under the project's license.

Thank you for contributing! 🎉
