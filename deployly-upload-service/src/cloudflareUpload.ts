import { S3 } from "aws-sdk";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

const s3 = new S3({
  accessKeyId: process.env.accessKeyId,
  secretAccessKey: process.env.secretAccessKey,
  endpoint: process.env.endpoint,
});

export const uploadFile = async (fileKey: string, localFilePath: string) => {
  try {
    const fileContent = fs.readFileSync(localFilePath);
    const response = await s3
      .upload({
        Body: fileContent,
        Bucket: "deployly",
        Key: fileKey,
      })
      .promise();
    console.log(`Uploaded: ${fileKey}`);
    return response;
  } catch (error) {
    console.error(`Failed to upload ${fileKey}:`, error);
    throw error;
  }
};
