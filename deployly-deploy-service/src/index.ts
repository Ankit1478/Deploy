import { createClient, commandOptions } from "redis";
import { copyFinalDist, downloadS3Folder } from "./cloudflareDownload";
import { buildProject } from "./runbuild";
import  dotenv  from "dotenv";

dotenv.config();

const subscriber = createClient({
    password: process.env.SUBSCRIBER_REDIS_PASSWORD,
    socket: {
        host: process.env.SUBSCRIBER_REDIS_HOST,
        port: process.env.SUBSCRIBER_REDIS_PORT as unknown as number
    }
});


const publisher = createClient({
    password: process.env.PUBLISHER_REDIS_PASSWORD,
    socket: {
        host: process.env.PUBLISHER_REDIS_HOST,
        port: process.env.PUBLISHER_REDIS_PORT as unknown as number
    }
});


async function main() {
 await publisher.connect();
 await subscriber.connect();
  while (1) {
    const response = await subscriber.brPop(
      commandOptions({ isolated: true }),
      "build-queue",
      0
    );
    console.log(response);
    // @ts-ignore
    const id = response.element;
    await downloadS3Folder(`/output/${id}`);
    await buildProject(id);
    copyFinalDist(id);
    publisher.hSet("status", id, "deployed");
  }
}

main();
