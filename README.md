# Tic Tac Toe

### 1. Run Locally

Install dependencies:

```
npm install
```

Start the development server:

```
npm run dev
```

Or build and preview:

```
npm run build
npm run preview
```

### 2. Run with Docker

Build the Docker image:

```
docker build . -t tictactoe:v1.0
```

Run the container:

```
docker run -p 3000:3000 tictactoe:v1.0
```

### 3. Run with Docker Compose

Simply use the Compose file:

```
docker compose up -d
```

This will build and run the project in detached mode.
