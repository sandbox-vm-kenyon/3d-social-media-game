# 3D Social Media Game

A three.js 3D social media game where you walk around to visit profiles and discover objects, places, and people on a shared map.

## About the Game

Walk through a 3D world to:
- **Discover** objects and places on the map
- **Post** about interesting discoveries
- **Meet** other players and visit their profile areas
- **Connect** with people who share your interests

When you discover something interesting and post about it, other players with matching interests can find you on the map and add you as a friend!

## How to Play

1. Create or log in to your profile
2. Start walking through the 3D world
3. Explore to find objects, places, and other players
4. Post about discoveries that interest you
5. Visit other players' profile areas on the map
6. Send friend requests (they'll accept if you've posted about things they like!)

## Project Structure

```
├── index.html              # Main game entry point
├── src/
│   ├── game/              # Core game logic
│   ├── world/             # World and map generation
│   ├── player/            # Player and profile management
│   ├── social/            # Social features (posts, connections)
│   └── ui/                # User interface components
├── assets/
│   ├── sprites/           # 2D sprite assets
│   └── sounds/            # Audio assets
├── styles/                # CSS styling
└── lib/                   # Third-party libraries
```

## Tech Stack

- **three.js** - 3D graphics and scene management
- **Vanilla JavaScript** - Core game logic
- **WebGL** - 3D rendering

## Development

This project is built in stages, with each stage leaving something playable. See the [Releases](../../releases) for playable versions.

### Stage 1: Initial World
- Basic 3D world with player movement
- Sprite rendering in 3D space
- Simple UI

### Future Stages
- Player profiles and social features
- Post and discovery system
- Friend connections
- Enhanced world generation

## Sprites Attribution

This project uses freely licensed 2D sprites. Full attribution for all used sprites can be found in [SPRITE_CREDITS.md](SPRITE_CREDITS.md).

## License

[MIT License](LICENSE)

## Getting Started

1. Clone this repository
2. Open `index.html` in a modern web browser
3. Start exploring!

For development setup and contributing, see [CONTRIBUTING.md](CONTRIBUTING.md).
