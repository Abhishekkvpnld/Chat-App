# Chat App (MERN + Socket.io)

## 📌 Project Overview

A real-time chat application built with the **MERN Stack (MongoDB, Express.js, React.js, Node.js)** and **Socket.io**. It supports instant messaging, online status indicators, and real-time updates for a seamless chatting experience.

## ✨ Features

* Real-time messaging with Socket.io
* User authentication (JWT-based)
* Online/offline status indicators
* Group chat support
* Message history saved in MongoDB
* Responsive UI with Material UI / Tailwind CSS
* Typing indicators

## 🛠️ Tech Stack

* **Frontend:** React.js, Tailwind CSS / Material UI
* **Backend:** Node.js, Express.js, Socket.io
* **Database:** MongoDB (Mongoose)
* **Authentication:** JWT (JSON Web Token)
* **Deployment:** Vercel (Frontend), Render / Heroku (Backend)

## 🚀 Getting Started

### Prerequisites:

* Node.js installed
* MongoDB connection URI

### Installation:

```bash
# Clone the repository
git clone https://github.com/your-username/chat-app-mern.git

# Navigate to the project folder
cd chat-app-mern

# Install dependencies for frontend and backend
cd client && npm install
cd ../server && npm install
```

### Environment Variables:

Create a `.env` file in the `server` directory and add:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

### Running the Application:

```bash
# Run backend
cd server
npm run dev

# Run frontend
cd ../client
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## 📡 Real-time Messaging

* Messages are transmitted instantly using **Socket.io**.
* Users receive real-time updates when new messages are sent or users come online/offline.

## ✍️ API Endpoints:

| Method | Endpoint            | Description                 |
| ------ | ------------------- | --------------------------- |
| POST   | `/api/register`     | Register a new user         |
| POST   | `/api/login`        | User login                  |
| GET    | `/api/users`        | Get all users               |
| POST   | `/api/messages`     | Send a new message          |
| GET    | `/api/messages/:id` | Get all messages for a chat |

## 📝 Future Enhancements:

* Message read receipts
* Voice and video calling
* File sharing capabilities
* Push notifications

## 🤝 Contributing

Feel free to submit a pull request. For major changes, please open an issue first to discuss what you would like to change.

