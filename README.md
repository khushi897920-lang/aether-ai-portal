# Aether AI Enterprise Portal

An executive-grade, full-stack enterprise employee management platform designed with high-security route guards, robust cryptographic identity controls, and transaction-safe database pipelines.

---

## 1. Executive Overview

The **Aether AI Enterprise Portal** is a decoupled full-stack application built to manage corporate organization records securely. The architecture separates the interactive client layer from the transactional data layer to ensure isolated security boundaries, low-latency rendering, and high accessibility.

```
                  ┌──────────────────────────────┐
                  │      Interactive Client      │
                  │  Vite + React 19 + Three.js  │
                  └──────────────┬───────────────┘
                                 │
                     HTTPS / JSON API Requests
                     (Guarded by Auth Headers)
                                 │
                                 ▼
                  ┌──────────────────────────────┐
                  │      RESTful API Engine      │
                  │       Node.js + Express      │
                  └──────────────┬───────────────┘
                                 │
                        Mongoose connection
                        (SSL Encrypted)
                                 │
                                 ▼
                  ┌──────────────────────────────┐
                  │     Secure Storage Node      │
                  │      MongoDB Atlas Cloud     │
                  └──────────────────────────────┘
```

During **Task 2** and **Task 3**, the system's foundational components were completed, verified, and hardened:
- **Client Workspace**: Upgraded with a professional geometric layout utilizing Outfit and Inter typeface scales, an interactive user profile state widget, real-time notification feeds, custom split-vector SVG branding nodes, and error boundary wrappers.
- **Server Engine**: Configured with a modular Node.js ES Module architecture featuring Mongoose schema hooks, JWT middleware validators, and atomic CRUD controllers.
- **Full-Stack Integration**: Dismantled local mock states and established a live network data pipeline linking the client to the server on port `5000` and persisting all transactions in MongoDB Atlas.

---

## 2. Tech Stack Matrix

| Layer | Technology | Version / Spec | Purpose & Implementation Details |
| :--- | :--- | :--- | :--- |
| **Frontend Client** | React | `^19.0.0` | Declarative UI rendering, component encapsulation, and state orchestration. |
| **Styling Engine** | Tailwind CSS | `v4.0` | Atomic layout composition and responsive design configurations. |
| **Visual Canvas** | Three.js | Canvas | Particle background vectors and interactive structural geometry. |
| **Routing / State** | React Router | `^6.22.0` | Client-side routing, protected viewport switches, and navigation guardrails. |
| **Web Server** | Node.js | `^20.0.0` | Cross-platform runtime executing the main Express server instance. |
| **API Framework** | Express | `^4.19.0` | Light HTTP router handling authentication streams and employee API routes. |
| **ODM Gateway** | Mongoose | `^8.2.0` | Object Document Mapper defining structural schemas and validating database input. |
| **Database Cluster** | MongoDB Atlas | Cloud | Distributed, high-availability document database engine with SSL security. |

---

## 3. Cryptographic Blueprint

To protect system credentials and secure the structural employee ledger routing layers, the platform implements a dual-layer cryptographic framework:

