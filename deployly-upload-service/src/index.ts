import express from "express";
import cors from "cors";
import simpleGit from "simple-git";
import path from "path";
import { generateId } from "./idGenerator";
import { getAllFiles } from "./file";
import { uploadFile } from "./cloudflareUpload";
import { createClient } from "redis";

const subscriber = createClient({
  password: process.env.SUBSCRIBER_REDIS_PASSWORD,
  socket: {
    host: process.env.SUBSCRIBER_REDIS_HOST,
    port: process.env.SUBSCRIBER_REDIS_PORT as unknown as number,
  },
});

const publisher = createClient({
  password: process.env.PUBLISHER_REDIS_PASSWORD,
  socket: {
    host: process.env.PUBLISHER_REDIS_HOST,
    port: process.env.PUBLISHER_REDIS_PORT as unknown as number,
  },
});

const app = express();
app.use(cors());
app.use(express.json());

app.post("/deploy", async (req, res) => {
  const repoUrl = req.body.repoUrl;
  const id = generateId();
  await simpleGit().clone(repoUrl, path.join(__dirname, `output/${id}`));

  const files = getAllFiles(path.join(__dirname, `output/${id}`));

  files.forEach(async (file) => {
    await uploadFile(file.slice(__dirname.length + 1), file);
  });

  await new Promise((resolve) => setTimeout(resolve, 5000));
  publisher.lPush("build-queue", id);

  publisher.hSet("status", id, "uploaded");

  res.json({
    id: id,
  });
});

app.get("/status", async (req, res) => {
  const id = req.query.id;
  const response = await subscriber.hGet("status", id as string);
  res.json({
    status: response,
  });
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
