<h1 align="center">
  Gyul! Hap! Match 3
</h1>

Gyul! Hap! is based on a game from the Korean Show [The Genius](https://en.wikipedia.org/wiki/The_Genius_(TV_series)).

A Gyul! Hap! puzzle consists of a grid of nine tiles, where each tile is defined by a shape color, shape, and background color. A "Hap" is a set of three tiles where each property (shape color, shape, background color) is either all the same or all different between the three tiles. For example, a red triangle on a blue background, a blue triangle on a blue background, and a yellow triangle on a blue background form a "Hap" because the shape colors are all different, and the shapes and background colors are all the same. A correct "Hap" earns 1 point, and an incorrect "Hap" loses 1 point. Points cannot decrease below 0.

A "Gyul" can be called when all matches have been found (or in a rare instance, there were no matches initially), ending the game. A correct "Gyul" earns 3 points, and an incorrect "Gyul" loses 2 points.

## Tech

- Vue.js
- Tailwind CSS
- Headless UI
- ESLint
- Prettier
- Husky
- Lint-Staged
- Vitest
- Cypress
- Vite

## Installation and Setup

1. Clone the project
```
git clone https://github.com/macho-catt/gyul-hap.git
```

2. Install dependencies
```
npm install
```

3. Run locally
```
npm run dev
```

## Todo

- [ ] Add scoring system
- [ ] Add help screen modal
- [ ] Homepage to select play, help screen, or 1v1 (future feature)
- [ ] Animations
- [ ] Host somewhere
- [ ] Finish unit testing
- [ ] Add e2e testing with cypress
- [ ] Automatic testing on push/pull with Github Actions
- [ ] Backend
    - [ ] Login for additional features like (see below)
    - [ ] Personal best
    - [ ] Match history
    - [ ] Global high score
- [ ] 1v1 functionality using web sockets
- [ ] Finish Readme
