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

```
feat: add new feature
fix: resolve bug
docs: update documentation
style: format code
refactor: restructure code
test: add tests
chore: update dependencies
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
