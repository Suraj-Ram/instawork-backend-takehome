import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import { PrismaClient } from ".prisma/client";

const prisma = new PrismaClient();
const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
