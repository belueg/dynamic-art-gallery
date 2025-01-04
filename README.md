# Dynamic Art Gallery

This project is a dynamic art gallery application built with Vue 3, Vite, and Socket.IO. It allows users to add, update, and annotate images on a shared canvas in real-time.

## Features

- Real-time updates using Socket.IO
- Drag-and-drop functionality for images and annotations
- Color theme customization
- Text annotations with inline editing

## Project Structure

- [`client/`](client/): Contains the frontend code
  - [`src/`](client/src/): Source code for the Vue application
    - [`components/`](client/src/components/): Vue components
    - [`composables/`](client/src/composables/): Reusable Vue composition functions
    - [`router/`](client/src/router/): Vue Router configuration
    - [`assets/`](client/src/assets/): Static assets and styles
    - [`views/`](client/src/views/): Vue views
    - [`types/`](client/src/types/): TypeScript type definitions
  - [`public/`](client/public/): Static files served by the frontend
  - [`index.html`](client/index.html): Entry point for the Vue application
  - [`package.json`](client/package.json): Dependencies and scripts for the frontend
  - [`tsconfig.json`](client/tsconfig.json): TypeScript configuration for the frontend
  - [`vite.config.ts`](client/vite.config.ts): Vite configuration for the frontend
- [`server/`](server/): Contains the backend code
  - [`index.js`](server/index.js): Entry point for the Express server
  - [`socketHandlers.js`](server/socketHandlers.js): Socket.IO event handlers
  - [`package.json`](server/package.json): Dependencies and scripts for the backend

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/art-gallery.git
   cd art-gallery
   ```
2. Install dependencies for both client and server:
   ```sh
   cd client && npm install
   cd ../server && npm install
   ```

## Running the Application

### Start the backend server:
```sh
cd server
npm start
```

### Start the frontend development server:
```sh
cd client
npm run dev
```

Open your browser and navigate to [http://localhost:5173](http://localhost:5173) to see the application in action.

## Scripts

### Client

- `npm run dev`: Start the development server
- `npm run build`: Build the application for production

### Server

- `npm start`: Start the Express server

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the ISC License.
