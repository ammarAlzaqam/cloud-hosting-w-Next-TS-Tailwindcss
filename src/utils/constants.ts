export const ARTICLE_PER_PAGE = 6;

const API_PRODUCTION_DOMAIN = "https://cloud-hosting-five.vercel.app/api";
const API_DEVELOPMENT_DOMAIN = "http://localhost:3000/api";

export const API_DOMAIN =
  process.env.NODE_ENV === "production"
    ? API_PRODUCTION_DOMAIN
    : API_DEVELOPMENT_DOMAIN;
