# "Game Research and Development Club" website project

A website developed to be used within the club. This club is a part of Chulalongkorn University's Faculty of Engineering.

## Requirement

- [Node](https://nodejs.org/en/)
- [Yarn](https://classic.yarnpkg.com/en/docs/install)
- [Prisma CLI](https://www.prisma.io/docs/concepts/components/prisma-cli/installation#yarn-1192)

## Running

1. Clone this repository into your local machine
2. Open the terminal in the cloned repository dictionary
3. Run `yarn prisma-generate` to generate prisma schema, this need to be rerun everytime you chage prisma schema
4. Setup environment variable as show below, in development you can use Next.js's [`.env.local`](https://nextjs.org/docs/basic-features/environment-variables#loading-environment-variables) (Note: Do NOT commit `.env.local` or anything containing environment variable, environment variable may contain secret such as password)
5. Run `yarn dev` to Next.js's start development server

### Environment Varaible (Replace stuff in <>)

`GOOGLE_CLIENT_ID=`\<[Google signin oauth's client id](https://next-auth.js.org/providers/google)\>

`GOOGLE_CLIENT_SECRET=`\<[Google signin oauth's client secret](https://next-auth.js.org/providers/google)\>

`DATABASE_URL=`\<[MongoDB database url](https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/mongodb/connect-your-database-typescript-mongodb)\>

## General information

Developed using HTML, CSS and JavaScript as base components

- Front-end component
  - Next.js
- Back-end component
  - Next.js + TRPC
- Database
  - MongoDB Atlas

## Planned features / components

- Homepage
  - General information about the club
  - Latest news
- Hall of Game
  - Showcasing every projects made by the club members
- Interactable page
  - Question forms
  - Participating in ongoing project
  - etc.
- Contacts
  - Social media platforms (Facebook, Discord, etc.)

## License & Copyright

© Game Research and Development Club</br>
Licensed under the [GNU GPLv3 License](LICENSE).
