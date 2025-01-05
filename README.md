# Deployly

Deployly is a platform similar to Vercel and Netlify that allows users to deploy web applications by uploading a GitHub repository link. It provides deployed links for seamless access to applications. This project aims to simplify the deployment process with modern tools and a developer-friendly interface.

## Architecture
![image](https://github.com/user-attachments/assets/056b6d82-687c-48a6-aba4-893732b74537)
<img width="1451" alt="Screenshot 2025-01-05 at 9 05 43 AM" src="https://github.com/user-attachments/assets/c8bc6f4a-710c-40f9-beb3-9dbfd04c8bad" />


## Features

- **Simple Deployment:** Upload a GitHub repository link and receive a deployed URL.
- **Cloud Storage:** Uses R2 Cloudflare for efficient storage management.
- **Message Queues:** Implements Redis as a simple queuing system (SQS).
- **Modern Tech Stack:** Built with a focus on scalability and performance.

## Tech Stack

- **Frontend:** React (Vite), TypeScript, Tailwind CSS, Shadcn
- **Backend:** Node.js, TypeScript
- **Storage:** R2 Cloudflare
- **Queue Management:** Redis
- **Docker**

## Prerequisites

Before running the project, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 16 or later)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Redis](https://redis.io/)
- Cloudflare account for R2 integration
- [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/) (if running with Docker)
