# Deployly

Deployly is a platform similar to Vercel and Netlify that allows users to deploy web applications by uploading a GitHub repository link. It provides deployed links for seamless access to applications. This project aims to simplify the deployment process with modern tools and a developer-friendly interface.

## Architecture
![image](https://github.com/user-attachments/assets/056b6d82-687c-48a6-aba4-893732b74537)

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

## Getting Started Without Docker

1. **Clone the repository:**
   ```bash
   git clone https://github.com/aaryan182/deployly.git
   cd deployly
2. Install dependencies:
   ```bash
   npm install
3. Set up environment variables:
   Create a .env file in the root directory and add the required environment variables:
   ```bash
   # Cloudflare R2 Storage
    accessKeyId=your_key
    secretAccessKey=your_key
    endpoint=your_key

    # Redis configurations for Subscriber and Publisher
    SUBSCRIBER_REDIS_PASSWORD=your_key
    SUBSCRIBER_REDIS_HOST=your_key
    SUBSCRIBER_REDIS_PORT=your_key

    PUBLISHER_REDIS_PASSWORD=Your_key
    PUBLISHER_REDIS_HOST=your_key
    PUBLISHER_REDIS_PORT=your_key

4. Run the project:
   ```bash
   npm start

Access the platform: Open your browser and navigate to http://localhost:3000

## Running with Docker

Docker provides an efficient and consistent environment to run Deployly without the need for manual dependency installation.

## Steps

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/aaryan182/deployly.git
   cd deployly
  
2. Create the .env File: Add the necessary environment variables to a .env file in the root directory:
    ```bash
    # Cloudflare R2 Storage
    accessKeyId=your_key
    secretAccessKey=your_key
    endpoint=your_key

    # Redis configurations for Subscriber and Publisher
    SUBSCRIBER_REDIS_PASSWORD=your_key
    SUBSCRIBER_REDIS_HOST=your_key
    SUBSCRIBER_REDIS_PORT=your_key

    PUBLISHER_REDIS_PASSWORD=Your_key
    PUBLISHER_REDIS_HOST=your_key
    PUBLISHER_REDIS_PORT=your_key

 3. Build the Docker Images: Use the docker-compose.yml file (or Dockerfile if specified) to build the necessary containers:
    ```bash
    docker-compose build
    
 4. Run the Containers: Start the application with:
    ```bash
    docker-compose up
    
 5. Access the Application: Once the containers are running, visit the application in your browser at:
    ```bash
    http://localhost:3000
    
 6. Stop the Application: To stop the containers, press Ctrl+C or run:
    ```bash
    docker-compose down

License
This project is licensed under the MIT License.

Contact
For questions or feedback, feel free to reach out to the repository owner or open an issue.

Built with ❤️ by [AaryanBajaj](https://x.com/AaryanBajaj18)


   
