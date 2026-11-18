# Contributing to 3D Social Media Game

Thank you for your interest in contributing! This document provides guidelines and instructions for contributing to this project.

## Getting Started

1. Fork the repository
2. Clone your fork locally
3. Create a new branch for your feature or fix

```bash
git clone https://github.com/YOUR_USERNAME/3d-social-media-game.git
cd 3d-social-media-game
git checkout -b feature/your-feature-name
```

## Development Setup

### Quick Start
```bash
npm install
npm start
```

Then open `http://localhost:8000` in your browser.

### File Structure

- `index.html` - Main entry point
- `src/` - Source code organized by feature
  - `game/` - Core game logic
  - `world/` - World and map generation
  - `player/` - Player and profile management
  - `social/` - Social features
  - `ui/` - User interface components
- `assets/` - Game assets (sprites, sounds, etc.)
- `styles/` - CSS files

## Code Guidelines

- Use vanilla JavaScript (ES6+ where appropriate)
- Keep functions focused and single-purpose
- Add comments for complex logic
- Follow consistent naming conventions (camelCase for variables/functions, PascalCase for classes)
- Test your changes in modern browsers

## Working with Sprites

When adding new sprites to the game:

1. Ensure the sprite is freely licensed
2. Place sprites in `assets/sprites/`
3. Document the source and license in `SPRITE_CREDITS.md`
4. Use high-quality, appropriately sized assets

## Commits

Write clear commit messages that explain what changed and why:

```
Brief description of change (50 chars or less)

More detailed explanation if needed. Explain the problem
being solved and how your change solves it.
```

## Pull Requests

Before submitting a PR:

1. Test your changes thoroughly
2. Ensure the game still runs and plays correctly
3. Check that all features work as expected
4. Update documentation if needed
5. Reference any related issues

PR description should include:
- What problem does this solve?
- How was it tested?
- Screenshots/videos if applicable

## Reporting Issues

Found a bug? Please open an issue with:

- Clear description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Browser and OS information
- Screenshots if applicable

## Questions?

Feel free to open a discussion or issue to ask questions. We're here to help!

## License

By contributing, you agree that your contributions will be licensed under the project's MIT License.
