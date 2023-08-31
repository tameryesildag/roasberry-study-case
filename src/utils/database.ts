import { Sequelize } from "sequelize";

const dbUri = process.env["db-uri"] as string;
export const sequelize = new Sequelize(dbUri, {dialect: "postgres", logging: false});