# Git Hooks Setup Guide: Husky & Commitlint

This guide provides a detailed walkthrough of how to implement **Husky**, **Commitlint**, and **Lint-staged** in a Next.js project to ensure code quality and consistent commit messages.

## 🚀 Overview

Git hooks are scripts that Git executes before or after events such as `commit`, `push`, and `receive`. We use these tools to automate our workflow:

- **Husky**: Makes it easy to manage and run Git hooks.
- **Commitlint**: Ensures commit messages follow a consistent format (Conventional Commits).
- **Lint-staged**: Runs linters (ESLint, Prettier) only on files that are staged for commit.

---

## 📦 1. Installation

Install the necessary development dependencies:

```bash
npm install --save-dev husky lint-staged @commitlint/cli @commitlint/config-conventional
```

---

## ⚙️ 2. Configuration

### A. package.json

Add the `prepare` script to enable Husky automatically after installation, and configure `lint-staged` to run your linters.

```json
{
  "scripts": {
    "prepare": "husky",
    "lint": "eslint .",
    "lint:fix": "eslint . --fix",
    "format": "prettier --write \"**/*.{ts,tsx,css,json,md}\"",
    "type-check": "tsc --noEmit"
  },
  "lint-staged": {
    "**/*.{ts,tsx}": ["eslint --fix", "prettier --write"],
    "**/*.{css,json,md}": ["prettier --write"]
  }
}
```

### B. commitlint.config.cjs

Create a `commitlint.config.cjs` file in your root directory to define commit message rules.

```javascript
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // Type must be one of the following
    'type-enum': [
      2,
      'always',
      [
        'feat', // New feature
        'fix', // Bug fix
        'docs', // Documentation only
        'style', // Code style (formatting, semicolons, etc)
        'refactor', // Code refactoring
        'perf', // Performance improvement
        'test', // Adding or updating tests
        'build', // Build system or dependencies
        'ci', // CI/CD configuration
        'chore', // Other changes (maintenance)
        'revert', // Revert a previous commit
      ],
    ],
    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never'],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'subject-max-length': [2, 'always', 72],
    'header-max-length': [2, 'always', 100],
  },
};
```

---

## 🐕 3. Husky Hooks Setup

Initialize Husky:

```bash
npx husky init
```

This will create a `.husky/` directory. You need to create/modify the following hooks:

### 1. Pre-commit Hook (`.husky/pre-commit`)

Runs `lint-staged` and type checking before every commit.

```bash
#!/usr/bin/env sh

# Run lint-staged
npx lint-staged

# Run type check on staged files
npm run type-check
```

### 2. Commit Message Hook (`.husky/commit-msg`)

Validates the commit message using `commitlint`.

```bash
#!/usr/bin/env sh

npx --no -- commitlint --edit "$1"
```

---

## 🔄 4. The Workflow

1.  **Stage Files**: `git add .`
2.  **Commit**: `git commit -m "feat: add amazing new feature"`
3.  **Automatic Execution**:
    - **`pre-commit`**: Runs ESLint, Prettier, and TypeScript checks. If any fail, the commit is aborted.
    - **`commit-msg`**: Checks if the message follows the convention (e.g., `feat: foo`, `fix: bar`). If invalid, the commit is aborted.

## 🛠 Troubleshooting

- **Hooks not running?** Ensure you've run `npm install` (which triggers `npm run prepare`) and that the files in `.husky/` are executable.
- **Bypassing hooks**: If absolutely necessary, you can use `git commit -m "..." --no-verify` (though this is discouraged).

---

_Created as a reference for StoryChain Frontend development._
