# WebSocket Chat Application

A real-time chat application built with React and Node.js using WebSocket technology for instant messaging.

## 🚀 Features

- **Real-time messaging** - Instant message delivery using WebSocket connections
- **Room-based chat** - Join different chat rooms with multiple users
- **User management** - Track users in each room with live updates
- **Emoji support** - Built-in emoji picker for expressive messaging
- **Responsive design** - Modern UI with custom components and styling
- **Message types** - Different styling for own messages, others, and bot notifications

## 🏗️ Architecture

### Backend (`/backend`)
- **Express.js** server with Socket.IO for WebSocket connections
- **Modular structure** with separated handlers, services, and utilities
- **In-memory user management** for active chat sessions
- **CORS enabled** for cross-origin requests

### Frontend (`/frontend`)
- **React 19** with TypeScript for type safety
- **React Router** for navigation between pages
- **Less** with CSS modules for styling
- **Socket.IO Client** for real-time communication

## 🛠️ Tech Stack

### Backend Technologies
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Socket.IO** - WebSocket library for real-time communication
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

### Frontend Technologies
- **React 19** - UI library
- **TypeScript** - Type-safe JavaScript
- **Socket.IO Client** - WebSocket client
- **React Router DOM** - Client-side routing
- **Less** - CSS preprocessor
- **Emoji Picker React** - Emoji selection component
- **React Icons** - Icon library
- **Vite** - Build tool and dev server

## 📁 Project Structure

```
websocket-chat-app/
├── backend/
│   ├── config/          # Configuration files
│   ├── constants/        # Application constants
│   ├── database/         # User management logic
│   ├── routes/          # Express routes
│   ├── socket/          # WebSocket handlers
│   │   ├── handlers/    # Event handlers
│   │   ├── events.js    # Socket event constants
│   │   └── socketManager.js
│   ├── utils/           # Utility functions
│   └── index.js         # Main server file
└── frontend/
    ├── src/
    │   ├── components/  # Reusable UI components
    │   ├── pages/       # Application pages
    │   ├── styles/      # Global styles and variables
    │   ├── types/       # TypeScript type definitions
    │   └── constants/   # Frontend constants
    └── public/          # Static assets
```

### Real-time Communication
- Uses WebSocket connections for instant message delivery
- No page refresh needed for new messages
- Live user count updates in each room

### Message Types
- **Own messages** - Light purple background, dark text
- **Other users** - Dark background, light text  
- **Bot messages** - Blue background, white text (for join/leave notifications)

### Room System
- Multiple users can join the same room
- Users are tracked per room
- Automatic notifications when users join or leave

