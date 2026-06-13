```text
 █████╗ ███████╗████████╗██╗  ██╗███████╗██████╗      █████╗ ██╗
██╔══██╗██╔════╝╚══██╔══╝██║  ██║██╔════╝██╔══██╗    ██╔══██╗██║
███████║█████╗     ██║   ███████║█████╗  ██████╔╝    ███████║██║
██╔══██║██╔══╝     ██║   ██╔══██║██╔══╝  ██╔══██╗    ██╔══██║██║
██║  ██║███████╗   ██║   ██║  ██║███████╗██║  ██║    ██║  ██║██║
╚═╝  ╚═╝╚══════╝   ╚═╝   ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝    ╚═╝  ╚═╝╚═╝
```

*A Decoupled Full-Stack Enterprise Ledger & High-Security Access Gateway built for WeIntern Weeks 2 & 3*

[![React 19](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](#)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](#)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](#)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS_v4-38B2AC?style=for-the-badge&logo=tailwindcss&logoColor=white)](#)
[![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=jsonwebtokens&logoColor=white)](#)
[![Three.js](https://img.shields.io/badge/Three.js-000000?style=for-the-badge&logo=threedotjs&logoColor=white)](#)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](#)
[![Status: Active](https://img.shields.io/badge/Status-Active-brightgreen?style=for-the-badge)](#)

<br>━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</br>

## 📌 Table of Contents
- [🧭 Executive Overview](#-executive-overview)
- [🏗️ System Architecture](#️-system-architecture)
- [⚙️ Tech Stack Matrix](#️-tech-stack-matrix)
- [📸 Screenshots](#-screenshots)
- [🔐 Cryptographic Blueprint](#-cryptographic-blueprint)
- [📡 API Reference](#-api-reference)
- [🚀 Quick-Start](#-quick-start)
- [🔒 Environment Isolation](#-environment-isolation)
- [🤝 Contributing \& 📄 License](#-contributing---license)

<br>━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</br>

## 🧭 Executive Overview

The **Aether AI Enterprise Portal** is a high-availability, fully decoupled administrative control plane designed to securely manage organizational employee ledgers. Tailored specifically for **WeIntern Week 2 (Task 2)** and **Week 3 (Task 3)**, the portal implements defensive authorization filters, dynamic data visualization, and transaction-safe database gateways to resolve administrative bottlenecks in real-time.

| 🛡️ Cryptographic Shielding | 📊 Real-Time Operations Grid | ⚡ Decentralized Performance |
| :--- | :--- | :--- |
| Enforces strict pre-save Bcrypt password hashing hooks alongside stateless 30-day JWT headers to guard administrative routing channels. | Dynamically parses database payloads to render active staff counts, unique segment allocations, and timeline change streams. | Decouples the React client workspace from the Node.js API engine to maximize load speeds and assure visual resilience. |

<br>━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</br>

## 🏗️ System Architecture

Aether AI operates on a modern, decoupled client-server architecture. All data flows securely through encrypted SSL layers and is validated via Express route guards before accessing the cloud cluster.

```text
┌────────────────────────────────────────────────────────┐
│                    Interactive Client                  │
│       Vite + React 19 + Three.js + Tailwind CSS v4     │
└───────────────────────────┬────────────────────────────┘
                            │
              HTTPS / JSON API Data Exchange
            Guarded by JWT Bearer Auth Headers
                            │
                            ▼
┌────────────────────────────────────────────────────────┐
│                   Secure API Engine                    │
│             Node.js + Express REST API Gateway         │
└───────────────────────────┬────────────────────────────┘
                            │
             Mongoose ODM Object-Document Mapping
                 SSL-Encrypted Pipeline Link
                            │
                            ▼
┌────────────────────────────────────────────────────────┐
│                 Cloud Storage Database                 │
│               MongoDB Atlas Cluster Node               │
└────────────────────────────────────────────────────────┘
```

<br>━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</br>

## ⚙️ Tech Stack Matrix

| Layer | Technology | Spec / Version | Implementation Target |
| :--- | :--- | :--- | :--- |
| **Frontend Client** | React | `^19.0.0` | UI structure, client-side routing, and central AuthContext provider. |
| **Style Canvas** | Tailwind CSS | `v4.0` | Dynamic layout composition and terminal dark/light custom variables. |
| **Geometry Canvas** | Three.js | Canvas Vectors | Render interactive particle background meshes and geometric nodes. |
| **Routing Shield** | React Router | `v6.22.0` | Protected viewport redirects and client-side page indexing. |
| **Server Runtime** | Node.js | `^20.0.0` | Execution context for the backend API controllers. |
| **API Framework** | Express | `^4.19.0` | RESTful routing gateway handling client fetch requests. |
| **ODM Interface** | Mongoose | `^8.2.0` | Structured document schemas and validation constraints. |
| **Database Cluster** | MongoDB Atlas | Cloud Cluster | Distributed, secure persistence layer for users and employees. |

<br>━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</br>

## 📸 Screenshots

> 📸 **Login / Auth Page** — `![Login / Auth Page](screenshots/login-page.png)`
> 
> 📸 **Dashboard Home** — `![Dashboard Home](screenshots/dashboard-home.png)`
> 
> 📸 **Employee Ledger** — `![Employee Ledger](screenshots/employee-ledger.png)`
> 
> 📸 **Add Employee Form** — `![Add Employee Form](screenshots/add-employee.png)`
> 
> 📸 **Register Page** — `![Register Page](screenshots/register-page.png)`
> 
> 📸 **Profile / Settings** — `![Profile / Settings](screenshots/profile-settings.png)`

<br>━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</br>

## 🔐 Cryptographic Blueprint

### A. BcryptJS Password Protection
Administrator authentication channels are protected against raw data leaks using mathematical hashing algorithms.
- **Pre-Save Interceptor**: Before writing credentials to the database, a Mongoose middleware hook automatically intercepts the password field, generates a salt using `10` rounds, and converts the plaintext password to a high-entropy hash.
- **Verification**: Login requests invoke the custom schema instance method `matchPassword()` to verify hashes securely.

```javascript
// backend/models/User.js - Password Hashing Hook
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
```

### B. Stateful JWT Route Guarding
State validation is stateless and managed via signed JSON Web Tokens (JWT).
- **Signing**: Successful logins or registrations return a JWT signed with the `JWT_SECRET` key using HMAC-SHA256, set to expire in `30d`.
- **Extraction**: The auth middleware extracts the `Bearer <Token>` string from the `Authorization` header and decodes it.

```javascript
// backend/middleware/authMiddleware.js - JWT Interceptor Shield
export const protect = async (req, res, next) => {
  let token = req.headers.authorization?.startsWith('Bearer') 
    ? req.headers.authorization.split(' ')[1] 
    : null;

  if (!token) return res.status(401).json({ message: '401 Access Token Invalid or Expired' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
    next();
  } catch (error) {
    return res.status(401).json({ message: '401 Authorization preflight failed' });
  }
};
```

<br>━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</br>

## 📡 API Reference

All requests and responses carry `application/json` content-type payloads.

| Method | Endpoint | Auth Required | Request Body Schema | Success | Error Status | Response Payload Spec |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **POST** | `/api/auth/register` | None | `{ "name": "...", "email": "...", "password": "..." }` | **211** | `400` / `500` | Created user details & signed JWT token |
| **POST** | `/api/auth/login` | None | `{ "email": "...", "password": "..." }` | **200** | **401** / `500` | Authenticated user details & signed JWT token |
| **GET** | `/api/health` | None | None | **200** | `500` | API engine health and database status |
| **GET** | `/api/employees` | JWT Bearer | None | **200** | **401** / `500` | Array containing employee documents |
| **POST** | `/api/employees` | JWT Bearer | `{ "name": "...", "email": "...", "department": "...", "role": "...", "salary": 90000, "joinDate": "2026-06-13" }` | **201** | `400` / **401** / `500` | Created employee document details |
| **PUT** | `/api/employees/:id` | JWT Bearer | `{ "salary": 95000 }` (partial fields allowed) | **200** | **401** / `404` / `500` | Updated employee document details |
| **DELETE** | `/api/employees/:id` | JWT Bearer | None | **200** | **401** / `404` / `500` | Confirmation message of deletion success |

<br>━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</br>

## 🚀 Quick-Start

Follow these instructions to boot the full-stack portal environment locally.

### Step 1: Clone + Environment setup
Clone this repository to your workspace:
```bash
git clone https://github.com/khushi897920-lang/aether-ai-portal.git
cd aether-ai-portal
cp backend/.env.example backend/.env
```
Update the `.env` settings (details below).

### Step 2: Install Node Dependencies
Deploy package installations across both environments:
```bash
# Target backend engine dependencies
cd backend && npm install

# Target frontend client dependencies
cd ../frontend && npm install
```

### Step 3: Launch Local clusters
Launch the Node.js API server and Vite React client concurrently:
```bash
# Inside aether-ai-portal/backend
npm start
# Console Output:
# 📡 Server actively listening on port 5000 in development mode
# 🛸 Database Connected: Aether Atlas Core Active

# Inside aether-ai-portal/frontend (in a separate terminal)
npm run dev
# Console Output:
#  VITE v6.x.x  ready in X ms
#  ➜  Local:   http://localhost:5173/
```

<br>━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</br>

## 🔒 Environment Isolation

> [!WARNING]
> ⚠️ **CRITICAL SECURITY COMPLIANCE**: Never commit environment secret files (`.env`) or raw Atlas DB connection credentials to Git version control. Use the masked template below to configure local instances.

### backend/.env.example Template
```ini
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string_here
JWT_SECRET=your_cryptographically_strong_jwt_secret_key_here
```

To configure, rename the file to `.env` and fill in your private MongoDB Atlas Cluster URI and a high-entropy secret key for token signature generation.

For production cloud deployment, configure environment settings directly inside the hosting providers' native configuration panels (e.g. Render Web Service settings and Vercel Environment Variables).

<br>━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</br>

## 🤝 Contributing & 📄 License

This repository is built as part of the core development milestones under **WeIntern Week 2 (Task 2) & Week 3 (Task 3)**.

All source code is released under the terms of the [MIT License](https://opensource.org/licenses/MIT).
