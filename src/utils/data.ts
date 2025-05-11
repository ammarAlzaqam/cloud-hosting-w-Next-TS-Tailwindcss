import { Article } from "@/app/articles/types";
export const articles: Article[] = [
  {
    id: 1,
    userId: 101,
    title: "Typescript",
    body: "Typescript is a superset of JavaScript that adds static typing to the language. It was developed by Microsoft and is designed to help developers write more robust and maintainable code. Typescript allows you to define types for variables, function parameters, and return values, which can help catch errors at compile time rather than runtime.",
  },
  {
    id: 2,
    userId: 102,
    title: "React",
    body: "React is a JavaScript library for building user interfaces. It was developed by Facebook and is used for building single-page applications. React allows developers to create reusable UI components and manage the state of their applications efficiently.",
  },
  {
    id: 3,
    userId: 103,
    title: "Next.js",
    body: "Next.js is a React framework that enables server-side rendering and static site generation. It was developed by Vercel and is designed to make it easy to build fast, SEO-friendly web applications. Next.js provides features like automatic code splitting, optimized performance, and a simple API for routing.",
  },
];