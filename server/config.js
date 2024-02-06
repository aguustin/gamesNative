import dotenv from "dotenv";

dotenv.config();

export const mongoose_uri = process.env.MONGOOSE_URI;
export const port = process.env.port;