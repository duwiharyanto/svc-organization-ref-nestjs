import { DatabaseConfig } from "./database.config";

export const configuration = () => ({
  environtment: process.env.NODE_ENV,
  port: process.env.PORT,
  jwt: {
    secret: process.env.JTW_SECRET,
    expires: process.env.JTW_TTL
  },
  database: {
    ...DatabaseConfig()
  }
});