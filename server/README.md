# Server

...

## Project Setup

- `npm init`

- `yarn add -D @types/node typescript`

- Create a start script on package.json file

```json

"scripts": {
    "start": "ts-node src/index.ts"
  },

```

- Add `ts-node` to your project `yarn add -D ts-node`

- Setup a configuration file for typescript. `npx tsconfig.json`

- Check everything worked `yarn start`

- Create a watch command

```json
  "scripts": {
    "watch": "tsc -w", // this line
    "start": "ts-node src/index.ts"
  },
```

- Setup `nodemon` with `yarn add -D nodemon`

```json

  "scripts": {
    "watch": "tsc -w",
    "dev": "nodemon dist/index.js", // here
    "start": "node dist/index.js",
    "start:ts": "ts-node src/index.ts"
  },
```

- Now finally to run the project setup you will have to do two things

  1. `yarn watch` in one terminal (will watch and compile the typescript changes)
  2. `yarn dev` in another terminal (will re execute the dis/index.js folder on every changes)

- You can create a migration after you've defined your model / entity `npx mikro-orm migration:create`

- to rollback a migration you can do
  1. `npx mikro-orm migration:down`

## Graphql and Node setup

- Install packages `yarn add express apollo-server-express graphql type-graphql`
- Install package `yarn add -D @types/express `