### A. Credential Protection (BcryptJS Salt Operations)
All administrator passwords are encrypted before they hit the database. 
- **Trigger**: The encryption lifecycle is managed in the Mongoose User Model schema ([User.js](file:///d:/Projects/WeIntern/week2-task2/aether-ai-portal/backend/models/User.js)) via a pre-save hook (`UserSchema.pre('save', ...)`).
- **Security Strength**: Passwords undergo a hashing routine using `bcryptjs` with a cost factor of `10` salt rounds. Raw passwords are never written to standard logs or stored in plaintext.
- **Verification**: User authentication employs the asynchronous model instance method `.matchPassword(enteredPassword)` which compares input strings with the stored cryptographic hash safely.

### B. Session Security (30-Day JWT Headers)
Session state is stateless, utilizing cryptographically signed JSON Web Tokens (JWT).
- **Token Signature**: Upon successful registration or login, the auth router ([authRoutes.js](file:///d:/Projects/WeIntern/week2-task2/aether-ai-portal/backend/routes/authRoutes.js)) generates a JWT payload signed with the global `JWT_SECRET` key via HMAC-SHA256.
- **Expiration Limit**: Tokens are configured with a strict expiration boundary of `30d` (30 days) to balance user experience and security.
- **Route Authorization**: Protected endpoints are wrapped by the auth middleware ([authMiddleware.js](file:///d:/Projects/WeIntern/week2-task2/aether-ai-portal/backend/middleware/authMiddleware.js)). The middleware intercepts the request, extracts the `Authorization: Bearer <JWT_TOKEN>` header, decodes the signature, and mounts the authenticated user record to the request context.

---

## 4. Quick-Start Blueprint

To run the Aether AI Enterprise Portal locally, follow these direct steps.

### A. Environment Configuration
First, initialize the backend configuration. Copy the environment template:
```bash
cp backend/.env.example backend/.env
```
Open `backend/.env` and update the connection values (see Section 6 below).

### B. Dependency Installation
Install dependencies for both the frontend and backend workspaces:
```bash
# Install root/backend requirements
cd backend
npm install

# Install frontend requirements
cd ../frontend
npm install
```

### C. Booting the Application
You can run the frontend and backend servers simultaneously. Open two terminal instances or run them concurrently:

#### Terminal 1: Launch Backend API Server
```bash
cd backend
npm start
```
*Expected console output:*
> 📡 Server actively listening on port 5000 in development mode  
> 🛸 Database Connected: Aether Atlas Core Active

#### Terminal 2: Launch Frontend Client
```bash
cd frontend
npm run dev
```
*Expected console output:*
>  VITE v6.x.x  ready in X ms  
>  ➜  Local:   http://localhost:5173/

---

## 5. API Reference Spec

All network exchanges carry JSON request bodies and responses. Authentication endpoints are public, while Employee endpoints require the token header.

| HTTP Method | Route Endpoint | Required Header | Request Body Schema | Success Status | Fail Status (Typical) | Response Body Spec |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **POST** | `/api/auth/register` | None | `{ "name": "...", "email": "...", "password": "..." }` | **211** | `400` / `500` | Created user details & signed JWT token |
| **POST** | `/api/auth/login` | None | `{ "email": "...", "password": "..." }` | **200** | **401** / `500` | Authenticated user details & signed JWT token |
| **GET** | `/api/health` | None | None | **200** | `500` | Server status logs, operational metrics, timestamp |
| **GET** | `/api/employees` | `Authorization: Bearer <JWT>` | None | **200** | **401** / `500` | List of all employee ledger documents |
| **POST** | `/api/employees` | `Authorization: Bearer <JWT>` | `{ "name": "...", "email": "...", "department": "...", "role": "...", "salary": 120000, "joinDate": "YYYY-MM-DD" }` | **201** | `400` / **401** / `500` | Created employee document details |
| **PUT** | `/api/employees/:id` | `Authorization: Bearer <JWT>` | `{ "department": "...", "salary": 140000 }` (partial fields allowed) | **200** | **401** / `404` / `500` | Updated employee document details |
| **DELETE** | `/api/employees/:id` | `Authorization: Bearer <JWT>` | None | **200** | **401** / `404` / `500` | Confirmation message of successful deletion |

---

## 6. Environment Isolation Guard

> [!WARNING]
> Security is a fundamental design principle of the portal. Real live MongoDB connection URIs, credentials, and cryptographic keys must never be exposed or checked into Git version control.

Developers must use the env template file [.env.example](file:///d:/Projects/WeIntern/week2-task2/aether-ai-portal/backend/.env.example) to configure environment settings locally. 

### Secrets Template Overview
```ini
PORT=5000
MONGO_URI=mongodb+srv://<db_username>:<db_password>@cluster0.mongodb.net/aether_ai_db?retryWrites=true&w=majority
JWT_SECRET=your_cryptographically_strong_jwt_secret_key_here
```

### Local Variable Setup
1. Define `MONGO_URI` using your isolated MongoDB Atlas Cluster credentials.
2. Generate a high-entropy string for `JWT_SECRET` (e.g., a 256-bit cryptographically random hex string).
3. Confirm that `backend/.env` is successfully ignored by the repository's `.gitignore` rules before committing any files.

For cloud deployment settings, reference the production-ready [DEPLOYMENT.md](file:///d:/Projects/WeIntern/week2-task2/aether-ai-portal/backend/DEPLOYMENT.md) checklist.
