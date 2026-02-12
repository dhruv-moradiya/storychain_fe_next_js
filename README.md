This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

Refactor the file components/stories/chapter-read/chapter-read-client.tsx to make it more modular, scalable, and future-proof using Next.js App Router best practices. You are an expert in Next.js, React Server Components, Client Components, and TypeScript. Identify which parts of the current implementation should remain client-side (interactive state, event handlers, editor interactions) and which can be safely moved to Server Components (data fetching, layout composition, static rendering). Split the file into well-named, reusable components with a clear folder structure, extract shared logic into hooks and utilities, improve type safety with explicit interfaces and inferred server/client boundaries, reduce unnecessary re-renders, and ensure clean separation of concerns. The final result should follow scalable architecture principles, be easy to extend for future features (comments, highlights, reactions, reading progress), and align with production-grade Next.js and TypeScript standards.

Inside "storychain-fe" is vite + react + typescript project and "storychain_fe_next_js" is next + react + typescript + app router project. inside next js project i want to make a home page same as vite project home page. and here i that it user same colors and same UI as vite project have but while doing this task you need to make sure that it's colors, fonts, font style, font weight same as original file only "font-mono" will replace by "font-ibm-plex-mono". and also make sure that the responsive design is same as original file. While doing this task you need to create a saparate file for each sections, you need to create a new folder inside components/home, here you need to create all the componesnts file and make sure it's naming convention follow current project architecture. and you are not allow to add "any" as type. if any component need props than you need to create interface at a top lavel of that file and use as like this "IHomeSectionProps". Here i am using tailwind V4 so there is not need to create tailwind.config.ts file. you can direcly use any class.
