# 🔔 Notification System (RabbitMQ + Firebase + Redis)

A scalable, real-time push notification system using:

* **Node.js + Express (API)**
* **RabbitMQ (Queue / Async Processing)**
* **Redis (Token Storage)**
* **Firebase Cloud Messaging (FCM) (Delivery)**
* **Service Worker (Background Notifications)**

---

# 🚀 Why This System?

Modern apps (Uber, LinkedIn, Swiggy) need:

* Real-time notifications
* Background delivery
* Scalable processing

👉 This system solves that using **queue-based architecture**

---

# 🧠 Architecture Overview

```
Frontend (Browser)
    ↓
Get FCM Token
    ↓
Send Token → Backend
    ↓
Store in Redis

----------------------------

POST /notify
    ↓
Producer (Backend)
    ↓
RabbitMQ Exchange
    ↓
Queue
    ↓
Worker (Consumer)
    ↓
Fetch Tokens (Redis)
    ↓
Firebase (FCM)
    ↓
Service Worker
    ↓
🔔 Notification
```

---

# ⚙️ Tech Stack (What & Why)

| Tech           | Why Used                     |
| -------------- | ---------------------------- |
| Node.js        | Backend API                  |
| Express        | Routing                      |
| RabbitMQ       | Async processing, decoupling |
| Redis          | Fast token lookup            |
| Firebase FCM   | Push delivery                |
| Service Worker | Background notifications     |

---

# 📱 What is FCM Token?

👉 A **unique identifier for each device/browser**

Example:

```
Device 1 → tokenA
Device 2 → tokenB
```

✔ One device = one token
✔ Same user = multiple tokens (multi-device)

---

# 🧠 Why Store Token?

We store tokens to:

* Send notifications later
* Target specific users
* Support multiple devices

---

# 🗄️ Storage Strategy

### Redis (Fast Access)

```
user:123 → [token1, token2]
```

### Optional DB (Production)

```
User Table
---------
userId | token
```

---

# 🐰 RabbitMQ Flow

## Producer (Backend API)

```js
channel.publish("notification_exchange", "notify", message);
```

## Consumer (Worker)

```js
channel.consume(queue, (msg) => {
  // process notification
});
```

---

# 🔁 Why RabbitMQ?

Without queue:

❌ Direct API → Firebase (not scalable)

With queue:

✔ Retry support
✔ Async processing
✔ Decoupled system

---

# 🔔 Notification Flow (Step-by-Step)

1. User opens frontend
2. Service Worker registers
3. FCM token generated
4. Token sent to backend
5. Stored in Redis

---

### When notification triggered:

1. API called (`/notify`)
2. Message sent to RabbitMQ
3. Worker consumes message
4. Worker fetches tokens from Redis
5. Firebase sends notification
6. Service Worker shows notification

---

# 🔐 Security (IMPORTANT)

## ❌ Problem

Keys exposed in frontend:

```js
apiKey: "XXXX"
```

---

## ✅ Solution

### 1. Frontend (.env not possible in plain JS)

👉 Use build tools (Vite / React)

Example:

```
VITE_FIREBASE_API_KEY=XXXX
```

---

### 2. Backend (IMPORTANT)

Create `.env`

```
REDIS_URL=redis://localhost:6379
RABBITMQ_URL=amqp://localhost
PORT=3000
```

Use:

```ts
import dotenv from "dotenv";
dotenv.config();
```

---

### 3. Firebase Admin (Worker)

👉 Keep `serviceAccount.json` SECRET

```
❌ DO NOT PUSH TO GITHUB
```

Add to `.gitignore`:

```
serviceAccount.json
.env
node_modules
```

---

# 🐳 Docker Setup

```yaml
services:
  redis:
    image: redis:7
    ports:
      - "6379:6379"

  rabbitmq:
    image: rabbitmq:3-management
    ports:
      - "5672:5672"
      - "15672:15672"
```

---

# ▶️ How to Run

## 1. Start Infra

```
docker compose up -d
```

---

## 2. Start Backend

```
cd backend
npm install
npm run dev
```

---

## 3. Start Worker

```
cd worker
npm install
npm run dev
```

---

## 4. Run Frontend

```
Open index.html (Live Server)
```

---

# 🧪 Test API

## POST /notify

```json
{
  "userId": "user123",
  "title": "Hello 🚀",
  "body": "Notification working!"
}
```

---

# 🔍 Debug Checklist

| Step            | Check              |
| --------------- | ------------------ |
| Token generated | Console            |
| Redis stored    | `SMEMBERS user:id` |
| RabbitMQ UI     | localhost:15672    |
| Worker logs     | console            |
| Notification    | browser            |

---

# 📊 System Design Insight

👉 This system is:

* Event-driven
* Asynchronous
* Scalable

---

# 💯 Key Learnings

* HTTP cannot push → Firebase needed
* Queue decouples system
* Token = device identity
* Redis = fast lookup
* Worker = background processor

---

# 🚀 Future Improvements

* Retry queue
* Dead letter queue
* Notification history (DB)
* Scheduling (cron + queue)
* User preferences

---

# 🎯 Final One Line

> “Send notification → queue it → process it → deliver via Firebase → show via Service Worker”

---

# 👨‍💻 Author

Suraj Khonde 🚀
